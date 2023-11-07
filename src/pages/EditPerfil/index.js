import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"

import Header from "../../component/header"
import { doc, updateDoc } from "firebase/firestore"
import {db} from '../../db/Firebase'

import { Card,Form, Button, Alert } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

export default function EditPerfil(){
    const navigate = useNavigate();
    const {user,logout,infoUser,setUser,signed}= useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [rua, setRua] = useState(user && user.rua)
    const [bairro, setBairro] = useState(user && user.bairro)
    const [numero, setNumero] = useState(user && user.numero)
    const [comple, setComple] = useState(user && user.comple)

    async function alterar(e){
        e.preventDefault();
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
                ...user,
                nome: nome,
                bairro: bairro,
                rua: rua,
                numero: numero,
                comple: comple
            }
            
            setUser(data);
            infoUser(data);
            navigate('/perfil')
        })
        
    }
    function voltar(){
        navigate('/perfil')
    }
    return(
        <div>
            <Header/>
            <Button variant="primary" onClick={voltar}>Voltar</Button>
            <Card className="card-perfil modPerfil">
                <h1>Editar Perfil</h1>
                <Card.Body>
                    <Form>
                            <Form.Group className="mb-3" >
                                Nome:
                                <Form.Control type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                Rua:
                                <Form.Control type="text" placeholder="Rua" value={rua} onChange={(e)=>{setRua(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                Bairro
                                <Form.Control type="text" placeholder="Bairro" value={bairro} onChange={(e)=>{setBairro(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                Numero:
                                <Form.Control type="number" placeholder="Numero" value={numero} onChange={(e)=>{setNumero(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                Complemento:
                                <Form.Control type="text" placeholder="Complemento" value={comple} onChange={(e)=>{setComple(e.target.value)}}/>
                            </Form.Group>
                            <Button variant="primary" onClick={alterar}>Modificar</Button>
                                
                        </Form>
                    </Card.Body>
                </Card>
        </div>
        
    )
}