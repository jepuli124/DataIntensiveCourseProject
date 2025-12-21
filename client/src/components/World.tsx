import React from "react"
import WorldBlock from "./WorldBlock"
import type { chunk } from "../interfaces/chunk"

interface incomingParams {
    worldChunks: chunk[]
}



const World: React.FC<incomingParams> = ( { worldChunks: world } ) => { //shows blocks

    return (
        <div>
            {world.map((chunk: chunk, index: number) => (
                <div key={index}>
                    <WorldBlock ChunkID={chunk.chunkID}></WorldBlock>
                </div>
            ))}
        </div>
    )
}

export default World