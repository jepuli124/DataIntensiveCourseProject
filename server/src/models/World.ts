import mongoose, {Document, Schema} from "mongoose";

interface IWorld extends Document{
    userID: string
    worldID: string
    regionID?: string
    worldName: string
    worldType: string
}

let worlds: Schema = new Schema ({
    userID: {type: String, require: true},
    worldID: {type: String, require: true},
    regionID: {type: String, require: false},
    worldName: {type: String, require: true},
    worldType: {type: String, require: true}
})

const World: mongoose.Model<IWorld> = mongoose.model<IWorld>("World", worlds)

export {IWorld, World}