import { User } from "../models/User"

export const allUsers = async (req: any, res: any) => { // returns all users in a list
    try {
        const users = await User.find()
        if(!users){
            return res.status(404).json({msg: "users not found"})
        }
        return res.status(200).json(users) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }
