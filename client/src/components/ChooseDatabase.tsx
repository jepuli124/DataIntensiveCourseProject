import React, { useEffect, useState } from 'react'

interface incomingParams {
    updateDatabase?: (database: string) => void
}

const ChooseDatabase: React.FC<incomingParams> = ({updateDatabase}) => { //component that shows available databases and lets user choose which they target

  const[databaseNames, setDatabaseNames] = useState<string[]>([])
  const[target, setTarget] = useState<number | undefined>(undefined)

  useEffect(() => {
    const abortCtrl: AbortController = new AbortController()
    const fetchDatabases = async () => { 
        const incomingData = await fetch('/api/databases')
        if(!incomingData.ok){
            console.log("fetch failed")
        return
        }
        const parcedData: { databases: string[] }  = await incomingData.json()
    
        setDatabaseNames(parcedData.databases)
    }
    fetchDatabases()
    return () => abortCtrl.abort()
    }, [])

  const updateDatabaseTrigger = (index: number, name: string) => { // this is just to make the return prettier
    if(updateDatabase)
      { 
        updateDatabase(name)
        setTarget(index)
      }
    }

  return (
    <div>
      {databaseNames.map((name: string, index: number) => 
        <div key={index} onClick={() => updateDatabaseTrigger(index, name)}>
          <h2>{name}</h2>
          {target == index ? <><p>This has been chosen</p></>: <></>}
        </div>
      )}
    </div>
  )
}

export default ChooseDatabase
