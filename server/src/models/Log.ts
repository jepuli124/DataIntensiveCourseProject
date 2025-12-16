import mongoose, {Date, Document, Schema} from "mongoose";

interface ILog extends Document{
    id?: string
    string: string
    date: Date
}

let logs: Schema = new Schema ({
    string: {type: String, require: true},
    date: {type: Date, require: true}
})

const Log: mongoose.Model<ILog> = mongoose.model<ILog>("logs", logs)

export {ILog, Log}