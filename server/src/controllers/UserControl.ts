import {Request, Response, Router} from "express"
import path from "path";
import { IUser, User } from "../models/User";
import bcrypt from 'bcrypt';
import { Inventory } from "../models/Inventory";
import mongoose from "mongoose";
import { connections } from "../../server";

export const userById = async (req: any, res: any) => { // returns user by its ID
    try {
        const users = await User.find({userID: req.params["id"]})
        if(!users){
            return res.status(404).json({msg: "user not found"})
        }
        return res.status(200).json(users) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

export const validateAdmin = async (req: Request, res: Response): Promise<void> => {  // get session token validated to bypass login faster (admin edition)
    //very interesting function indeed, it do validate everyone
    try {
        res.status(200).json({message: "proceed"})
        return
    } catch (error: any) {
        console.log(`Error while get a card: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}

export const register = async (req: Request, res: Response): Promise<void> => {  // register
    try {
        const db: mongoose.Connection = connections["GameDBRegion" + req.body.region]
        // Error check
        if (!db) {
            res.status(500).json({ error: 'No database connection available' })
            return
        }
        const collection = db.collection("User")
        const inventoryCollection = db.collection("Inventory") 
        const listOfUsers = await collection.find({}).toArray()
        console.log(listOfUsers)
        for (let index = 0; index < listOfUsers.length; index++) { // checking that username is unique, not necessary but I thought it was a nice feature 
            if (req.body.name == listOfUsers[index].username){
                console.log("Username already registered", req.body.name, listOfUsers[index].username)
                res.status(403).json({msg: "Username already registered"})
                return
            };
        }
        
        const salt: string = bcrypt.genSaltSync(10, 'b'); // password encryption process, taken from course's source codes. 
        let password: string = bcrypt.hashSync(req.body.password, salt);

        const newInvetory = new Inventory({
            regionID: req.body.region,
            inventoryName: req.body.name
        })

        await inventoryCollection.insertOne(newInvetory)
        let IID = undefined
        if (newInvetory.inventoryID !== undefined){
            IID = newInvetory.inventoryID
        } 
  
        const newUser = new User ({
            username: req.body.name,
            passwordHash: password,
            regionID: req.body.region,
            inventoryID: IID
        })

        await collection.insertOne(newUser)

        newUser.userID = newUser._id.toString() //Lets get the ID and make it to as string
        await newUser.save()

        newInvetory.userID = newUser.userID
        await newInvetory.save()

        res.status(200).json({messsage: "registery successful"})
        return
    } catch (error: any) {
        console.log(`Error in registery: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}
    
export const login = async (req: Request, res: Response): Promise<void> => {  // login

    try {
        const db: mongoose.Connection = connections["GameDBRegion" + req.body.region]
        // Error check
        if (!db) {
            res.status(500).json({ error: 'No database connection available' })
            return
        }
        const collection = db.collection("User")
        const listOfUsers = await collection.find({}).toArray()

        for (let index = 0; index < listOfUsers.length; index++) { // checking if that user exist and has the password equal the saved one.
            if (req.body.name == listOfUsers[index].username && bcrypt.compareSync(req.body.password, listOfUsers[index].passwordHash)){
                res.status(200).json({message: "Login succsesful"})
                return //apparently crusial for preventing http_headers error
            };
        }

        res.status(403).json({message: `login failed `})
        return
    } catch (error: any) {
        console.log(`Error while login: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}