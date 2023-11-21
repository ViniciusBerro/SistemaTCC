import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import { useState } from "react";
import { db } from "../../db/Firebase";
import { addDoc, doc,collection,getDocs,query,updateDoc,deleteField, FieldValue, Firestore, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";

const listRef = collection(db,'CidadeAtiva')
export default function CidadeAtiva(){
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const [empty, setEmpty] = useState(false)
    const [cidadeAtiva, setCidadeAtiva]=useState([])
    const [bairro, setBairro] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFinal, setDataFinal] = useState('')

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
        }else{
            setEmpty(true)
        }
        
    }
    async function cadastrarCidadeAtiva(e){
        if(bairro !== '' && dataInicio !== '' && dataFinal !== ''){
            await addDoc(collection(db, 'CidadeAtiva'),{
                diaInicio: dataInicio,
                diaFinal: dataFinal,
                bairro: bairro,
                cor: '#00000',
            })
            .then(()=>{
                alert('Dia cadastrado');
                window.location.reload();
            })
            .catch((error)=>{
                alert(error)
            })
        }
    }
    
    async function Sair(){
        await logout();
        navigate('/login');
    }
    function Voltar(){
        navigate('/perfil');
    }
    async function deletar(item){
        const docRef = doc(db, 'CidadeAtiva', item.id)
        await deleteDoc(docRef,{
            diaInicio: deleteField(),
            diaFinal: deleteField(),
            bairro: deleteField(),
            cor: deleteField()
        })
        .then(()=>{
            alert('Excluido do dia da cidade Ativa');
            window.location.reload();

        })
        .catch((error)=>{
            alert(error)
        })
    };
    return(
        <div>
            <button className="bnt-sair" onClick={Sair}>Sair</button>
            <button className="bnt-voltar" onClick={Voltar}>Voltar</button>
            <h1 className="titulo-admin">Modo administrador</h1>
            <h1>Admin</h1>
            <form>
                <p>Bairro:</p>
                <input type="text" placeholder="Bairro" onChange={(e)=>{setBairro(e.target.value)}}/>
                <p>Data de Inicio:</p>
                <input type="date" onChange={(e)=>{setDataInicio(e.target.value)}}/>
                <p>Data de Final:</p>
                <input type="date" onChange={(e)=>{setDataFinal(e.target.value)}}/>
            </form>
            <button onClick={cadastrarCidadeAtiva}>Cadastrar</button>
            <div>
                
                    {cidadeAtiva.length === 0 ?(
                        <div>
                            <span>Nada Cadastrado...</span>
                        </div>
                    ):(
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Bairro</th>
                                        <th>Dia de Inicio</th>
                                        <th>Ultimo dia</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {cidadeAtiva.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{item.bairro}</td>
                                                <td>{item.dataInicio}</td>
                                                <td>{item.dataFinal}</td>
                                                <td><button onClick={()=>deletar(item)}>Deletar</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            
                            </table>
                        </>
                    )}
                
            </div>
        </div>
    )
}