import Header from "../../component/header";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

import { Card,Form,Button,DropdownButton,Dropdown,FloatingLabel } from "react-bootstrap";
import './work.css'

export default function Work(){
  const {user, signed} = useContext(AuthContext);
  const navigate = useNavigate();
  const[pedido, setPedido] = useState([]);

  const [nome,setNome] = useState(user? user.nome:'')
  const [tipo, setTipo] = useState('')
  const [telefone, setTelefone]=useState('')
  const [rua, setRua] = useState(user? user.rua:'')
  const [bairro, setBairro] = useState(user? user.bairro:'')
  const [numero, setNumero] = useState(user? user.numero: '')
  const [comple, setComple] = useState(user? user.comple: '')
  
  function selecionar(e){
    setTipo(e.target.value)
    console.log(e.target.value);
  }
  async function pedir(e){
    debugger
     
    if(signed && user.bairro && user.rua && user.numero && telefone !== '' && pedido !== ''){
      await addDoc(collection(db, 'Pedido'),{
        dia: new Date(),
        telefone: telefone,
        nome: user.nome,
        bairro: user.bairro,
        rua: user.rua,
        numero: user.numero,
        comple: comple,
        servico: tipo,
        status: 'enviado'
      })
      .then(()=>{
        alert("Pedido efetuado");
        setPedido('')
        navigate('/')
      })
      .catch((error)=>{
      alert('Erro ao efetuar o registo')
    })
    }else  
    if(signed && bairro !== '' && rua !== '' && numero !== '' && telefone !== '' && pedido !== ''){
      await addDoc(collection(db, 'Pedido'),{
        dia: new Date(),
        telefone: telefone,
        nome: user.nome,
        bairro: bairro,
        rua: rua,
        numero: numero,
        comple: comple,
        servico: tipo,
        status: 'enviado'
      })
      .then(()=>{
          alert("Pedido efetuado");
          setPedido('')
          navigate('/')
         })
       .catch((error)=>{
      alert('Erro ao efetuar o registo')
      })
      }else 
    if(nome !== '' && bairro !== '' && rua !== '' && numero !== '' && telefone !== '' && tipo !== '' ){
      await addDoc(collection(db, 'Pedido'),{
        dia: new Date(),
        telefone: telefone,
        nome: nome,
        bairro: bairro,
        rua: rua,
        numero: numero,
        comple: comple,
        servico: tipo,
        status: 'Enviado'
      })
      .then(()=>{
        alert("Pedido efetuado");
        setPedido('')
        navigate('/')
      })
      .catch((error)=>{
        alert('Erro ao efetuar o registo')
      })  
    }
    else{
      alert('Prencha os campos')
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
                  <Form.Select aria-label="Default select example" value={tipo} onChange={selecionar}>
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
    
