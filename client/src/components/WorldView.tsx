import React, { useEffect, useState } from "react";
import World from "./World";
import type { chunk } from "../interfaces/chunk";
import { useParams } from "react-router-dom";


interface incomingParams {

}

const WorldView: React.FC<incomingParams> = ({  }) => { // stars building world by chopping world down to chunks from world data given by backend

    const [world, setWorld] = useState<chunk[] | undefined>(undefined)
    const params = useParams()
    const url = '/api/chunks/' + params.worldid // collects the world id from url

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            
            if(!url) return 
            const incomingData = await fetch(url) // fetchin from '/api/world/:worldID'
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            console.log(parcedData)
            setWorld(parcedData.data)
        }

        fetchData()
        return () => abortCtrl.abort()
    }, [url])
    
    return (
        <div>
            {world ? <World worldChunks={world}></World> : <></>}
        </div>
    )
}

export default WorldView