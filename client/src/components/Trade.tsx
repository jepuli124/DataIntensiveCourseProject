import React, { useEffect, useState } from 'react'
import TradeUserPart from './TradeUserPart'
import type { IUserItem } from '../interfaces/userItems'

interface incomingParams {
    url1?: string,
    url2?: string,
    tradeID?: string
}

const Trade: React.FC<incomingParams> = ( { url1, url2, tradeID } ) => {
    const [user1Items, setUser1Items] = useState<IUserItem[]>([])
    const [user2Items, setUser2Items] = useState<IUserItem[]>([])
    const [refersh, setRefresh] = useState<number>(0)


    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            
            if(!url1) return 
            const incomingData = await fetch(url1) // fetchin first user inventory 
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            console.log(url1, parcedData)
            setUser1Items(parcedData.data)
            
            if(!url2) return 
            const incomingData2 = await fetch(url2) // fetchin second user inventory
            if(!incomingData2.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData2  = await incomingData2.json()
            setUser2Items(parcedData2.data)
            
        }
        fetchData()
        return () => abortCtrl.abort()
    }, [url1, url2, tradeID, refersh])

    const confirmTrade = async () => { // confirm trade and makes request for backend to change the owner of the items.
        const incomingData = await fetch('/api/confirmtrade/' + tradeID)
        if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            setRefresh(refersh => refersh + 1) // causes refresh to see the new inventories

    }

  return (
    <div>
        <div style={{display: "flex", justifyContent: "space-between"}}> {/* shows to inventories*/}
            <TradeUserPart refresh={refersh} mirrored={false} userItems={user1Items}></TradeUserPart>
            <TradeUserPart  refresh={refersh} mirrored={true} userItems={user2Items}></TradeUserPart>
        </div>
        <button onClick={() => confirmTrade()}>TRADE</button>
    </div>
  )
}

export default Trade