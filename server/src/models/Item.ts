import mongoose, {Document, Schema} from "mongoose";

interface IItem extends Document{
    regionID: string
    itemID: string
    inventoryID: string
    amount: number
    itemName: string
}

let items: Schema = new Schema ({
    regionID: {type: String, require: true},
    itemID: {type: String, require: true},
    inventoryID: {type: String, require: true},
    amount: {type: Number, require: true},
    itemName: {type: String, require: true}
})

const Item: mongoose.Model<IItem> = mongoose.model<IItem>("Item", items)

export {IItem, Item}