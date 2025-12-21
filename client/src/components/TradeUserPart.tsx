import React from 'react'
import type { IUserItem } from '../interfaces/userItems'

interface incomingParams {
    mirrored?: boolean
    userItems?: IUserItem[]
    refresh: number
}

const TradeUserPart: React.FC<incomingParams> = ({mirrored = false, userItems, refresh}) => { // shows single user's inventory
    const alignment = mirrored ? "right" : "left" 
    return (
        <div style={{alignContent: alignment}}>
            {userItems ? userItems.map((item, index) => (
                <div key={index} style={{border: "1px black"}}>
                    <h1>{item.itemName}</h1>
                    <p>{item.amount}</p>
                    
                </div>
            )) : <></> }
        {!mirrored && refresh == 0 ? <p>trading this ➡️</p> : <></>}
        </div>
    )
}

export default TradeUserPart