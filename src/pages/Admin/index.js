import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../db/Firebase";

import './admin.css'

const listRef = collection(db,'Pedido');

export default function Admin(){
    const navigate = useNavigate();
    const {logout}= useContext(AuthContext);

    const [pedidos,setPedidos] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)


    useEffect(()=>{
        async function loadPedidos(){
            
            const q = query(listRef, orderBy('created', 'desc'), limit(5));

            const querySnapshot = await getDocs(q)
            setPedidos([]);
            debugger
            await updateState(querySnapshot);


            setLoading(false);
            
        }
        
        loadPedidos();
        
        return()=>{}
    },[])

    async function updateState(querySnapshot){
        
        const isCollectionEmpty = querySnapshot.size === 0;
        if(!isCollectionEmpty){
            let lista = [];
            
            querySnapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    servico: doc.data().servico,
                    nome: doc.data().nome,
                    rua: doc.data().rua,
                    bairro: doc.data().bairro,
                    numero: doc.data().numero,
                    telefone: doc.data().telefone,
                    comple: doc.data().comple,
                    dia: doc.data().dia,
                    status: doc.data().status,
                })
            })
            setPedidos(pedidos => [...pedidos, ...lista])
            
        }else{
            setIsEmpty(true);
        }
    }

    async function Sair(){
        await logout();
        navigate('/login')
    }
    function Voltar(){
        navigate('/')
    }
    if(loading){
        return(
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }
    return(
        <div>
            
            <button onClick={Sair}>Sair</button>
            <button onClick={Voltar}>Voltar</button>
            <h1>Modo administrador</h1>
            <>
            {pedidos.length === 0 ? (
            <div>
                <span className="text-not">Nenhum pedido Encontrado...</span>
            </div>
            ):(
            <>
                <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Nome</th>
                        <th>Bairro</th>
                        <th>Rua</th>
                        <th>Numero</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((item,index)=>{
                        return(
                        <tr key={index}>
                            <td data-label='Status'>
                                <button className="badge" style={{backgroundColor:'#999'}}>
                                    {item.status}
                                </button>
                            </td>
                            <td data-label='Nome'>{item.nome}</td>
                            <td data-label='Bairro'>{item.bairro}</td>
                            <td data-label='Rua'>{item.rua}</td>
                            <td data-label='Numero'>{item.numero}</td>
                            <td data-label='Telefone'>{item.telefone}</td>
                        </tr>
                        )
                    })}
                    
                    
                </tbody>
                </table>
            </>
            )}
            </>
        </div>
    );
}
