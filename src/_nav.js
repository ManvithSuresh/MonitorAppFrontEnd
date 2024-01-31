import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilScreenDesktop,
  cilGlobeAlt,
  cilStorage,
  cilPuzzle,
  cilSpeedometer,
  cilPeople,
 
  cilShortText,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    style: { color: 'white' }
    
  },
  // {
  //   component: CNavItem,
  //   name: 'Task Manager',
  //   to: '/task',
  //   icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'check me',
  //   },
    
  // },




  {
    component: CNavTitle,
    name: 'Tools',
    style: { color: 'white' }
  },
  {
    component: CNavGroup,
    name: 'Monitor',
    to: '/monitor',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    className: 'web-services-nav',
    items: [
      {
        component: CNavItem,
        name: 'Add Request',
        to: '/monitor-request-list',
        style: { color: 'white' }
      },

      {
        component: CNavItem,
        name: 'Email Status',
        to: '/email-stats',
        style: { color: 'white' }
      },
      
    ],
  },
  {
    component: CNavItem,
    name: 'Add Servers',
    to: '/server-list',
    icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
    style: { color: 'white' }
  },


  {
    component: CNavItem,
    name: ' Add Databases',
    to: '/databases-list',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    style: { color: 'white' }
  },

  {
    component: CNavItem,
    name: ' Add APIs',
    to: '/ws-request-list',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
    style: { color: 'white' }
  },

 
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
    className: 'web-services-nav',
    items: [
      {
        component: CNavItem,
        name: 'Custom-Reports',
        to: '/custom-reports',
        style: { color: 'white' }
      },

      {
        component: CNavItem,
        name: 'Scheduled-Reports',
        to: '/scheduled-reports',
        style: { color: 'white' }
      },
      
    ],
  },





  {
    component: CNavTitle,
    name: 'Services',
    style: { color: 'white' }
  },
  {
    component: CNavGroup,
    name: 'Web Services',
    to: '/web-services',
    className: 'web-services-nav',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
   
    items: [
     
      {
        component: CNavItem,
        name: 'Execute',
        to: '/ws-execute',
        style: { color: 'white' }
      }      
    ],
  },
  {
    component: CNavGroup,
    name: 'Databases',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Query-Editor',
      //   to: "Query-Editor",
      //   style: { color: 'white' }
      // },

      {
        component: CNavItem,
        name: 'Test-Connection',
        to: "Test-Connection",
        style: { color: 'white' }
      },
     
    ],
  },
  
  {
    component: CNavItem,
    name: 'Users',
    to: '/user-list',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    style: { color: 'white' }
  },
]

export default _nav
