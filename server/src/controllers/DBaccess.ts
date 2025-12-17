import { User } from "../models/User"

export const allUsers = async (req: any, res: any) => { // returns all users in a list
    try {
        const users = await User.find()
        if(!users){
            return res.status(404).json({msg: "users not found"})
        }
        return res.status(200).json(users) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

/* SAMPLE CODE FROM KONSTA
export const markersByMapId = async (req: any, res: any) => { // returns all markers by mapID in a list
    try {
        const markers = await Marker.find({mapThisBelongsTo: req.params["id"]})
        if(!markers){
            return res.status(404).json({msg: "Markers not found"})
        }
        return res.status(200).json(markers) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

export const uploadMarker = async (req: any, res: any) => { //upload a markerk
    try {

        let newMarker: IMarker = new Marker ({
            x: req.body.x,
            y: req.body.y,
            color: req.body.color,
            symbol: req.body.symbol,
            mapThisBelongsTo: req.body.mapThisBelongsTo,
            linkToAnotherMap: req.body.linkToAnotherMap
        })
        await newMarker.save()
        return res.status(201).json({msg: `successful operation in upload map marker`})
    } catch (error: any) {
        console.log(`Error while uploading location map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const editMarker = async (req: any, res: any) => { //upload a marker
    try {

            const marker = await Marker.findByIdAndUpdate(req.params.id, {
            color: req.body.color,
            symbol: req.body.symbol,
            mapThisBelongsTo: req.body.mapThisBelongsTo,
            linkToAnotherMap: req.body.linkToAnotherMap
            })
        
        return res.status(201).json({msg: `successful operation in updating marker`})
    } catch (error: any) {
        console.log(`Error while uploading location map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteMarker = async (req: any, res: any) => { //delete a  marker
    try {

        await Marker.deleteOne({_id: req.params.id})
        return res.status(201).json({msg: `successfully deleted marker`})
    } catch (error: any) {
        console.log(`Error while uploading location map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}
    */