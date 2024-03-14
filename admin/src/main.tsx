import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

import ViewBuilding from './pages/ViewBuilding'
import ViewUser from './pages/ViewUser'
import ViewAsset from './pages/ViewAsset'
import ViewDevice from './pages/ViewDevice'
import ViewSuite from './pages/ViewSuite'
import ViewTenant from './pages/ViewTenant'
import ViewGateway from './pages/ViewGateway'
import ViewBill from './pages/ViewBill'
import AddAssets from './pages/AddAssets'
import AddUtilityBill from './pages/AddUtilityBill'
// import { ThemeProvider, createTheme } from '@mui/material/styles'

const router = createBrowserRouter([
  {
    path: "",
    element: <Dashboard />
  },
  {
    path:"/buildings",
    element: <ViewBuilding />
  },
  {
    path: "/users",
    element: <ViewUser />
  },
  {
    path: "/assets",
    element: <ViewAsset />
  },
  {
    path: "/devices",
    element: <ViewDevice />
  },
  {
    path: "/suites",
    element: <ViewSuite />
  },
  {
    path: "/tenants",
    element: <ViewTenant />
  },
  {
    path: "/utilities",
    element: <ViewBill />
  },
  {
    path: "/gateways",
    element: <ViewGateway />
  },
  {
    path: "/addassets",
    element: <AddAssets />
  },
  {
    path: "/addutilities",
    element: <AddUtilityBill />
  }
], {
  basename: "/admin",
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
