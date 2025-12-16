import mongoose, {Date, Document, Schema} from "mongoose";

interface IUser extends Document{
    id?: string //not in schema as this replaces the id. in case of error panic
    username: string
    passwordHash: string
    isAdmin: boolean
    email: string
    createdAt: Date
    regionID?: string
    inventoryID: string
}

let users: Schema = new Schema ({
    username: {type: String, require: true},
    passwordHash: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    email: {type: String, require: true},
    createdAt: {type: Date, require: true},
    regionID: {type: String, require: false},
    inventoryID: {type: String, require: true}
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("users", users)

export {IUser, User}