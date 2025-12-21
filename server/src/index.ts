import mongoose, { Mongoose, connection } from 'mongoose'
import {Request, Response, Router} from "express"
import { connections } from "../server"
import { log } from 'console'
import {IWorldChunk, WorldChunk} from "./models/WorldChunk"
import {IWorld, World} from "./models/World"
import {IBlock, Block} from "./models/Block"
import {ITrade, Trade} from "./models/Trade"

const router: Router = Router()

// router.get('/api/RouteName', functionName);

// GET /api/databases
// Returns an array of database names in the currently connected MongoDB system.

router.get('/api/databases', async (req: Request, res: Response) => {
	// List all databases.
	try {
		// Use the database keys. They are named same as the database names are.
		const db:string[] = Object.keys(connections)
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
		const db: mongoose.Connection: any = connections["GameDBRegion1"]
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}

		// List all collections, and return to front-end.
		const collections: any: mongoose.mongo.CollectionInfo[] = await db.listCollections()
		const names: string: string[] = collections.map((c: any) => c.name)
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
		const { database, table }: any = req.params;

		// Check if the database exists
		const dbConnection: mongoose.Connection: any = connections[database];
		if (!dbConnection) {
			console.error("Invalid database name:", database);
		return res.status(400).json({ error: "Invalid database name" });
		}

		// Get the collection
		const collection: mongoose.Collection: any = dbConnection.collection(table);

		// Fetch all documents (you can limit or filter if needed)
		const documents: string[]: mongoose.mongo.WithId<mongoose.mongo.BSON.Document>[] = await collection.find({}).toArray();

		return res.json({ data: documents });
	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
});

// Returns user by userID
// GET /api/user/:userID
// Returns an JSON which has the user information needed in front-end.
router.get("/api/user/:userID", async (req: Request, res: Response) =>{
	try {
		// Read params (log also)
    	const { userID }: any = req.params;
		console.log("params:", req.params);
		console.log("connections:", Object.keys(connections));

		// Again fixed database because of prototyping and homogenous database system
		console.log(connections);
		const db: mongoose.Connection: any = connections["GameDBRegion1"]
		console.log(db);
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		const collection: mongoose.Collection: any = db.collection("User");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}

		const userDocument: any = await collection.findOne({"userID": userID});

		return res.json({ data: userDocument });
  	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
});

// GET /api/world/:worldID
// Returns an JSON which has the user information needed in front-end.
// Returns world by worldID
router.get("/api/world/:worldID", async (req: Request, res: Response) =>{
	try {
		const { worldID }: any = req.params;
		const db: mongoose.Connection: any = connections["GameDBRegion1"]
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		// Find the correct collection
		const collection: mongoose.Collection: any = db.collection("World");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}
		// Find the correct world and return it.
		const worldDocument: any = await collection.findOne({"worldID": worldID});
		return res.json({ data: worldDocument });
	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
});

// Returns inventory by inventoryID
router.get("/api/inventory/:inventoryID", async (req: Request, res: Response) =>{
	try {
		const { inventoryID }: any = req.params;
		const db: mongoose.Connection: any = connections["GameDBRegion1"]
		
		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		const collection: mongoose.Collection: any = db.collection("Inventory");
		if (!collection) {
			return res.status(500).json({error: "No collection available, please init database"})
		}
		const inventoryDocument: any = await collection.findOne({"inventoryID": inventoryID});
		return res.json({ data: inventoryDocument });
	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
})

// creates the world
router.get("/api/generateWorld", async (req: Request, res: Response) => {
	try {
	// Regions to homogenously save the new worlds in all dbs
	const regions: string[]: string[] = ["GameDBRegion1", "GameDBRegion2", "GameDBRegion3"];
	const results: any[]: any[] = [];
	let i = 0;

	for (const region of regions) {
		i = i + 1;
		const database: mongoose.Connection: any = connections[region];
		if (!database) {
			throw new Error(`Missing DB connection: ${region}`);
		}

		// Init collections
		const worldCollection: mongoose.Collection: any = database.collection("World");
		const chunkCollection: mongoose.Collection: any = database.collection("WorldChunk");
		const blockCollection: mongoose.Collection: any = database.collection("Block")

		// Create ID for new world
		const intForID: number: number = await worldCollection.countDocuments()
		const worldID: string: string = "world" + (intForID+1)

		// Create world document
		await worldCollection.insertOne({
			userID: "user1",
			worldID: worldID,
			regionID: "region1",
			worldName: "Mikkola",
			worldType: "Desert"
		});
		
		const chunks: IWorldChunk[] = [];
		const blocks: IBlock[] = [];

		for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			const chunkID: string = `chunk_${worldID}_${x}_${y}`;
			// Create chunk
			chunks.push({
			chunkID,
			worldID,
			coordinate_X: x,
			coordinate_y: y
			} as IWorldChunk);

			// Create blocks inside this chunk
			for (let z = 0; z < 8; z++) {
			for (let v = 0; v < 8; v++) {
				blocks.push({
				itemID: "item" + (Math.floor(Math.random() * 3) + 1),
				chunkID,
				chunk_coordinate_x: z,
				chunk_coordinate_y: v
				} as IBlock);
			}
			}
		}
		}

		// Insert all chunks and blocks to dbs
		await chunkCollection.insertMany(chunks);
		await blockCollection.insertMany(blocks);

		results.push({
			region,
			worldID,
			chunksCreated: chunks.length,
			blocksCreated: blocks.length
		});
		}

		// Return confirmation
		return res.json({
			success: true,
			worldsCreated: results
		});

	} catch (err: any) {
		console.error("World generation failed", err);
		return res.status(500).json({ error: err.message ?? "Unknown error" });
	}
});

