import { useContext, useState } from "react";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";

import './register.css'
import { Card, Form,Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/auth";

export default function Register(){
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [cSenha, setCSenha] = useState('')

    const {register} = useContext(AuthContext)

    const navigate = useNavigate();
    async function confirma(e){
        e.preventDefault()
        if(senha === cSenha){
            if(nome !== '' && email !== ''){
                register(nome, email, senha)
                navigate('/', {replace:true})
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
                        <Form.Group className="mb-3" controlId="formGroupName">
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