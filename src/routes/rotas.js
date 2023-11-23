import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Perfil from '../pages/Perfil';
import Work from '../pages/work';
import EditPerfil from '../pages/EditPerfil';
import WorkPerfil from '../pages/WorkPerfil';
import WorkAdmin from '../pages/WorkAdmin';
import Admin from '../pages/Admin';
import CidadeAtiva from '../pages/CidadeAtiva';
import AllCidadeAtiva from '../pages/AllCidadeAtiva';

export default function Rotas(){
    const {user,signed} = useContext(AuthContext)
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registro' element={<Register/>}/>
                <Route path='/perfil' element={signed && user.email === 'admin@admin.com'? <Admin/>:<Perfil/>}/>
                <Route path='/Editar-Perfil' element={signed ? <EditPerfil/>:<Home/>}/>
                <Route path='/Meus-Pedidos' element={signed?<WorkPerfil/>:<Home/>}/>
                <Route path='/pedidos' element={<Work/>}/>
                <Route path='/Pedidos-Admin' element={signed && user.email === 'admin@admin.com'? <WorkAdmin/>:<Home/>}/>
                <Route path='/Cidade-Ativa-admin' element={signed && user.email === 'admin@admin.com'?<CidadeAtiva/>:<Home/>}/>
                <Route path='/info-cidade-ativa' element={<AllCidadeAtiva/>}/>
            </Routes>
        </BrowserRouter>
    );
}