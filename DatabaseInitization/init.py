import pymongo
import json

# The 3 databases to be created (homogenous architecture so data are the same in all 3)
databases = ["GameDB1", "GameDB2", "GameDB3"] 
# The collections to be created in each database
collections = ["Item", "Inventory", "User", "World", "WorldChunk", "Block", "Trade"]

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")

# This function restores and initializes the databases and collections 
# with data from /data folders json files. 
def initDatabase():
    existingDatabases = client.list_database_names() # Fetch existing databases
    for database in databases:

        if database in existingDatabases: 
            client.drop_database(database) # If database already exists delete it

        db = client[database] # Create a new database
        for collection in collections: # Loop through each collection
            db.create_collection(collection) # Create the collection

            # Read the data from the corresponding json file and store it into the collection
            file = open(f"./data/{collection}.json", "r") 
            lines = file.readlines()
            data = json.loads(" ".join(lines))
            db[collection].insert_many(data)
            file.close()

    print("Databases initialized successfully.")


if __name__ == "__main__":
    print("This program essentially restores the databases to their initial state.")
    print("All modified data in the databases will be lost.")
    print("Are you sure you want to continue? (y/n)")
    choice = input().lower()
    if choice == 'n':
        print("Operation cancelled.")
        exit(0)

    initDatabase()