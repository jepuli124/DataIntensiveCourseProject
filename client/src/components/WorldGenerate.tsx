import React from "react";

const WorldGenerate: React.FC = () => { //asks backend to generate new world and expects its id to show it to users

    const generateWorld = async() => {
        const incomingData = await fetch('/api/generateworld/')
        const parsedData: {worldCreated: {worldID: string}} = await incomingData.json()
        console.log(parsedData.worldCreated)        
        const worldID = parsedData.worldCreated.worldID
        console.log(worldID)
    }
    return (
        <div>
            <button onClick={() => generateWorld()}>GENERATE</button>
        </div>
    )
}

export default WorldGenerate