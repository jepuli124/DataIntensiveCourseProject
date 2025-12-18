import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document{
    userID: string
    regionID: string
    passwordHash: string
    username: string
    inventoryID: string
}

let users: Schema = new Schema ({
    userID: {type: String, required: true, unique: true},
    regionID: {type: String, required: true},
    passwordHash: {type: String, required: true},
    username: {type: String, required: true},
    inventoryID: {type: String, required: true}
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", users)

export {IUser, User}