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
router.get("/api/:database/:table", async (req: Request, res: Response) => {
  try {
    const { database, table } = req.params;

    // Check if the database exists
    const dbConnection = connections[database];
    if (!dbConnection) {
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

router.get("/api/user/:user", async (req: Request, res: Response) =>{
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
			return res.status(500).json({error: "No no"})
		}

		const userDocument = await collection.findOne({"userID": userID});

		return res.json({ data: userDocument });
  	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
});

export default router