import Header from "../../component/header";
import { useState } from "react";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

import { Card,Form,Button,DropdownButton,Dropdown,FloatingLabel } from "react-bootstrap";
import './work.css'

export default function Work(){
    const [nome,setNome] = useState('')
    const [pedido, setPedido] = useState('')
    const [telefone, setTelefone]=useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [comple, setComple] = useState('')



    function selecionar(e){
        setPedido(e.target.value)
        console.log(e.target.value);
    }
    async function pedir(e){
        e.preventDefault()
        if(
        nome !== '' && 
        pedido !== '' &&
        telefone !== '' && 
        rua !=='' && 
        bairro !== '' &&
        numero !== ''){
          await addDoc(collection(db,'pedido'), {
            nomeUser: nome,
            telefone: telefone,
            ruaPedido: rua,
            bairroPedido: bairro,
            numeroPedido: numero,
            serviço: pedido,
            comple: comple, 
          })
          .then(()=>{
            alert("Pedido efetuado com sucesso");
            
          }).catch((erro)=>{
            alert("Erro: "+erro)
          })
        }else{
            alert("Prencha todos os campos obrigatorios")
        }
    }
    return(
        
        <div>
            <Header/>

            <Card className="card-request">
                <h1 className="title-request">Pedido de Serviço</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" placeholder="Nome" onChange={(e)=>{setNome(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="tel" placeholder="Telefone" onChange={(e)=>{setTelefone(e.target.value)}}/>
                        </Form.Group>
                        <Form.Select aria-label="Default select example" value={pedido} onChange={selecionar}>
                          <option value={""}>Seleceionar Pedido...</option>
                          <option value="Manutenção de Lampada">Manutenção de Lampada</option>
                          <option value="Limpar Buero">Limpar Buero</option>
                          <option value="Carga de Terra">Carga de Terra</option>
                          <option value="Roçar">Roçar</option>
                          <option value="Repintar faixas">Repintar faixas</option>
                          <option value="Manutenção de Pracinha">Manutenção de Pracinha</option>
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" placeholder="Rua" onChange={(e)=>{setRua(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" placeholder="Bairro" onChange={(e)=>{setBairro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="number" placeholder="Numero da casa" onChange={(e)=>{setNumero(e.target.value)}}/>
                        </Form.Group>
                        
                        <Form.Control as="textarea" placeholder="Complemento" onChange={(e)=>{setComple(e.target.value)}}/>
                        
                        <Button variant="primary" onClick={pedir}>Fazer pedido</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}