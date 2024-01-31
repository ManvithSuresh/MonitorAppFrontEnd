import React from 'react'
import ServerList from './SeverList'
import { CCol } from '@coreui/react'
import ServerGroupList from '../server-group/Server_Group_List'

function Group() {
  return (
    <div>
      <ServerList />
      <CCol>
        <ServerGroupList />
      </CCol>
    </div>
  )
}

export default Group
