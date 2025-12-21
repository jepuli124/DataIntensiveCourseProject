import React from "react";
import { useNavigate } from "react-router-dom";

const WorldGenerate: React.FC = () => { //asks backend to generate new world and expects its id to show it to users
    const navigate = useNavigate()
    const generateWorld = async() => {
        const incomingData = await fetch('/api/generateworld/')
        const parsedData: {worldsCreated: {worldID: string}[]} = await incomingData.json()
  
        const worldID = parsedData.worldsCreated[1].worldID

        navigate("/world/" + worldID)
    }
    return (
        <div>
            <button onClick={() => {
                generateWorld()
                
                }}>GENERATE</button>
        </div>
    )
}

export default WorldGenerate