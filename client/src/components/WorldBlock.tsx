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
            const incomingData = await fetch('/api/worldblocks/:' + ChunkID) // fetchin block data by chunkID
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            console.log("block", parcedData)
            setBlockList(parcedData.data)
            
        }

        fetchData()
        return () => abortCtrl.abort()
    }, [ChunkID])

    return (
        <div style={{ background: 'blue'}}>
            {blockList.map((block: block, index: number) => (
                <div key={index}>
                    {block.itemID == "item1" ? <img src="brown.png"></img> : <></> }
                    {block.itemID == "item2" ? <img src="green.png"></img> : <></> }
                    {block.itemID == "item3" ? <img src="white.png"></img> : <></> }
                </div>
            ))}
        </div>
    )
}

export default WorldBlock