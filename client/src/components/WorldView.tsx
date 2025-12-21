import React, { useEffect, useState } from "react";
import World from "./World";
import type { chunk } from "../interfaces/chunk";


interface incomingParams {
    url?: string
}

const WorldView: React.FC<incomingParams> = ({ url }) => {

    const [world, setWorld] = useState<chunk[] | undefined>(undefined)
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