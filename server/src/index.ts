import mongoose from 'mongoose'
import {Request, Response, Router} from "express"
import { connections } from "../server"
import { log } from 'console'

const router: Router = Router()

// router.get('/api/RouteName', functionName);

// GET /api/databases
// Returns an array of database names in the currently connected MongoDB system.

router.get('/api/databases', async (req: Request, res: Response) => {
	// List all databases.
	try {
		// Use the database keys. They are named same as the database names are.
		const db = Object.keys(connections)
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}

		return res.json({ databases: db })
	} catch (err: any) {
	}
})

// GET /api/tables
// Returns an array of collection names in the currently connected MongoDB database.
router.get('/api/tables', async (req: Request, res: Response) => {

	// Get the collections. Because the databases are homogenous all of them have same collections.
	// Due to this we can use statically the GameDBRegion1, we know that this is not the best but we are going with it!
	try {
		const db = connections["GameDBRegion1"]
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}

		// List all collections, and return to front-end.
		const collections = await db.listCollections()
		const names = collections.map((c: any) => c.name)
		return res.json({ tables: names })
	// Catch any errors
	} catch (err: any) {
		console.error('Failed to list collections', err)
		return res.status(500).json({ error: err?.message ?? 'Unknown error' })
	}
})

// GET /api/:database/:table
// Returns an array of items in the correct database and the collection
router.get("/api/databases/:database/:table", async (req: Request, res: Response) => {
  try {
    const { database, table } = req.params;

    // Check if the database exists
    const dbConnection = connections[database];
    if (!dbConnection) {
		console.error("Invalid database name:", database);
      return res.status(400).json({ error: "Invalid database name" });
    }

    // Get the collection
    const collection = dbConnection.collection(table);

    // Fetch all documents (you can limit or filter if needed)
    const documents = await collection.find({}).toArray();

    return res.json({ data: documents });
  } catch (err: any) {
    console.error("Failed to fetch collection", err);
    return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
});

router.get("/api/confirmtrade/:tradeID", async (req:Request, res:Response) => {
	try {
    	const tradeID = req.params;
  	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
})

// Returns user by userID
router.get("/api/user/:userID", async (req: Request, res: Response) =>{
	try {
    	const { userID } = req.params;
		console.log("params:", req.params);
		console.log("connections:", Object.keys(connections));

		console.log(connections);
		const db = connections["GameDBRegion1"]
		console.log(db);
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		const collection = db.collection("User");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}

		const userDocument = await collection.findOne({"userID": userID});

		return res.json({ data: userDocument });
  	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
});

// Returns world by worldID
router.get("/api/world/:worldID", async (req: Request, res: Response) =>{
	try {
		const { worldID } = req.params;
		const db = connections["GameDBRegion1"]
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		const collection = db.collection("World");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}
		const worldDocument = await collection.findOne({"worldID": worldID});
		return res.json({ data: worldDocument });
	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
});

// Returns inventory by inventoryID
router.get("/api/inventory/:inventoryID", async (req: Request, res: Response) =>{
	try {
		const { inventoryID } = req.params;
		const db = connections["GameDBRegion1"]
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		const collection = db.collection("Inventory");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}
		const inventoryDocument = await collection.findOne({"inventoryID": inventoryID});
		return res.json({ data: inventoryDocument });
	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
})


// Creates a trade between two random users (for prototype) and returns to the user
router.get("/api/tradeUsers", async (req: Request, res: Response) => {
	try {
		const dbNames = ["GameDBRegion1", "GameDBRegion2", "GameDBRegion3"];

		const tradeID = "trade" + Date.now();
		const senderID = "user" + (Math.floor(Math.random() * 30) + 1);

		// This is to prevent sender and receiver being the same user
		let receiverID;
		do {
			receiverID = "user" + (Math.floor(Math.random() * 30) + 1);
		} while (receiverID === senderID);

		const itemID = "item" + (Math.floor(Math.random() * 100) + 1);

		const tradeDocument = {
			tradeID: tradeID,
			senderID: senderID,
			receiverID: receiverID,
			itemID: itemID
		};

		// Insert the tradeDocument into all databases
		for (const dbName of dbNames) {
			const db = connections[dbName];
			if (!db) {
				return res.status(500).json({ error: `No database connection available for ${dbName}` });
			}
			const collection = db.collection("Trade");
			if (!collection) {
				return res.status(500).json({ error: `No collection available in ${dbName}, please init database` });
			}
			await collection.insertOne(tradeDocument);
		}

		return res.json({ data: tradeDocument });
	} catch (err: any) {
		console.error("Failed to insert trade into all databases", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
})

export default router