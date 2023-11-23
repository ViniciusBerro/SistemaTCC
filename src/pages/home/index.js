import { useNavigate } from "react-router-dom"
import Header from "../../component/header"
import { Button } from "react-bootstrap"
import './home.css'

export default function Home(){
    const navigate = useNavigate()
    function cidadeAtiva(){
        navigate('/Info-cidade-ativa')
    }
    function login(){
        navigate('/login')
    }
    function pedidos(){
        navigate('/pedidos')
    }
    return(
        <div className="corpo-info">
            <Header titulo="Home"/>
            <div className="info-aplicativo">
            
            <div className="info-aplicativo-1">
                <div className="img">
                    <img src="https://letteris.com.br/wp-content/uploads/2021/10/santiago.jpeg"/>
                </div>
                <div className="txt">
                    <p>
                        Quais a vantagem de fazer o login?
                    </p>
                    <p> 
                        Aqui seus dados serão armazenados e utilizados para melhorar a experiência nos momento de solicitar os pedidos, 
                        seus dados básicos já seriam o suficiente para preencher os campos.
                    </p>
                    <p>
                        Também consegue monitorar onde seu pedido está e se foi encaminhado para o encarregado, 
                        quando finalizado realizar o fechamento do pedido informando a prefeitura que já foi finalizado.
                        Quer se registrar? Clique no botão.
                        
                    </p>
                    <Button id="bnt-home-login" onClick={login}>Faça login</Button>
                </div>
                
            </div>
            <div className="info-aplicativo-2">
                <div className="img">
                    <img src="https://4.bp.blogspot.com/_duXYN311HPU/RtGd8sBq6-I/AAAAAAAAAF8/KD5XWasahMY/w1200-h630-p-k-no-nu/calcadao.JPG"/>
                </div>
                <div className="txt">
                    <p> 
                        Santiago terra dos poetas fica feliz em informar sobre o sistema de manutenção urbana para a cidade, 
                        visando o maior bem-estar de cada habitante da nossa amada terra.
                    </p>
                    <p>
                        Aqui no sistema poderá solicitar pedidos de manutenção sem precisar pegar filas ou de telefone, 
                        solicite facilmente.
                    </p>
                    <p>
                        Caso queira registrar, as informações ficarão salvas para sempre que precisar, 
                        não necessitando de preencher campos de texto toda vez.
                        uer fazer pedido de manutenção? Clique no botão abaixo.
                        
                    </p>
                    <Button id="bnt-home-pedidos" onClick={pedidos}>Realizar pedido de manutenção</Button>
                </div>
                
                
            </div>
            <div className="info-aplicativo-1">
                <div className="img">
                    <img src="https://terradospoetas.com/wp-content/uploads/2018/07/cidade-ativa-santiago.jpg"/>
                </div>
                <div className="txt">
                    <p>
                        O Programa Cidade Ativa tem o objetivo de deixar nossas ruas mais bonitas, 
                        através desse serviços que por mês atendem um bairro com o objetivo de recolher entulhos, capinação, 
                        limpeza são alguns dos serviços exercidos neste projeto.
                    </p>
                    <p>
                        Caso queira ver sobre o Projeto no botão.
                        
                    </p>
                    <Button id="bnt-home-cidadeAtiva-2" onClick={cidadeAtiva}>Ver calendario do Programa Cidade Ativa</Button>
                </div>
            </div>
            
            </div>
            
        </div>

    )
}