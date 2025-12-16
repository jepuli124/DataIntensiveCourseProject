import mongoose, {Date, Document, Schema} from "mongoose";

interface IWorld extends Document{
    id?: string
    regionID?: string
    userID?: string
    worldChunkIDs?: [string]
}

let worlds: Schema = new Schema ({
    regionID: {type: String, require: false},
    userID: {type: String, require: false},
    worldChunkIDs: {type: [String], require: false}
})

const World: mongoose.Model<IWorld> = mongoose.model<IWorld>("worlds", worlds)

export {IWorld, World}