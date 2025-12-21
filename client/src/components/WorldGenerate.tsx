import React from "react";

const WorldGenerate: React.FC = () => {

    const generateWorld = async() => {
        const incomingData = await fetch('/api/generateworld/')
        const parsedData: {worldID: string} = await incomingData.json()
        const worldID = parsedData.worldID
    }
    return (
        <div>
            <button onClick={() => generateWorld()}>GENERATE</button>
        </div>
    )
}

export default WorldGenerate