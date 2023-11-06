import { useEffect,useState,useContext } from "react"
import { AuthContext } from "../contexts/auth";
import { Link, Navigate } from "react-router-dom";

export default function Private({children}){
    const {signed} = useContext(AuthContext)
    if(!signed){
        <Link to='/'/>
    }
    return children;
}