import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import {toast} from 'react-hot-toast';

export const useAuthStore=create((set)=>({
    authUser:null,
    isSignedIn:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckAuth:true,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data})
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
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))