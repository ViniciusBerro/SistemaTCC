import { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {db, auth} from "../db/Firebase"
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});


function AuthProvider({children}){
    const [user,setUser] = useState(null)

    async function login(email, senha){
        alert('Logado com sucesso')
        await signInWithEmailAndPassword(auth, email, senha)
        .then(()=>{
            
        })
        .catch(()=>{
            alert("Erro ao efetuar o Cadastro")
        })
    }
    async function register(nome, email, senha){
        await createUserWithEmailAndPassword(auth, email, senha)
        .then(async(value)=>{
            let uid = value.user.uid
            await setDoc(doc(db, "Users", uid), {
                emailUser: email,
                nomeUser: nome,
                ruaUser: '',
                bairroUser: '',
                numeroUser: '',
                compleUser: '',
            })
            let data = {
                uid: uid,
                nome: nome,
                email: email,

            }
            setUser(data)
            infoUser(data)
            
            
            
        }).then(()=>{})
        .catch((error)=>{
            alert("Erro ao efetuar o Cadastro: "+error)
        })
    }

    function infoUser(data){
        localStorage.setItem('@infoUser', JSON.stringify(data))
    }
    
    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            login,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider