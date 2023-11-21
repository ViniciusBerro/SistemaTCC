import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";

import './admin.css'

export default function Admin(){
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    async function Sair(){
        await logout();
        navigate('/login');
    }
    function Voltar(){
        navigate('/');
    }
    function pedidos(){
        navigate('/Pedidos-Admin');
    }
    function cidadeAtivaData(){
        navigate('/Cidade-Ativa-admin')
    }
    return(
        <div>
            <button className="bnt-sair" onClick={Sair}>Sair</button>
            <button className="bnt-voltar" onClick={Voltar}>Voltar</button>
            <h1 className="titulo-admin">Modo administrador</h1>
            <h1 className="titulo-menu-admin">Oque deseja fazer?</h1>
            <form className="grid-admin">
                <button onClick={cidadeAtivaData}>Cidade Ativa</button>
                <button onClick={pedidos}>Pedidos solicitados</button>
            </form>
           
        </div>
    )
    
}