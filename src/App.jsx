import './App.css'
import Header from './Header'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './Login';
import AuthContextProvider from './AuthContext';
import Register from './Register';
import CreatePostModal from './CreatePostModal';

import { useState } from 'react';

import Home from './Home';
import Feed from './Feed';

function App() {

  const [postModal,setPostModal] = useState(false)
  const [postUploaded,setPostUploaded] = useState(false)
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home postUploaded={postUploaded} />,
      children:[
        {
          path:"/home/feed",
          element:<Feed/>
        }
      ]
      
      
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);


  return (
    <>
      <AuthContextProvider>
    
          <Header postModal={postModal} setPostModal={setPostModal}/>
          

          <RouterProvider router={router}></RouterProvider>
          {postModal && 
          
          <CreatePostModal 
              postUploaded={postUploaded} 
              setPostUploaded = {setPostUploaded}
              postModal={postModal} 
              setPostModal={setPostModal}/>
          }

      </AuthContextProvider>

    </>
  )
}

export default App
