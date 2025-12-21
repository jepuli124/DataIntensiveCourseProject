import React, { useEffect, useState } from 'react'

interface incomingParams {
    url?: string
}

interface unknownServerObject{ //because we don't know what server exactly sends, we just check if data exists. Yes this might be illegal
    id?: string,
    regionID?: string,
    itemID?: string,
    amount?: number,
    itemName?: string,
    inventoryID?: string,  
    userID?: string,
    inventoryName?: string,
    passwordHash?: string,
    username?: string,
    worldID?: string,
    worldName?: string,
    worldType?: string,
    chunkID?: string,
    coordinate_X?: number,
    coordinate_Y?: number,
    chunk_coordinate_x?: string,
    chunk_coordinate_y?: string
}

const ViewSearch: React.FC<incomingParams> = ({url}) => { // a component that doesn't know what it fetches or shows.
     
    const [itemList, setItemlist] = useState<unknownServerObject[] | undefined>(undefined) // stores items from search fetch
    useEffect(() => {
        const abortCtrl: AbortController = new AbortController()
        const fetchData = async () => {
            
            if(!url) return 
            const incomingData = await fetch(url)
            if(!incomingData.ok){
                console.log("fetch failed")
            return
            }
            
            const parcedData  = await incomingData.json()
            setItemlist(parcedData.data)
            console.log(itemList);
            
        }
        fetchData()
        return () => abortCtrl.abort()
    }, [url])

    return (
        <div>
            {itemList?.map((item, index) => (
                <div key={index}> {/* If a value exists it is shown, otherwise ignore*/}
                    {item.id ? <p>{item.id}</p> : <></>}
                    {item.regionID ? <p>{item.regionID}</p> : <></>}
                    {item.itemID ? <p>{item.itemID}</p> : <></>}
                    {item.itemName ? <p>{item.itemName}</p> : <></>}
                    {item.amount ? <p>{item.amount}</p> : <></>}
                    {item.inventoryID ? <p>{item.inventoryID}</p> : <></>}
                    {item.userID ? <p>{item.userID}</p> : <></>}
                    {item.inventoryName ? <p>{item.inventoryName}</p> : <></>}
                    {item.username ? <p>{item.username}</p> : <></>}
                    {item.passwordHash ? <p>{item.passwordHash}</p> : <></>}
                    {item.worldID ? <p>{item.worldID}</p> : <></>}
                    {item.worldName ? <p>{item.worldName}</p> : <></>}
                    {item.worldType ? <p>{item.worldType}</p> : <></>}
                    {item.chunkID ? <p>{item.chunkID}</p> : <></>}
                    {item.coordinate_X ? <p>{item.coordinate_X}</p> : <></>}
                    {item.coordinate_Y ? <p>{item.coordinate_Y}</p> : <></>}
                    {item.chunk_coordinate_x ? <p>{item.chunk_coordinate_x}</p> : <></>}
                    {item.chunk_coordinate_y ? <p>{item.chunk_coordinate_y}</p> : <></>}
                </div>
            ))}
        </div>
    )
}

export default ViewSearch
