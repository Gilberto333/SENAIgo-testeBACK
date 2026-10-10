const listaProdutos = [
  { id: 1, nome: "Caneca SENAI", imagem: "☕", pontos: 15, estoque: 20 },
  { id: 2, nome: "Camisa SENAI", imagem: "👕", pontos: 30, estoque: 15 },
  { id: 3, nome: "Chaveiro Exclusivo", imagem: "🔑", pontos: 10, estoque: 30 },
  { id: 4, nome: "Garrafa Personalizada", imagem: "🧴", pontos: 25, estoque: 20 },
  { id: 5, nome: "Mochila Tech SENAI", imagem: "🎒", pontos: 50, estoque: 10 },
  { id: 6, nome: "Fone Bluetooth", imagem: "🎧", pontos: 80, estoque: 5 }
]
let id = listaProdutos.length + 1

function listarProdutos() {
  return listaProdutos
}

function buscarProdutoPorId(produtoId) {
  return listaProdutos.find(p => p.id === produtoId) || null
}

function cadastrarProduto(dadosProduto) {
  const produto = {
    id: id++,
    nome: dadosProduto.nome,
    imagem: dadosProduto.imagem || "🎁",
    pontos: dadosProduto.pontos,
    estoque: dadosProduto.estoque
  }
  listaProdutos.push(produto)

  return produto
}

function atualizarProduto(produtoId, dadosProduto) {
  const produto = buscarProdutoPorId(produtoId)

  if (!produto) {
    return null
  }

  produto.nome = dadosProduto.nome
  produto.imagem = dadosProduto.imagem || "🎁"
  produto.pontos = dadosProduto.pontos
  produto.estoque = dadosProduto.estoque

  return produto
}

function removerProduto(produtoId) {
  const posicao = listaProdutos.findIndex(p => p.id === produtoId)

  if (posicao === -1) {
    return null
  }

  return listaProdutos.splice(posicao, 1)[0]
}

function baixarEstoque(produtoId) {
  const produto = buscarProdutoPorId(produtoId)

  if (!produto || produto.estoque <= 0) {
    return null
  }

  produto.estoque -= 1

  return produto
}

module.exports = { listarProdutos, buscarProdutoPorId, cadastrarProduto, atualizarProduto, removerProduto, baixarEstoque }
