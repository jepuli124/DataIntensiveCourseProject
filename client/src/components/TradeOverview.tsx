import React, {useEffect, useState} from 'react'
import Trade from './Trade'
import IUser from '../interfaces/user'

interface tradeInformation {
    user1: IUser,
    user2: IUser,
    tradeID: string
}

const TradeOverview: React.FC = () => {
    const [setupData, setSetupData] = useState< tradeInformation| undefined>(undefined)
    useEffect(() => {
          const abortCtrl: AbortController = new AbortController()
          const fetchTable = async () => { 
              const incomingData = await fetch('/api/tradeUsers') //lets fetch 2 users and initiate a trade with them
              if(!incomingData.ok){
                  console.log("fetch failed")
              return
              }

              const parcedData: tradeInformation = await incomingData.json(); 

              setSetupData(parcedData)
          }
          fetchTable()
          return () => abortCtrl.abort()
          }, [])
  
    return (
    <div>
        {setupData ? <><Trade incomingParams={
            '/api/inventory/' + setupData.user1.inventoryID,
            '/api/inventory/' + setupData.user2.inventoryID,
            setupData.TradeID} ></Trade></> : <></>}
    </div>
  )
}

export default TradeOverview