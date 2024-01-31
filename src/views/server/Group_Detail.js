import React from 'react'
import ServerDetail from './ServerDetail'
import ServerGroup from '../server-group/Server_Group'
import ServerGroupDetail from '../server-group/Server_Group_Details'

function Group_Detail() {
  return (
    <div>
      <ServerDetail />
      <ServerGroupDetail />
    </div>
  )
}

export default Group_Detail
