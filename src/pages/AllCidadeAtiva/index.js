import Header from "../../component/header";
import { Link } from "react-router-dom"
import { db } from "../../db/Firebase"
import { addDoc, doc, collection, getDocs, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"

import './AllCidadeAtiva.css'

const listRef = collection(db, 'CidadeAtiva')
export default function AllCidadeAtiva(){
    
    const [cidadeAtiva, setCidadeAtiva] = useState([])
    const [buscaBairro, setBuscaBairro] = useState('')
    const [empty, setEmpty] = useState(false)

    useEffect(()=>{
        async function loadCidadeAtiva(){
            const q = query(listRef);
            setCidadeAtiva([])
            const querySnapshot = await getDocs(q)
            await Lista(querySnapshot)
        }
        loadCidadeAtiva()
    },[])
    async function Lista(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
        if(!isCollectionEmpty){
            let lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    bairro: doc.data().bairro,
                    dataInicio: doc.data().diaInicio,
                    dataFinal: doc.data().diaFinal,
                    cor: doc.data().cor
                })
            })
            setCidadeAtiva(lista)
        }
        setEmpty(true)
    }
    const buscaFiltro = cidadeAtiva.filter((busca)=>{
        return busca.bairro.startsWith(buscaBairro)
    })
    return(
        <>
        <Header/>
        <h1 className="titulo-cidade-ativa">Calendario da Cidade Ativa</h1>
        <p className="busca-all-cidade-ativa">Buscar bairro: <input type="text" onChange={(e)=>{setBuscaBairro(e.target.value)}}/></p>
        <div className="card-total">
                {cidadeAtiva.length === 0 ? (
                    <span>Nada encontrado</span>
                ):(
                    <div>
                        {buscaFiltro.map((item,index)=>{
                            return(
                                <Card key={index} id="card-info-cidade -ativa">
                                    <Card.Body className="card-cidade-ativa">
                                        <Card.Title>{item.bairro}</Card.Title>
                                        <Card.Text>
                                            <p>Data de Inicio: {item.dataInicio}</p>
                                            <p>Datafinal: {item.dataFinal}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}