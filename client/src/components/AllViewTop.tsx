import React, { useState } from 'react'
import ChooseDatabase from './ChooseDatabase'
import ChooseTable from './ChooseTable'
import ViewSearch from './ViewSearch'

const AllViewTop: React.FC = () => { //over head function that transfare data between the child component
  const [database, setDatabase] = useState<string>("none")
  const [table, setTable] = useState<string>("none")
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [urlError, setUrlError] = useState<boolean>(false)

  const updateUrl = () => {
    if(table !== "none" && database !== "none"){
      setUrl('/api/' + database.toString() + "/" + table)
      setUrlError(false)
    } else {
      setUrlError(true)
    }
  }


  return (
    <div>
      <div style={{display: 'flex'}}>
      <ChooseDatabase updateDatabase={(databaseChange: string) => setDatabase(databaseChange)}></ChooseDatabase>
      <ChooseTable updateTable={(tableChange: string) => setTable(tableChange)}></ChooseTable>
      <ViewSearch url={url}></ViewSearch>
      </div>
      <div>
        <button onClick={() => updateUrl()}>Search</button>
        {urlError ? <>
        <p>Either database or table is not chosen</p>
        </> :
        <></> }
      </div>
    </div>
    
  )
}

export default AllViewTop
