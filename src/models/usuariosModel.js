const listaUsuarios = []
let id = 1

function cadastrarUsuario(dadosUsuario){
const usuario = {
    id: id ++,
cpf: dadosUsuario.cpf,
nome: dadosUsuario.nome,
email: dadosUsuario.email,
senha: dadosUsuario.senha
}
listaUsuarios.push(usuario)

return usuario

}

function login (email, senha){
    const logarUsuario = listaUsuarios.find(u => u.email === email &&  u.senha === senha)
    
    if(!logarUsuario){
        return null
    }

return logarUsuario
}

function buscarPorCPF(cpf) {
    return listaUsuarios.find(usuario => usuario.cpf === cpf);
}


module.exports = {cadastrarUsuario, login, buscarPorCPF}
