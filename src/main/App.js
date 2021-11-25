import React from 'react';

import Rotas from './rotas';
import CadastroUsuario from '../views/cadastroUsuario';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'


class App extends React.Component {
  render() {
    return (
      <div>
        <Rotas/>
      </div>
    )
  }
}

export default App