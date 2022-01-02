import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from '../../app/service/localstorageService';
import * as mensagens from "../../components/toastr";

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentos: [],
        lancamentoDeletar:{}
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano){
            mensagens.mensagemErro('O preenchimento do campo obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }
        this.service.consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({ lancamentos: resposta.data })
            }).catch(erro => {
                console.log(erro);
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }
    
    abrirConfirmacao = (Lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: Lancamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then(respnse => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1);
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            mensagens.mensagemSucesso("Lancamento deletado com sucesso!")
        }).catch (erro => {
            mensagens.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento")
        })
    }

    preparaFormulario = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento
                    this.setState({lancamento});
                }
                mensagens.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render() {
        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterTipos();

        const confirmDialogFoote = (
            <div>
                <Button label='Confirmar' icon="pi pi-check" onClick={this.deletar}/>
                <Button label='Cancelar' icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        )

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                                <p></p>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mes: ">
                                <SelectMenu id="inputMes" value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })} className='form-control' lista={meses} />
                            </FormGroup>
                            <p></p>

                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Descrição " />
                                <p></p>
                            </FormGroup>
                                <p></p>
                                <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({ tipo: e.target.value })}
                                            className="form-control" 
                                            lista={tipos} />
                            </FormGroup>
                            <p></p>

                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={e => this.props.history.push('/cadastro-lancamentos')}
                            type="button" 
                            className="btn btn-danger">
                                Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                             deletar={this.abrirConfirmacao}
                                             editar={this.editar}
                                             alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header='Confirmação para Exclusão'
                    visible={this.state.showConfirmDialog}
                    style={{width: '50vw'}}
                    modal={true}
                    footer={confirmDialogFoote}
                    onHide={() => this.setState({visible: false})}>
                        Confirma a exclusão do Lançamento?

                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);