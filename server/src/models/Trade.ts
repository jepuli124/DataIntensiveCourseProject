import mongoose, {Date, Document, Schema} from "mongoose";
import { IItem, Item } from "./Item";

interface ITrade extends Document{
    id?: string
    userID?: string
    itemID?: string
    string: string
    itemsUser1IDs: string[]
    itemsUser2IDs: string[]
}

let trades: Schema = new Schema ({
    //tradeID: {type: String, require: false}, remember this is the objects's own id
    userID: {type: String, require: false},
    itemID: {type: String, require: false},
    string: {type: String, require: true},
    itemsUser1: {type: [String], require: true},
    itemsUser2: {type: [String], require: true}
})

const Trade: mongoose.Model<ITrade> = mongoose.model<ITrade>("trades", trades)

export {ITrade, Trade}