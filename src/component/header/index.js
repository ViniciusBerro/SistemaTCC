import { Link } from "react-router-dom"

import { getAuth, onAuthStateChanged } from "firebase/auth"

import './header.css'
import { Navbar, Nav, Container } from "react-bootstrap"

export default function Header(){
    return(            
        <Navbar bg="primary" data-bs-theme="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home" >Sistema</Navbar.Brand>
          <Nav className="me-auto " className='justify-content-end'>
          <Nav.Item>
                <Nav.Link href="/">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/Login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/perfil">Perfil</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar> 
    )
    
}