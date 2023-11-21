import { Button } from "react-bootstrap"
import Header from "../../component/header"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { useState, useContext, useEffect } from "react"
import { db } from "../../db/Firebase"
import { collection, getDocs, limit, startAfter, query, updateDoc, doc } from "firebase/firestore"

import './WorkPerfil.css'

const listRef = collection(db, 'Pedido');
export default function WorkPerfil(){
    const {user}= useContext(AuthContext);
    const navigate = useNavigate();

    const [pedidos,setPedidos] = useState([])
    const [loading, setLoading] = useState(true)

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [email, setEmail] = useState(user && user.email);
    
    useEffect(()=>{
        async function loadPedidos(){
            
            const q = query(listRef, limit(5));
            setPedidos([])
            const querySnapshot = await getDocs(q)
            
            
            setEmail(user.email)
            await Listas(querySnapshot)

            setLoading(false)
        }
        loadPedidos();
        
        console.log(pedidos)
        return() => {}
        
    },[])
    async function Listas(querySnapshot){
        
        const isCollectionEmpty = querySnapshot.size === 0;
        if(!isCollectionEmpty){
            let lista=[];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    bairro: doc.data().bairro,
                    comple: doc.data().comple,
                    dia: doc.data().dia,
                    nome: doc.data().nome,
                    email: doc.data().email,
                    cor: doc.data().cor,
                    numero: doc.data().numero,
                    rua: doc.data().rua,
                    servico: doc.data().servico,
                    status: doc.data().status,
                    telefone: doc.data().telefone,
                })
            })
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length -1]

            setPedidos(pedidos => [...pedidos, ...lista])
            setLastDocs(lastDoc)
        }
        else{
            setIsEmpty(true);
        }
        setLoadingMore(false)
    }
    async function buscarMais(){
        setLoadingMore(true);
        
        const q = query(listRef,startAfter(lastDocs), limit(5));
        const querySnapshot = await getDocs(q);
        await Listas(querySnapshot);
    }
    async function pronto(item){
        if(item.status === 'Encarregado'){
            const docRef = doc(listRef, item.id)
            await updateDoc(docRef,{
                status: 'Pronto',
                cor:'#008000'
            }).then(
                alert('Serviço Pronto'),
                window.location.reload()
            )
        }else{
            alert('Não pode efeturar esse comando')
        }
        
    }
    
    function Voltar(){
        navigate('/perfil')
    }
    const FiltroUser = pedidos.filter((pedidos) => pedidos.email.startsWith(user.email))
    return(
        <div>
            <Header/>
            <Button variant="primary" onClick={Voltar} id="bnt-voltar-perfil">Voltar</Button>

            {pedidos.length === 0 ? (
            <div>
                <span id="text-not">Nenhum pedido Encontrado...</span>
            </div>
            ):(
            <>
                <table className="tabela-perfil">
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
                    {FiltroUser.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <td data-label='Status'>
                                    <button className="badge" onClick={()=>pronto(item)} style={{backgroundColor:item.cor}} >
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
                {loadingMore && <h3 className="buscando">Buscando Pedidos ...</h3>}
                {!loadingMore && !isEmpty && <Button variant="primary" id="bnt-buscar-mais" onClick={buscarMais}>Buscar mais pedidos</Button>}
            </>
            )}
        </div>
    )
}