import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Perfil from '../pages/Perfil';
import Work from '../pages/work';
import EditPerfil from '../pages/EditPerfil';
import Admin from '../pages/Admin';

export default function Rotas(){
    const {user} = useContext(AuthContext)
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registro' element={<Register/>}/>
                <Route path='/perfil' element={user && user.email === 'admin@admin.com'? <Admin/>:<Perfil/>}/>
                <Route path='/Editar-Perfil' element={<EditPerfil/>}/>
                <Route path='/pedidos' element={<Work/>}/>
            </Routes>
        </BrowserRouter>
    );
}