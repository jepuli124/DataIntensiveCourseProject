import React, { useEffect } from 'react'
import TradeUserPart from './TradeUserPart'
import IUserItem from '../interfaces/userItems'

interface incomingParams {
    url1?: string,
    url2?: string
}

const Trade: React.FC<incomingParams> = ( { url1, url2 } ) => {
    const [user1Items, setUser1Items] = useState<IUserItem[]>([])
    const [user2Items, setUser2Items] = useState<IUserItem[]>([])


    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            
            if(!url1) return 
            const incomingData = await fetch(url1)
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            setUser1Items(parcedData.data)
            
            if(!url2) return 
            const incomingData2 = await fetch(url2)
            if(!incomingData2.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData2  = await incomingData2.json()
            setUser2Items(parcedData2.data)
            
        }
        fetchData()
        return () => abortCtrl.abort()
    }, [url1, url2])

  return (
    <div>
        <div style={{display: "flex"}}>
            <TradeUserPart></TradeUserPart>
            <TradeUserPart></TradeUserPart>
        </div>
        <button onClick={() => ()}>TRADE</button>
    </div>
  )
}

export default Trade