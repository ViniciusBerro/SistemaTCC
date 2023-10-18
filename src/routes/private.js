import { useEffect,useState } from "react"

import { auth } from "../db/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [sing,setSing] = useState(false)

    useEffect(()=>{
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user){
                    const useData = {
                        uid: user.uid,
                        emailUser: user.emailUser,
                        nomeUser: user.nomeUser,
                    }
                    localStorage.setItem("@dateUser", JSON.stringify(useData))
                    setLoading(false)
                    setSing(true)
                }else{
                    setLoading(false);
                    setSing(false);
                }
            })
        }
        checkLogin();
    },[])
    if(loading){
        return(
            <div></div>
        )
    }
    if(!sing){
        return <Navigate to="/"/>
    }
    return children;
}