import mongoose, {Date, Document, Schema} from "mongoose";

interface IWorldChunk extends Document{
    id?: string
    worldID?: string
    regionID?: string
    coordinate_X: number
    coordinate_y: number
    blockIDs: [string]
    plantIDs: [string]
    last_modified: Date
}

let worldchunks: Schema = new Schema ({
    regionID: {type: String, require: false},
    worldID: {type: String, require: false},
    blockIDs: {type: [String], require: false},
    plantIDs: {type: [String], require: false},
    coordinate_X: {type: Number, require: true},
    coordinate_y: {type: Number, require: true}
})

const WorldChunk: mongoose.Model<IWorldChunk> = mongoose.model<IWorldChunk>("worldchunks", worldchunks)

export {IWorldChunk, WorldChunk}