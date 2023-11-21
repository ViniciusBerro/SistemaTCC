import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth"
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, query, updateDoc,doc } from "firebase/firestore";
import { db } from "../../db/Firebase";

import './workAdmin.css'

const listRef = collection(db,'Pedido');

export default function WorkAdmin(){
    const navigate = useNavigate();
    const {logout}= useContext(AuthContext);

    const [pedidos,setPedidos] = useState([])
    const [loading, setLoading] = useState(true)

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [buscaServico, setBuscaServico] = useState('');
    const [buscaStatus, setBuscaStatus] = useState('');

    useEffect(()=>{
        async function loadPedidos(){
            const q = query(listRef, limit(5));
            setPedidos([])
            const querySnapshot = await getDocs(q)
            await Listas(querySnapshot)

            setLoading(false)
        }
        loadPedidos();
        return()=>{}
    },[])
    async function Listas(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
        if(!isCollectionEmpty){
            let lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    bairro: doc.data().bairro,
                    comple: doc.data().comple,
                    dia: doc.data().dia,
                    nome: doc.data().nome,
                    cor: doc.data().cor,
                    numero: doc.data().numero,
                    rua: doc.data().rua,
                    servico: doc.data().servico,
                    status: doc.data().status,
                    telefone: doc.data().telefone,
                })
            })
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            
            setPedidos(pedidos =>[...pedidos, ...lista])
            setLastDocs(lastDoc);

        }
        else{
            setIsEmpty(true);
        }
        setLoadingMore(false)
    }
    if(loading){
        return(
            <div>
                <button onClick={Sair}>Sair</button>
                <button onClick={Voltar}>Voltar</button>
                <h1>Modo administrador</h1>
                <h1>Carregando...</h1>
            </div>
        )
    }
    async function Sair(){
        await logout();
        navigate('/login')
    }
    function Voltar(){
        navigate('/perfil')
    }
    async function encarregado(item){
        if(item.status === 'Enviado'){
            const docRef = doc(listRef, item.id)
            await updateDoc(docRef,{
                status: 'Encarregado',
                cor: '#ffff00',
            }).then(
                alert('Enviado para o encarregado'),
                window.location.reload()
            )
        }else{
            alert('Não pode efetuar esse comando')
        }
        
    }
    async function buscarMais(){
        setLoadingMore(true);
        const q = query(listRef,startAfter(lastDocs), limit(5));
        const querySnapshot = await getDocs(q);
        await Listas(querySnapshot);
    }
    /*
    const pedidosFiltro = pedidos.filter((pedidos) => pedidos.servico.startsWith(buscaServico))
    const statusFiltro = pedidos.filter((pedidos)=> pedidos.status.startsWith(buscaStatus))
    */
    const resultadosFiltrados = pedidos.filter((pedido) => {
        return pedido.servico.startsWith(buscaServico) && pedido.status.startsWith(buscaStatus);
      });
    return(
        <div>
            
            <button className="bnt-sair" onClick={Sair}>Sair</button>
            <button className="bnt-voltar" onClick={Voltar}>Voltar</button>
            <h1 className="titulo-admin">Modo administrador</h1>
            <>
            {pedidos.length === 0 ? (
            <div>
                <span className="text-not">Nenhum pedido Encontrado...</span>
            </div>
            ):(
            <>
            <p className="busca-servico">
                Tipo do Serviço:
                <select className="busca-servico" value={buscaServico} onChange={(ev)=>{setBuscaServico(ev.target.value)}}>
                    <option value=''>Todos...</option>
                    <option value="Manutenção de Lampada">Manutenção de Lampada</option>
                    <option value="Limpar Buero">Limpar Buero</option>
                    <option value="Carga de Terra">Carga de Terra</option>
                    <option value="Roçar">Roçar</option>
                    <option value="Repintar faixas">Repintar faixas</option>
                    <option value="Manutenção de Pracinha">Manutenção de Pracinha</option>
                </select>
            </p>
            <p className="busca-status">
                Status do Serviço:
                <select value={buscaStatus} onChange={(ev)=>{setBuscaStatus(ev.target.value)}}>
                    <option value=''>Todos...</option>
                    <option value='Enviado'>Enviado</option>
                    <option value='Encarregado'>Encarregado</option>
                    <option value='Pronto'>Pronto</option>
                </select>
            </p>
            
                <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Nome</th>
                        <th>Bairro</th>
                        <th>Rua</th>
                        <th>Numero</th>
                        <th>Telefone</th>
                        <th>Serviço</th>
                    </tr>
                </thead>
                <tbody>
                    {resultadosFiltrados.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <td data-label='Status'>
                                    <button className="badge" onClick={()=>encarregado(item)} style={{backgroundColor:item.cor}} >
                                        {item.status}
                                    </button>
                                </td>
                                <td data-label='Nome'>{item.nome}</td>
                                <td data-label='Bairro'>{item.bairro}</td>
                                <td data-label='Rua'>{item.rua}</td>
                                <td data-label='Numero'>{item.numero}</td>
                                <td data-label='Telefone'>{item.telefone}</td>
                                <td data-label='Servico'>{item.servico}</td>
                            </tr>
                            )
                        
                    })}
                    
                    
                </tbody>
                </table>
                {loadingMore && <h3>Buscando Pedidos ...</h3>}
                {!loadingMore && !isEmpty && <button className="buscar-pedidos-admin" onClick={buscarMais}>Buscar mais pedidos</button>}
            </>
            )}
            </>
            
        </div>
    );
}