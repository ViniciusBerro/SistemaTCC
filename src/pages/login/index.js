import {  useNavigate,Link } from "react-router-dom"
import { useContext, useState } from "react"

import Header from "../../component/header"
import { AuthContext } from "../../contexts/auth";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db/Firebase";

import './login.css'
import { Form,Button, Card } from "react-bootstrap";



export default function Login(){
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const navigate = useNavigate();

    const {login} = useContext(AuthContext)

    async function Abrir(e){
        e.preventDefault()
        if(email !== '' && senha !== ''){
            login(email, senha)
            navigate('/', {replace:true})
                
        }
        else{
            alert("Prencha os Campos");
        }
        
    }
    return(
        <div className="corpo-login">
            <Header/>
            
            <Card className="card-login">
                <h1 className="title-login">Login</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" placeholder="Senha" onChange={(e)=>{setSenha(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" onClick={Abrir}>Entrar</Button>
                    </Form>
                    <Link to='/registro'>Não tem uma conta, Clique aqui!</Link>
                </Card.Body>
            </Card>
        </div>
    )
    
}