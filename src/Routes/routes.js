import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../Pages/Login'
import Editor from '../Pages/Editor'
import MainContainer from '../Pages/MainContainer'

const Routes = () => {
  return useRoutes([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/mainPage",
        element: <MainContainer/>
    },
   
    {
        path: "/editor/:id",
        element: <Editor/>
    },
    {
        path: "*",
        element: <div>No Route Found</div>
    }
  ])
}

export default Routes