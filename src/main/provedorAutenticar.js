import React from 'react';

import AuthService from '../app/service/authService';

export const AuthContext = React.createContext()
export const AuthConsume =AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticar extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({isAutenticado: true, usuarioAutenticado: usuario})
    }

    encerrar = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({isAutenticado: false, usuarioAutenticado: null})
    }

    render(){
        const context = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrar: this.encerrar
        }

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticar;