import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentoService from "../../app/service/lancamentoService";
import { Button } from "primereact/button";
import * as messages from '../../components/toastr';

import LocalStorageService from "../../app/service/localstorageService";

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano:'',
        tipo:'',
        status: '',
        usuario: null
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, valor, mes, ano, tipo} = this.state;
        const lancamento = {
           descricao,
           valor,
           mes,
           ano, 
           tipo, 
           usuario: usuarioLogado.id
        }
           this.service.salvar(lancamento)
           .then(response => {
               this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento Cadastrado com sucesso!')
           }).catch(erro =>{
               messages.mensagemErro(erro.response.data)
           })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, id, status, usuario} = this.state;
       const lancamento = {
           descricao,
           valor,
           mes,
           ano, 
           tipo, 
           id,
           status,
           usuario
        }
           this.service.atualizar(lancamento)
           .then(response => {
               this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento Alterado com sucesso!')
           }).catch(erro =>{
               messages.mensagemErro(erro.response.data)
           })
    }

    componentDidMount(){
        const params =  this.props.match.params;
        if(params.id){
            this.service.obterPorId(params.id)
            .then(response => {
                this.setState({...response.data})
            })
            .catch(erro => {
                messages.mensagemErro(erro.response.data)
            });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }
    render() {

        const tipos = this.service.obterTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title="Cadastro de Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                            type="text"
                             className="form-control" 
                             name="descricao"
                             value={this.state.descricao}
                             onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <p></p>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                            type="text" 
                            name="ano"
                            className="form-control"
                            value={this.state.ano}
                             onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <p></p>
                    <div className="col-md-2">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                            name="mes"
                             className="form-control"
                              lista={meses} 
                              value={this.state.mes}
                             onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <p></p>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                            type="text" 
                            name="valor"
                            className="form-control" 
                            value={this.state.valor}
                             onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                            className="form-control" 
                            name="tipo"
                            lista={tipos} 
                            value={this.state.tipo}
                             onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                    <FormGroup id="inputStatus" label="Status:">
                        <input type="text"
                         className="form-control" 
                         name="status"
                         disabled 
                         value={this.state.status}/>
                    </FormGroup>
                </div>
                </div>
               <br></br>
                <div className="row">
                <div className="col-md-6">
                    <button 
                        onClick={this.atualizar} 
                        className="btn btn-success">
                            Alterar</button>
                    <button 
                        onClick={e => this.props.history.push('/consulta-lancamentos')}
                        className="btn btn-danger">
                            Cancelar</button>
                </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);