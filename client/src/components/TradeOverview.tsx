import React, {useEffect, useState} from 'react'
import Trade from './Trade'
import type { IUser } from '../interfaces/user'

interface tradeInformation {
    user1: IUser,
    user2: IUser,
    tradeID: string
}

const TradeOverview: React.FC = () => { //Request dummy trade for showcase and passes relevant data to below
    const [setupData, setSetupData] = useState< tradeInformation| undefined>(undefined)
    useEffect(() => {
          const abortCtrl: AbortController = new AbortController()
          const fetchTable = async () => { 
              const incomingData = await fetch('/api/tradeUsers') //lets fetch 2 users and initiate a trade with them
              if(!incomingData.ok){
                  console.log("fetch failed")
              return
              }

              const parcedData: {data: {tradeID: string, senderID: string, receiverID: string}} = await incomingData.json(); 

              const incomingData2 = await fetch('/api/user/' + parcedData.data.senderID) //lets fetch user 1
              if(!incomingData2.ok){
                  console.log("fetch failed")
              return
              }

              const incomingData3 = await fetch('/api/user/' + parcedData.data.receiverID) //lets fetch user 2
              if(!incomingData3.ok){
                  console.log("fetch failed")
              return
              }
              const u1: {data: IUser} = await incomingData2.json()
              const u2: {data: IUser} = await incomingData3.json()
              console.log({user1: u1, user2: u2, tradeID: parcedData.data.tradeID})
              setSetupData({user1: u1.data, user2: u2.data, tradeID: parcedData.data.tradeID})
          }
          fetchTable()
          return () => abortCtrl.abort()
          }, [])
  
    return (
    <div>
        {setupData ? <><Trade url1={'/api/items/' + setupData.user1.inventoryID} url2={'/api/items/' + setupData.user2.inventoryID} tradeID={setupData.tradeID} ></Trade></> : <></>}
    </div>
  )
}

export default TradeOverview