// Get all blocks insie chunk
router.get("/api/worldBlocks/:ChunkID", async (req: Request, res: Response) => {
	try {
		// Params and make connection. Homogenous so fixed database
		const { ChunkID }: any = req.params;
		const db: mongoose.Connection: any = connections["GameDBRegion1"]

		// Error check
		if (!db) {
			return res.status(500).json({ error: 'No database connection available' })
		}
		// Find the correct collection
		const collection: any = db.collection("Block");
		if (!collection) {
			return res.status(500).json({error: "No no"})
		}

		// Find all of the blocks with the id, and save as an array
		const blockList: string[] = await collection.find({"chunkID": ChunkID}).toArray();
		
		// Return said blocks to front-end so it can render them
		return res.json({ data: blockList });
		} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
});



// Creates a trade between two random users (for prototype) and returns to the user
router.get("/api/tradeUsers", async (req: Request, res: Response) => {
	try {
		const dbNames: string[]: string[] = ["GameDBRegion1", "GameDBRegion2", "GameDBRegion3"];

		const tradeID: string: string = "trade" + Date.now();
		const senderID: string: string = "user" + (Math.floor(Math.random() * 30) + 1);

		// This is to prevent sender and receiver being the same user
		let receiverID: string: string;
		do {
			receiverID = "user" + (Math.floor(Math.random() * 30) + 1);
		} while (receiverID === senderID);

		const itemID: string: string = "item" + (Math.floor(Math.random() * 100) + 1);

		const tradeDocument: { tradeID: string; senderID: string; receiverID: string; itemID: string }: ITrade = {
			tradeID: tradeID,
			senderID: senderID,
			receiverID: receiverID,
			itemId: itemID
		};

		// Insert the tradeDocument into all databases
		for (const dbName of dbNames) {
			const db: any = connections[dbName];
			if (!db) {
				return res.status(500).json({ error: `No database connection available for ${dbName}` });
			}
			const collection: any = db.collection("Trade");
			if (!collection) {
				return res.status(500).json({ error: `No collection available in ${dbName}, please init database` });
			}
			await collection.insertOne(tradeDocument);

			const itemCollection: any = db.collection("Item");
			if (!itemCollection) {
				return res.status(500).json({ error: `No Item collection available in ${dbName}, please init database` });
			}
			await itemCollection.insertOne({itemID: itemID, inventoryID: "inv" + senderID.replace("user", ""), amount: 1, itemName: "Cool Item"})
		}

		return res.json({ data: tradeDocument });
	} catch (err: any) {
		console.error("Failed to insert trade into all databases", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
	}
})

router.get("/api/confirmTrade/:tradeID", async (req:Request, res:Response) => {
	try {
    	const { tradeID }: any = req.params;
		const dbNames: string[] = ["GameDBRegion1", "GameDBRegion2", "GameDBRegion3"];
		for (const dbName of dbNames) {
			const db: any = connections[dbName];
			if (!db) {
				return res.status(500).json({ error: `No database connection available for ${dbName}` });
			}
			const collection: any = db.collection("Trade");
			if (!collection) {
				return res.status(500).json({ error: `No collection available in ${dbName}, please init database` });
			}
			let trade: any = await collection.findOne({"tradeID": tradeID});
			if (trade) {
				const itemCollection: any = db.collection("Item");
				if (!itemCollection) {
					return res.status(500).json({ error: `No Item collection available in ${dbName}, please init database` });
				}
				// Change item from sender's inventory to receiver's inventory
				await itemCollection.updateOne(
					{inventoryID: "inv" + trade.senderID.replace("user", ""),  itemID: trade.itemID},
					{$set: {inventoryID: "inv" + trade.receiverID.replace("user", "")}}
				);
			}
		}
		return res.json({ data: { success: true, tradeID: tradeID } } );
  	} catch (err: any) {
		console.error("Failed to fetch collection", err);
		return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
})

export default router