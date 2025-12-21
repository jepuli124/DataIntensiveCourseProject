import React from "react"

interface incomingParams {
    world: unknown
}

const World: React.FC<incomingParams> = ( { world } ) => {

    return (
        <div>
            {world.map((chunk: unknown, index: number) => (
                <div key={index}>
                    {chunk.map((block: unknown, blockIndex: number) => (
                        <div key={blockIndex}>
                            
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default World