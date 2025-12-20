import React, {useEffect} from 'react'
import IUserItem from '../interfaces/userItems'

interface incomingParams {
    mirrored?: boolean
    userItems: IUserItem[]
}

const TradeUserPart: React.FC<incomingParams> = ({mirrored = false, userItems}) => {
    const alignment = mirrored ? "right" : "left" 
    return (
        <div style={{alignContent = alignment}}>
            {userItems.map((item, index) => {
                <div key={index} style={{border: "1px black"}}>
                    <h1>{item.itemName}</h1>
                    <p>{item.amount}</p>
                </div>
            })}
        </div>
    )
}

export default TradeUserPart