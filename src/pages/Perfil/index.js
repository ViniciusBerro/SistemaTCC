import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../component/header"

import { Card, Button } from "react-bootstrap"
import { useNavigate,Link } from "react-router-dom"

import './perfil.css'

export default function Perfil(){
    
    const navigate = useNavigate();
    const {user,logout}= useContext(AuthContext);

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
    function MeusPedidos(){
        navigate('/Meus-Pedidos')
    }
    return(
        <div>
            <Header/>
            
            <Button variant="danger" id="btn-sair" onClick={Sair}>Sair</Button>
            <Button variant="primary" id="btn-pedidos" onClick={MeusPedidos}>Pedidos</Button>
                <Card className="card-perfil modPerfil" id="card-perfil">
                <h1 className="title-perfil">Perfil</h1>
                <Card.Body>
                    <form className="infoUser">
                        <p>Nome: {user?user.nome:''}</p>
                        <p>Email: {user?user.email:''}</p>
                        <p>Rua: {user?user.rua:''}</p>
                        <p>Bairro: {user?user.bairro:''}</p>
                        <p>Numero: {user?user.numero:''}</p>
                        <p>Complemento:</p>
                        <p>{user?user.comple:''}</p>
                    </form>
                    <Button id="bnt-alterar" variant="primary" onClick={editar}>Alterar Perfil</Button>
                </Card.Body>
            </Card>
        </div>
        
    )
}


