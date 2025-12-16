import mongoose, {Date, Document, Schema} from "mongoose";

interface IItem extends Document{
    id?: string
    type: string
}

let items: Schema = new Schema ({
    type: {type: String, require: true}
})

const Item: mongoose.Model<IItem> = mongoose.model<IItem>("logs", items)

export {IItem, Item}