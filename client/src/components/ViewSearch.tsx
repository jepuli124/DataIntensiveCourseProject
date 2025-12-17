import React, { useEffect, useState } from 'react'

interface incomingParams {
    url?: string
}

const ViewSearch: React.FC<incomingParams> = ({url}) => {
    
    const [itemList, setItemlist] = useState<{name: string}[] | undefined>(undefined)
    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            if(!url) return 
            const incomingData = await fetch('/api/' + url)
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            const parcedData: {name: string}[]  = await incomingData.json()
        
            setItemlist(parcedData)
        }
        fetchData()
        return () => abortCtrl.abort()
    }, [])

    return (
        <div>
            {itemList?.map((item, index) => (
                <div key={index}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default ViewSearch
