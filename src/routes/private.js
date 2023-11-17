import { useEffect,useState,useContext } from "react"
import { AuthContext } from "../contexts/auth";
import { Link, Navigate } from "react-router-dom";

export default function Private({children}){
    const {user} = useContext(AuthContext)
    
    if(user && user.email === 'admin@admin.com'){
        <Link to='/admin'/>
    }else{
        <Link to='/perfil'/>
    }
    return children;
}