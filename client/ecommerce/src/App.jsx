import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import SignInSide from './components/login/SignInSide'
import SignUp from './components/login/SignUp'
import P from './components/login/protection'
import Product from './components/login/product/Product'
import { Grid,Paper } from '@mui/material'
import Orders from './components/Orders'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Productlist from './components/Productlist'

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/dashboard",
    //   element: <Dashboard/>
        
    // },
    {
      path:"/dashboard",
      element:<P/>,
      children:[
        {
          path:"Product",
          element:(
            <>

            <Productlist/>
          </>
          )
        }
      ]
    },
    {
      path: "/signinside",
      element: <SignInSide/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
  ]);
  
  return (
    <>
    {/* <Dashboard/> */}
      {/* <SignInSide/> */}
      {/* <SignUp/> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
