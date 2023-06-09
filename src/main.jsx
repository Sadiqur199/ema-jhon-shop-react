import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Layout/Home';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import CardproductLoder from './components/Lodder/CardProductLoder';
import CheckOut from './components/CheckOut/CheckOut';
import Singup from './components/Singup/Singup';
import AuthProvider from './components/Provider/AuthProvider';
import PrivateRoutes from './Routes/PrivateRoutes';

const router = createBrowserRouter([

  {
    path:'/',
    element:<Home></Home>,
    children:[
      {
        path:'/',
        element:<Shop></Shop>,
        loader: ()=> fetch('https://ema-john-sopping-server.vercel.app/totalProducts')
      },
      {
        path:'orders',
        element:<Orders></Orders>,
        loader:CardproductLoder
      },
      {
        path:'inventory',
        element:<PrivateRoutes><Inventory></Inventory></PrivateRoutes>
      },
      {
        path:'checkout',
        element:<PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'singup',
        element:<Singup></Singup>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
