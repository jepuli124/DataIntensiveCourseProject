import mongoose, {Document, Schema} from "mongoose";

interface IBlock extends Document{
    itemID: string
    chunkID: string
    chunk_coordinate_x: number
    chunk_coordinate_y: number
}

let blocks: Schema = new Schema ({
    itemID: {type: String, require: true},
    chunkID: {type: String, require: true},
    chunk_coordinate_x: {type: Number, require: true},
    chunk_coordinate_y: {type: Number, require: true}
})

const Block: mongoose.Model<IBlock> = mongoose.model<IBlock>("Block", blocks)   
export {IBlock, Block}