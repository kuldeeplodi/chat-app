
import {Routes,Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import {useAuthStore} from './store/useAuthStore';
import {useThemeStore} from './store/useThemeStore';
import { useEffect } from 'react';
import './App.css'
import {Loader} from 'lucide-react';
import {Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

function App() {
  const {authUser,isCheckAuth,checkAuth}=useAuthStore();
  const {theme}=useThemeStore();

  useEffect(()=>{checkAuth()},[checkAuth])
  console.log({authUser});

  if(isCheckAuth && !authUser)
    return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Loader className='size-10 animate-spin'/>
    </div>
    );

  return (
    <div data-theme={theme}>
    <Navbar/>
     <Routes>
      
      <Route path="/" element ={authUser?<Home/>:<Navigate to="/login"/>}/>
       <Route path="/signup" element ={!authUser?<Signup/>:<Navigate to="/"/>}/>
        <Route path="/login" element ={!authUser?<Login/>:<Navigate to="/"/>}/>
         <Route path="/settings" element ={<Settings/>}/>
          <Route path="/profile" element ={authUser?<Profile/>:<Navigate to="/login"/>}/>
     </Routes>
     <Toaster />
    </div>
  )
}

export default App
