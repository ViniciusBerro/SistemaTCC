import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../component/header"
import { doc, updateDoc } from "firebase/firestore"
import {db} from '../../db/Firebase'

import { Card,Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Perfil(){
    
    const navigate = useNavigate();
    const {logout,user,infoUser,setUser}= useContext(AuthContext);

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
    async function alterar(){
        const docRef = doc(db, "Users", user.uid)
        await updateDoc(docRef,{
            nomeUser: nome,
            bairroUser: bairro,
            ruaUser: rua,
            numeroUser: numero,
            compleUser: comple
        })
        .then(()=>{
            let data = {
                nome: nome,
                email: user.email,
                bairro: bairro,
                rua: rua,
                numero: numero,
                comple: comple
            }
            setUser(data);
            infoUser(data);
        })
    }
    
    
    return(
        <div>
            <Header/>
            <Card className="card-perfil">
                <h1 className="title-perfil">Perfil</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" value={email} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="Rua" value={rua} onChange={(e)=>{setRua(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Bairro" value={bairro} onChange={(e)=>{setBairro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="number" placeholder="Numero" value={numero} onChange={(e)=>{setNumero(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Complemento" value={comple} onChange={(e)=>{setComple(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" onClick={alterar}>Modificar</Button>
                        <Button variant="danger" onClick={Sair}>Sair</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}