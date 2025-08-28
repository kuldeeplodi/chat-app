import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const useChatStore=create((set)=>({
    messages:[],
    users:[],
   selectedUser:null,
   isMessagesLoading:false,
   isUsersLoading:false,

   getUsers:async()=>{
    set({isUsersLoading:true});
    try {
        const res=await axiosInstance.get('/message/users');
        set({users:res.data});
    } catch (error) {
        console.log("Error in getUsers", error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
        
    }finally{
        set({isUsersLoading:false});
    }
   },

   getMessages:async(userId)=>{
    set({isMessagesLoading:true});
    try {
        const res=await axiosInstance.get(`/message/${userId}`);
        set({messages:res.data});
    } catch (error) {
        console.log("Error in getMessages", error);
        toast.error(error.response?.data?.message || "Failed to fetch messages");
        
    }finally{
        set({isMessagesLoading:false});
    }
   },
}))