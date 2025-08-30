import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({
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

   setSelectedUser:(user)=>{
    set({selectedUser:user});
   },

   SendMessage:async(messageData)=>{
    const {selectedUser,messages}=get();
    try{
        const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
        set({messages:[...messages,res.data]});
    }
    catch(error){
        toast.error(error.response.data.message);
    }


},
subscribeToMessages:()=>{
    const {selectedUser}=get()
    if(!selectedUser) return;

    const socket=useAuthStore.getState().socket;

    socket.on("newMessage",(newMessage)=>{set({messages:[...get().messages,newMessage]})})
},

unsubscribeFromMessage:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage")

},


}
))