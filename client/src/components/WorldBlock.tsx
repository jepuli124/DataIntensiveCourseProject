import React, { useEffect, useState } from "react";
import type { block } from "../interfaces/block";

interface incomingParams{
    ChunkID: string
}



const WorldBlock: React.FC<incomingParams> = ({ ChunkID }) => {  

    const [blockList, setBlockList] = useState<block[]>([])

    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            
            if(!ChunkID) return 
            const incomingData = await fetch('/api/worldblocks/:' + ChunkID) // fetchin from '/api/world/:worldID'
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            setBlockList(parcedData.data)
            
        }

        fetchData()
        return () => abortCtrl.abort()
    }, [ChunkID])

    return (
        <div>
            {blockList.map((block: block, index: number) => (
                <div key={index}>
                    <></>
                </div>
            ))}
        </div>
    )
}

export default WorldBlock