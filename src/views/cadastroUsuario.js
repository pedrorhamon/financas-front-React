import React from 'react'
import { withRouter } from 'react-router-dom' 

import Card from '../components/card'
import FormGroup from '../components/form-group'
import {mensagemErro, mensagemSucesso} from '../components/toastr';

import UsuarioService from '../app/service/usuarioService'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastra = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const {nome, email, senha, senhaRepeticao} = this.state;
        const usuario = {
            nome,
            email,
            senha,
            senhaRepeticao
        }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagem;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
            this.props.history.push("/login")
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputpassword"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputpassword"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <p></p>
                            <button onClick={this.cadastra} type="button" className="btn btn-success" >Salvar
                            <i className="pi pi-save"></i></button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar
                            <i className="pi pi-times"></i></button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter (CadastroUsuario)