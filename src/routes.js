import React from 'react'

import CurrentUserDetail from './views/user/UserDetail'
import ServerStatus from './views/server/ServerStatus'
import DatabaseStatus from './views/database/DatabaseSatus'
import WebServiceStatus from './views/web-service/WebServiceStatus'

//dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//system info
const SystemStats= React.lazy(() => import('./views/dashboard/SystemInfo'))

//users
const UserList = React.lazy(() => import('./views/user/UserList'))
const UserDetail = React.lazy(() => import('./views/user/UserDetail'))

//servers
const ServerList = React.lazy(() => import('./views/server/SeverList'))
const ServerDetail = React.lazy(() => import('./views/server/ServerDetail'))

//web service
const WebServiceList = React.lazy(() => import('./views/web-service/WebServiceList'))
const WebServiceDetail = React.lazy(() => import('./views/web-service/WebServiceDetail'))
const WebServiceExecute = React.lazy(() => import('./views/web-service/ws-execute/WebServiceExecute'))
//for email
const MonitorWebserviceStatusList=React.lazy(()=> import('./views/dashboard/monitor_Status/monitor_webservice_statusList') )
//monitor request 
const MonitorRequestList = React.lazy(() => import('./views/monitor/monitor_Request/monitor_requestList'))
const MonitorRequestDetail = React.lazy(() => import('./views/monitor/monitor_Request/monitor_requestDetails'))

//monitor status
const MonitorStatusList=React.lazy(()=> import('./views/dashboard/monitor_Status/monitor_statusList'))
// const MonitorStatusDetail=React.lazy(()=> import('./views/monitor/monitor_Status/monitor_statusDetails'))
const MonitorDatabaseStatusList=React.lazy(()=> import('./views/dashboard/monitor_Status/monitor_database_statusList') )
//database request
const DatabaseList=React.lazy(()=> import('./views/database/DatabaseList'))
const DatabaseDetail=React.lazy(()=>import('./views/database/DatabaseDetail'))

//email stats
const EmailStats = React.lazy(()=>import('./views/dashboard/EmailStats'))
//problmes card
const Problems = React.lazy(() => import('./views/dashboard/Problems'))
// testConnection 
const TestConnection=React.lazy(()=>import('./views/TestConnection'))

// queryeditor 
const QueryEditor=React.lazy(()=>import('./views/Query-Editor'))

// group 
const Group = React.lazy(() =>import('./views/server/Group'))
const GroupDetails = React.lazy(() =>import('./views/server/Group_Detail'))
//alerts card
const AlertsCard = React.lazy(()=> import('./views/dashboard/AlertsCard'))


// reports
const ScheduledReports=React.lazy(()=>import("./views/reports/ScheduledReports"))
const CustomReports=React.lazy(()=>import("./views/reports/CustomReports"))
//users card
const UsersCard =React.lazy(()=>import("./views/dashboard/UsersCard"))
const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Server-Status', name: 'Server-Status', element: SystemStats },


 

  { path: '/user-list', name: 'Users', element: UserList },
  { path: '/user-detail', name: 'User', element: UserDetail },
  { path: '/user-detail/:userId', name: 'User', element: UserDetail },
  { path: '/current-user-detail/:userId', name: 'Current User Details', element: CurrentUserDetail },
  // web service route
  { path: '/ws-request-list', name: 'Web Service Requests ', element: WebServiceList },
  { path: '/ws-request-detail', name: 'Web Service Request', element: WebServiceDetail },
  { path: '/ws-request-detail/:wsrId', name: 'Web Service Request', element: WebServiceDetail },
  { path: '/monitor-webservice-status/:wsrId', name: 'Web Service Status', element: WebServiceStatus },
  // web service route
  { path: '/ws-execute', name: 'Web Service Execute ', element: WebServiceExecute },
  { path: '/monitor-webservice-status', name: 'Web Service Execute ', element: MonitorWebserviceStatusList },
  //severs route
  // { path: '/server-list', name: 'Servers', element: ServerList},
  // { path: '/server-detail', name: 'Server Details', element: ServerDetail },
  { path: '/server-detail/:serverId', name: 'Server Details', element: ServerDetail },
  { path: '/server-status/:serverId', name: 'Server Status', element: ServerStatus },
{path : '/server-list' ,name:'Servers' , element : Group},
{path : '/server-detail' ,name:'Server Details' , element : GroupDetails},

//monitor request route
{ path: '/monitor-request-list', name: 'Monitor Request ', element: MonitorRequestList},
{ path: '/monitor-request-detail', name: 'Monitor Request Details', element: MonitorRequestDetail},
{ path: '/monitor-request-detail/:requestId', name: 'Monitor Request Details', element: MonitorRequestDetail},



//monitor status route
{ path: '/monitor-status', name: 'Monitor Status ', element: MonitorStatusList},
{path: '/monitor-database-status', name: 'Monitor Database Status'  , element:MonitorDatabaseStatusList},

//databases
{path: '/databases-list',name:'Database',element:DatabaseList},
{path: '/database-detail',name:'Database Details' ,element:DatabaseDetail},
{ path: '/database-detail/:dbId', name: 'Database Details', element: DatabaseDetail },

// {path: 'database-status-list', name:"DatabaseStatus",element:DatabaseStatusesList},


{ path: '/database-status/:dbId', name: 'Database Status', element: DatabaseStatus },

//query editor

{ path: '/Query-Editor', name: 'Query Editor', element:QueryEditor },


{path:'/Test-Connection', name:'Test-Connection', element:TestConnection},

// DASHBOARD CARDS 
//email stats
{path: '/email-stats',name:'email',element:EmailStats},
 //usercard
 { path: '/users-card',  name: 'UsersCard' ,element:UsersCard },
//alerts card
{path : '/alerts-card', name : 'AlertsCard' , element:AlertsCard},
// problmes card 

{path : '/problems-card' , name:'Problems' , element:Problems},
// reports
{path:'Scheduled-reports' ,name:'Reports' , element:ScheduledReports},
{path:'custom-reports' ,name:'Custom-Reports' , element:CustomReports},



]



export default routes
