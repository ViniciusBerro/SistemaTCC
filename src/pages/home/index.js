import { Link } from "react-router-dom"
import Header from "../../component/header"

export default function Home(){
    return(
        <div>
            <Header titulo="Home"/>
            <h1>Pagina Home</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}