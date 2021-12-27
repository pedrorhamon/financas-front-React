import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentoService from "../../app/service/lancamentoService";
import { Button } from "primereact/button";

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano:'',
        tipo:'',
        status: ''
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        console.log(this.state);
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
                    <button onClick={this.submit} className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);