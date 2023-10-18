import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            
            <Card className="card-register">
                <h1 className="title-register">Registro</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" placeholder="Digite o nome" onChange={(e)=>{setNome(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" placeholder="Digite o email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setSenha(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" placeholder="Confirme a senha" onChange={(e)=>{setCSenha(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" onClick={confirma}>Cadastrar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}