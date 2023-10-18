import Header from "../../component/header";
import { useState } from "react";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../db/Firebase";

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
          await addDoc(collection(db,`pedido`), {
            nomeUser: nome,
            telefone: telefone,
            ruaPedido: rua,
            bairroPedido: bairro,
            numeroPedido: numero,
            comple: comple, 
          })
          .then(()=>{
            alert("Pedido efetuado com sucesso");
          }) .catch((erro)=>{
            alert("Erro: "+erro)
          })
        }else{
            alert("Prencha todos os campos obrigatorios")
        }
    }
    return(
        
        <div>
            <Header/>

            <label>Pedido de Serviço</label>
            <form>
                <label>Nome:</label>
                <input placeholder="Nome do usuario que fez o pedido" type="text" onChange={(e)=>{setNome(e.target.value)}}/>
                <label>Tipo de pedido:</label>
                <select value={pedido} onChange={selecionar}>
                    <option value={""}>Seleceionar...</option>
                    <option value="Manutenção de Lampada">Manutenção de Lampada</option>
                    <option value="Limpar Buero">Limpar Buero</option>
                    <option value="Carga de Terra">Carga de Terra</option>
                    <option value="Roçar">Roçar</option>
                    <option value="Repintar faixas">Repintar faixas</option>
                    <option value="Manutenção de Pracinha">Manutenção de Pracinha</option>
                </select>
                <label>Telefone:</label>
                <input placeholder="Numero de telefone" type="tel" onChange={(e)=>{setTelefone(e.target.value)}}/>
                <label>Rua:</label>
                <input placeholder="Digite a rua" type="text" onChange={(e)=>{setRua(e.target.value)}}/>
                <label>Bairro:</label>
                <input placeholder="Digite o bairro" type="text" onChange={(e)=>{setBairro(e.target.value)}}/>
                <label>Numero:</label>
                <input placeholder="Numero do endereço" type="number" onChange={(e)=>{setNumero(e.target.value)}}/>
                <label>Complemento:</label>
                <input placeholder="Caso precise, adicione o complemento" type="text" onChange={(e)=>{setComple(e.target.value)}}/>
                <button onClick={pedir}>Pedir</button>
            </form>
        </div>
    )
}