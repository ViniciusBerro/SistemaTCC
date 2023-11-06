import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

import './header.css'
import { Navbar, Nav, Container, Offcanvas, NavDropdown, Form, Button } from "react-bootstrap"

export default function Header(){
  const {signed} = useContext(AuthContext);

    return( 
      <>
        <div className="">
            {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="mobile bg-body-tertiary mb-3 ">
              <Container fluid>
                <Navbar.Brand href="/">Sistema</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Sistema
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/">Inicio</Nav.Link>
                      {signed ? <Nav.Link href="/perfil">Perfil</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
                      
                      <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
            ))}
        </div>
        
      
      <Navbar bg="primary" data-bs-theme="dark" className="web navbar">
        <Container>
          <Navbar.Brand href="/" className="titulo">Sistema</Navbar.Brand>
            <Nav className=" me-auto " className="justify-content-end">                
              <Nav.Item>
                <Nav.Link href="/">Inicio</Nav.Link>
              </Nav.Item>
              {signed ?
              <Nav.Item>
                <Nav.Link href="/perfil">Perfil</Nav.Link>
              </Nav.Item>
              : 
                <Nav.Item>
                  <Nav.Link href="/Login">Login</Nav.Link>
                </Nav.Item>
              }
              <Nav.Item>
                  <Nav.Link href="/pedidos">Pedidos</Nav.Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar> 
      

        
      </>
    )
    
}