import React, { useEffect, useState } from 'react'


interface incomingParams {
    updateTable?: (table: string) => void,
    fetchTables: boolean
}


const ChooseTable: React.FC<incomingParams> = ({updateTable, fetchTables = false}) => {
  
  const[tableNames, setTableNames] = useState<string[]>([])
  const[target, setTarget] = useState<number | undefined>(undefined)

  useEffect(() => {
      const abortCtrl: AbortController = new AbortController()
      const fetchTable = async () => { 
          if(!fetchTables){
            return
          }
          const incomingData = await fetch('/api/tables')
          if(!incomingData.ok){
              console.log("fetch failed")
          return
          }
          const parcedData: { tables: string[] } = await incomingData.json();
      
          setTableNames(parcedData.tables)
      }
      fetchTable()
      return () => abortCtrl.abort()
      }, [])
  
    const updateTableTrigger = (index: number, name: string) => { // this is just to make the return prettier
      if(updateTable)
        { 
          updateTable(name)
          setTarget(index)
        }
      }

  return (
    <div>
      {tableNames.map((name: string, index: number) => 
        <div key={index} onClick={() => updateTableTrigger(index, name)}>
          <h2>{name}</h2>
          {target == index ? <><p>This has been chosen</p></>: <></>}
        </div>
      )}
    </div>
  )
}

export default ChooseTable
