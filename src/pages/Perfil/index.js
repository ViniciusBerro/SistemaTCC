import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../component/header"
import { doc, updateDoc } from "firebase/firestore"
import {db} from '../../db/Firebase'

import { Card,Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Perfil(){
    
    const navigate = useNavigate();
    const {user,logout,infoUser,setUser,signed}= useContext(AuthContext);

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
                email: user.email,
                bairro: bairro,
                rua: rua,
                numero: numero,
                comple: comple
            }
            
            setUser(data);
            infoUser(data);
            alert('alteração efetuada com sucesso')
            alert(signed);
        })
        
    }
    
    return(
        <div>
            <Header/>
            <Card className="card-perfil">
                <h1 className="title-perfil">Perfil</h1>
                
                <Card.Body>
                    <form>
                        <p>Nome: {nome}</p>
                        <p>Email: {email}</p>
                        <p>Rua: {rua}</p>
                        <p>Bairro: {bairro}</p>
                        <p>Numero: {numero}</p>
                        <p>Complemento:</p>
                        <p>{comple}</p>
                    </form>
                    
                    <Button variant="primary">Modificar</Button>
                    <Button variant="danger" onClick={Sair}>Sair</Button>


                    <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
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
                            
                    </Form>

                    
                    


                </Card.Body>
            </Card>
        </div>
    )
}