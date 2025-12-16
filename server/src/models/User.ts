import mongoose, {Date, Document, Schema} from "mongoose";

interface IUser extends Document{
    userID?: string
    username: string
    passwordHash: string
    isAdmin: boolean
    email: string
    createdAt: Date
}

let users: Schema = new Schema ({
    username: {type: String, require: true},
    passwordHash: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    email: {type: String, require: true},
    createdAt: {type: Date, require: true}
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("users", users)

export {IUser, User}