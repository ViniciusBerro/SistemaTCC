import Header from "../../component/header";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

import { Card,Form,Button,DropdownButton,Dropdown,FloatingLabel } from "react-bootstrap";
import './work.css'

export default function Work(){
    const navigate = useNavigate();

    const {user} = useContext(AuthContext)
    
    const [nome,setNome] = useState(user? user.nome:'')
    const [pedido, setPedido] = useState('')
    const [telefone, setTelefone]=useState('')
    const [rua, setRua] = useState(user? user.rua:'')
    const [bairro, setBairro] = useState(user? user.bairro:'')
    const [numero, setNumero] = useState(user? user.numero: '')
    const [comple, setComple] = useState(user? user.comple: '')

    


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
          await addDoc(collection(db,'Pedido'), {
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
            navigate('/')
          }).catch((erro)=>{
            alert("Erro: "+erro)
          })
        }else
        if(user && !user.bairro && !user.rua && !user.numero && telefone !== '' && pedido !== ''){
            await addDoc(collection(db,'Pedido'), {
                nomeUser: user.nome,
                telefone: telefone,
                ruaPedido: rua,
                bairroPedido: bairro,
                numeroPedido: numero,
                serviço: pedido,
                comple: comple, 
              })
              .then(()=>{
                alert("Pedido efetuado com sucesso");
                navigate('/')
              }).catch((erro)=>{
                alert("Erro: "+erro)
              })
        }

        else
        if(user && telefone !== '' && pedido !== ''){
            await addDoc(collection(db,'pedido'), {
                nomeUser: user.nome,
                telefone: telefone,
                ruaPedido: user.rua,
                bairroPedido: user.bairro,
                numeroPedido: user.numero,
                serviço: pedido,
                comple: user.comple, 
              })
              .then(()=>{
                alert("Pedido efetuado com sucesso");
                navigate('/')
              })
              .catch((erro)=>{
                alert("Erro: "+erro)
              })
        }
        else{
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
                            <Form.Control type="text" placeholder="Nome" value={user?user.nome: nome} onChange={(e)=>{setNome(e.target.value)}}/>
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
                            <Form.Control type="text" placeholder="Rua" value={user && user.rua !== ''?user.rua: rua} onChange={(e)=>{setRua(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" placeholder="Bairro" value={user && user.bairro !== ''?user.bairro: bairro} onChange={(e)=>{setBairro(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="number" placeholder="Numero da casa" value={user && user.numero !== ''?user.numero : numero} onChange={(e)=>{setNumero(e.target.value)}}/>
                        </Form.Group>
                        
                        <Form.Control as="textarea" placeholder="Complemento" value={user && user.comple !== '' ?user.comple: comple} onChange={(e)=>{setComple(e.target.value)}}/>
                        
                        <Button variant="primary" onClick={pedir}>Fazer pedido</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}