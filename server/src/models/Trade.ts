import mongoose, {Document, Schema} from "mongoose";

interface ITrade extends Document{
    tradeID: string
    senderID: string
    receiverID: string
    itemId: string
}

let trades: Schema = new Schema ({
    tradeID: {type: String, require: true},
    senderID: {type: String, require: true},
    receiverID: {type: String, require: true},
    itemId: {type: String, require: true}
})

const Trade: mongoose.Model<ITrade> = mongoose.model<ITrade>("Trade", trades)

export {ITrade, Trade}