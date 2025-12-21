import mongoose, {Document, Schema} from "mongoose";

interface IInventory extends Document{
    inventoryID: string
    userID: string
    regionID: string
    inventoryName: string
}

let inventories: Schema = new Schema ({
    inventoryID: {type: String, require: false},
    userID: {type: String, require: false},
    regionID: {type: String, require: true},
    inventoryName: {type: String, require: true}
})

const Inventory: mongoose.Model<IInventory> = mongoose.model<IInventory>("Inventory", inventories)

export {IInventory, Inventory}