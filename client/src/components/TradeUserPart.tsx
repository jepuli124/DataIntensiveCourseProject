import React, {useEffect} from 'react'
import IUserItem from '../interfaces/userItems'

interface incomingParams {
    mirrored?: boolean
    userItems: IUserItem[]
}

const TradeUserPart: React.FC<incomingParams> = ({mirrored = false}) => {
    
    return (
        <div>TradeUserPart</div>
    )
}

export default TradeUserPart