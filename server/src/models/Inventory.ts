import mongoose, {Date, Document, Schema} from "mongoose";

interface IInventory extends Document{
    id?: string
    regionID: string
    userID?: string
}

let inventories: Schema = new Schema ({
    regionID: {type: String, require: true},
    userID: {type: String, require: false}
})

const Inventory: mongoose.Model<IInventory> = mongoose.model<IInventory>("inventories", inventories)

export {IInventory, Inventory}