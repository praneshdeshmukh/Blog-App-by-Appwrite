
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserStatus().then((userData) => {      
        if(userData) {
          dispatch(login({userData : {
            $id : userData.$id,
            // name : userData.name,
            email : userData.email,
            password: userData.password

          }}))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  },[])

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if (userData) {
  //       dispatch(login({userData}))
  //     } else {
  //       dispatch(logout())
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }, [])

  return !loading ? 
  ( 
    <div className='min-h-screen flex flex-col items-center bg-gray-400'>
      <div className='flex-1 w-full text-center'>
        <Header/>
        <main>
          TODO : <Outlet/>
        </main>
        <Footer/>
      </div>
   </div>
  )
  : null
  // : (
    
  // <div className="fixed inset-0 flex flex-col items-center justify-center bg-white gap-4">
  //   <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-green-600 animate-spin" />
  //   <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">Loading...</p>
  // </div>
    
  //   )
}

export default App
