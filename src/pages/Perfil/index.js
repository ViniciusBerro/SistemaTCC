import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../component/header"
import { doc, updateDoc } from "firebase/firestore"
import {db} from '../../db/Firebase'

import { Card,Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Perfil(){
    
    const navigate = useNavigate();
    const {user,logout,infoUser,setUser}= useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [rua, setRua] = useState(user && user.rua)
    const [bairro, setBairro] = useState(user && user.bairro)
    const [numero, setNumero] = useState(user && user.numero)
    const [comple, setComple] = useState(user && user.comple)

    async function Sair(){
        await logout();
        navigate('/')
    }
    
    function editar(){
        navigate('/Editar-Perfil')
    }
    return(
        <div>
            <Header/>
            
            <h1 className="title-perfil">Perfil</h1>
               
                <form className="infoUser">
                    <p>Nome: {user?user.nome:''}</p>
                    <p>Email: {user?user.email:''}</p>
                    <p>Rua: {user?user.rua:''}</p>
                    <p>Bairro: {user?user.bairro:''}</p>
                    <p>Numero: {user?user.numero:''}</p>
                    <p>Complemento:</p>
                    <p>{user?user.comple:''}</p>
                </form>
                    
                <Button variant="primary" onClick={editar}>Modificar</Button>
                <Button variant="danger" onClick={Sair}>Sair</Button>

        </div>
    )
}


