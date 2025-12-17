import pymongo
import psycopg
import json
import os

TABLENAMES = {1: "animals", 2: "diseases", 3: "fungus", 4: "microbes", 5: "flowers"}

def Mongo_connect(myclient, number):
    
    mydb = myclient["dataIntensive" + str(number)]
    print("Mongo connected")
    return mydb

def main():

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    DB1 = Mongo_connect(myclient, 1)

    DB2 = Mongo_connect(myclient, 2)

    DB3 = Mongo_connect(myclient, 3)

    DBs = {"DB1": DB1, "DB2": DB2, "DB3": DB3}

    for fileN in range(1, 6):
        file = open("data4mongo" + str(fileN) + ".json", "r")
        lines = file.readlines()
        dataline = json.loads(" ".join(lines))
        MCC = DBs["DB1"][TABLENAMES[fileN]]
        MCC.drop()
        for dataObject in dataline:
            MCC.insert_one(dataObject)
        file.close()
    print("Database mongo created")


if __name__ == "__main__":
    main()