import React from 'react'
import { Route, Switch, HashRouter} from 'react-router-dom'
import Home from '../views/home'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro.lancamentos'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthConsume } from './provedorAutenticar'

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){
    return (
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps}/>
                )
            }else {
                return(
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location}}}/>
                )
            }
        }} />
    )
}

function Rotas(props){ 
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}
export default  () => (
    <AuthConsume>
        {(context) => (<Rotas isUsuarioAutenticado={context.isUsuarioAutenticado}/>)}
    </AuthConsume>
);