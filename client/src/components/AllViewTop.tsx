import React from 'react'
import ChooseDatabase from './ChooseDatabase'
import ChooseTable from './ChooseTable'
import ViewSearch from './ViewSearch'

const AllViewTop: React.FC = () => {
  return (
    <div style={{display: 'flex'}}>
      <ChooseDatabase></ChooseDatabase>
      <ChooseTable></ChooseTable>
      <ViewSearch></ViewSearch>
    </div>
  )
}

export default AllViewTop
