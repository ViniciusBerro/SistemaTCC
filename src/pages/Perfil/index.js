import { useState } from "react"
import Header from "../../component/header"
import { Link } from "react-router-dom"


import { Card,Form, Button } from "react-bootstrap"

export default function Perfil(){
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [comple, setComple] = useState('')

    function mostra(){
        alert(`Nome: ${nome} \n
        Email: ${email} \n
        Rua: ${rua} \n
        Bairro: ${bairro} \n
        Numero: ${numero} \n
        Complemento: ${comple} \n`)
    }
    return(
        <div>
            <Header/>

            <h1>Perfil </h1>
            <Card className="card-perfil">
                <h1 className="title-perfil">Perfil</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupNome">
                            <Form.Control type="text" placeholder="Nome" onChange={(e)=>{setNome(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="Rua" onChange={(e)=>{setRua(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupBairro">
                            <Form.Control type="text" placeholder="Bairro" onChange={(e)=>{setBairro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupNumero">
                            <Form.Control type="number" placeholder="Numero" onChange={(e)=>{setNumero(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupNumero">
                            <Form.Control type="text" placeholder="Complemento" onChange={(e)=>{setComple(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" onClick={mostra}>Modificar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}