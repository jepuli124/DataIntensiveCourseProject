import mongoose, {Document, Schema} from "mongoose";

interface IWorldChunk extends Document{
    chunkID: string
    worldID: string
    coordinate_X: number
    coordinate_y: number
}

let worldchunks: Schema = new Schema ({
    chunkID: {type: String, require: true},
    worldID: {type: String, require: true},
    coordinate_X: {type: Number, require: true},
    coordinate_y: {type: Number, require: true}
})

const WorldChunk: mongoose.Model<IWorldChunk> = mongoose.model<IWorldChunk>("WorldChunk", worldchunks)

export {IWorldChunk, WorldChunk}