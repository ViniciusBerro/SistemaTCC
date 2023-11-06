import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Perfil from '../pages/Perfil';
import Work from '../pages/work';


export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registro' element={<Register/>}/>
                <Route path='/perfil' element={<Perfil/>}/>
                <Route path='/pedidos' element={<Work/>}/>
            </Routes>
        </BrowserRouter>
    );
}