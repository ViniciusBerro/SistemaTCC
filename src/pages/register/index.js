import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../component/header";

import { auth,db } from "../../db/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc,collection } from "firebase/firestore";

import './register.css'
import { Card, Form,Button } from "react-bootstrap";

export default function Register(){
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [cSenha, setCSenha] = useState('')
    const navigate = useNavigate();

    async function confirma(e){
        e.preventDefault()
        if(senha === cSenha){
            if(nome !== '' && email !== ''){
                await createUserWithEmailAndPassword(auth, email, senha)
                .then(()=>{
                    addDoc(collection(db, "Users"), {
                        emailUser: email,
                        nomeUser: nome,
                    })
                    navigate('/', {replace:true})
                })
                .catch(()=>{
                    alert("Erro ao efetuar o Cadastro")
                })
            }
            else{
                alert("Complete todos os textos")
            }
        }else{
            alert("diferente")
        }
    }
    return(
        <div>
            <Header/>
            
            <Card style={{ width: '18rem' }} className="card-register">
                <Card.Title className="title-register">Registro</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome" onChange={(e)=>{setNome(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setSenha(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Confirme a Senha:</Form.Label>
                            <Form.Control type="password" placeholder="Confirme a senha" onChange={(e)=>{setCSenha(e.target.value)}}/>
                        </Form.Group>
                        <Button className="bnt-register" variant="primary" onClick={confirma}>Cadastrar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}