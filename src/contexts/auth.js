import { useState, useEffect, createContext } from "react";


import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {db, auth} from "../db/Firebase"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});


function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const[loading,setLoading] = useState(true)

    useEffect(()=>{
        async function loadUser(){
            const storageUser = localStorage.getItem('@infoUser')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }

            setLoading(false);
        }
        loadUser();
    },[])

    async function login(email, senha){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, senha)
        .then(async(value)=>{
            let uid = value.user.uid;

            const docRef = doc(db, 'Users', uid);
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nomeUser,
                email: docSnap.data().emailUser,
                rua: docSnap.data().ruaUser,
                bairro: docSnap.data().ruaUser,
                numero: docSnap.data().numeroUser,
                comple: docSnap.data().compleUser

            }
            setUser(data)
            infoUser(data)
            setLoadingAuth(false)
            alert('Logado com sucesso')
            
        })
        .catch((error)=>{
            alert("Erro ao Logar:"+error)
        })
    }
    async function register(nome, email, senha){
        setLoadingAuth(true)
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
                email: value.user.email,
                rua: '',
                bairro: '',
                numero: '',
                comple: ''

            }
            setUser(data)
            infoUser(data)
            setLoadingAuth(false);
            
            
            
        }).then(()=>{})
        .catch((error)=>{
            alert("Erro ao efetuar o Cadastro: "+error)
        })
    }

    function infoUser(data){
        localStorage.setItem('@infoUser', JSON.stringify(data))
    }
    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@infoUser');
        setUser(null);
    }
    return(
        <AuthContext.Provider 
        value={{
            signed: !user,
            user,
            login,
            register,
            logout,
            infoUser,
            setUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider