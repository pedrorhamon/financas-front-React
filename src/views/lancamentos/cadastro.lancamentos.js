import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentoService from "../../app/service/lancamentoService";
import { Button } from "primereact/button";

class CadastroLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }
    render() {

        const tipos = this.service.obterTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title="Cadastro de Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <p></p>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                    <p></p>
                    <div className="col-md-2">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" className="form-control" lista={meses} />
                        </FormGroup>
                    </div>
                </div>
                <p></p>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                    <FormGroup id="inputStatus" label="Status:">
                        <input type="text" className="form-control" disabled />
                    </FormGroup>
                </div>
                </div>
               <br></br>
                <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);