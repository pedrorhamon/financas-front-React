import ErroValidacao from "../exceptions/ErroValidacao";
import ApiService from "./apiservice";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validar(usuario){
        const erros = []
        if(!usuario.nome){
            erros.push('Campo nome é obrigatório. ')
        }
        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if (!usuario.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um Email válido. ')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')
        }else if (usuario.senha !== usuario.senhaRepeticao){
            erros.push('A senha não batem figura.')
        }
        if(erros && erros.length >0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;