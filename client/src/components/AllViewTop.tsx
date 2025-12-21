import React, { useState } from 'react'
import ChooseDatabase from './ChooseDatabase'
import ChooseTable from './ChooseTable'
import ViewSearch from './ViewSearch'

const AllViewTop: React.FC = () => { //over head function that transfare data between the child component
  const [database, setDatabase] = useState<string>("none") //what database is selected
  const [table, setTable] = useState<string>("none") //what table is selected
  const [url, setUrl] = useState<string | undefined>(undefined) //url to search results is stored here
  const [urlError, setUrlError] = useState<boolean>(false) //if error happen shows error message
  const [showTable, setShowTables] = useState<boolean>(false) // when a database is chosen, shows table options

  const updateUrl = () => { // update url for the search
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
      <ChooseDatabase updateDatabase={(databaseChange: string) => { 
        setDatabase(databaseChange)
        setShowTables(true)
      }}></ChooseDatabase> {/* shows database */}
      <ChooseTable updateTable={(tableChange: string) => setTable(tableChange)} fetchTables={showTable}></ChooseTable> {/* shows table */}
      <ViewSearch url={url}></ViewSearch> {/* shows search results */}
      </div>
      <div> 
        <button onClick={() => updateUrl()}>Search</button> {/* activates search */}
        {urlError ? <>
        <p>Either database or table is not chosen</p> {/* shows error message in case of error */}
        </> :
        <></> }
      </div>
    </div>
    
  )
}

export default AllViewTop
