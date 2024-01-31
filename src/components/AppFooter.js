import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className=''>
        <a href="https://visnet.in" target="_blank" rel="noopener noreferrer">
        VIS Networks Pvt Ltd
        </a>
        <span className="ms-1">&copy; 2023 </span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
