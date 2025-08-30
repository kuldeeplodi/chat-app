import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import {toast} from 'react-hot-toast';
import { io } from "socket.io-client"

const BASE_URL="http://localhost:3000"

export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSignedIn:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data})
             get().connectSocket()
        } catch (error) {
            console.log(error);
            set({authUser:null})
        }
        finally{
            set({isCheckAuth:false})
        }
    },

    signup:async(data)=>{
       set({isSigningUp:true});
       try {
        const res= await axiosInstance.post('/auth/signup',{
      fullname: data.fullname,      // 👈 match your backend
      email: data.email,
      password: data.password,
    });
        set({authUser:res.data});
        toast.success("Signup successful");
         get().connectSocket()
       } catch (error) {
       toast.error(error.response.data.message)
       }
       finally{
        set({isSigningUp:false});
       }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try {
         const res= await axiosInstance.post('/auth/login',{
       email: data.email,
       password: data.password,
     });
         set({authUser:res.data});
         toast.success("Login successful");
         get().connectSocket()
        } catch (error) {
        toast.error(error.response.data.message)
        }
        finally{
         set({isLoggingIn:false});
        }
     },
     updateProfile:async(data)=>{
        console.log("Updating profile with data:", data);
        set({isUpdatingProfile:true});
        try {
         const res= await axiosInstance.put('/auth/update-profilepic',data);
         set({authUser:res.data});
         toast.success("Profile updated successfully");
        } catch (error) {
        toast.error(error.response.data.message)
        }
        finally{
         set({isUpdatingProfile:false});
        }
     },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out  successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    connectSocket:()=>{
        const{authUser}=get()
        if(!authUser||get().socket?.connected) return;
        const socket =io(BASE_URL,{
            query:{
                userId:authUser._id,
            },
        })
        socket.connect()

        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
    
}))