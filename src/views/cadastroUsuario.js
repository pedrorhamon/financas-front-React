import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email:'',
        senha:'',
        senhaRepeticao: ''
    }

    cadastra = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label = "Nome: *" htmlFor="inputNome">
                                    <input type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({nome: e.target.value})}/>
                                </FormGroup>
                                <FormGroup  label = "Email: *" htmlFor="inputEmail">
                                <input type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({email: e.target.value})}/>
                                </FormGroup>
                                <FormGroup  label = "Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputpassword"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({senha: e.target.value})}/>
                                </FormGroup>
                                <FormGroup  label = "Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputpassword"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                </FormGroup>
                                <p></p>
                                <button onClick={this.cadastra} type="button" className="btn btn-success">Salvar</button>
                                <button type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                    
                </Card>
            </div>

        )
    }

}

export default CadastroUsuario