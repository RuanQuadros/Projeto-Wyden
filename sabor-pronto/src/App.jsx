import { useState, useEffect } from "react";

function App() {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("vendas"));
    if (dados) {
      setVendas(dados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vendas", JSON.stringify(vendas));
  }, [vendas]);

  function adicionarVenda(e) {
    e.preventDefault();

    const novaVenda = {
      id: Date.now(),
      produto,
      quantidade: Number(quantidade),
      valor: Number(valor),
      data: new Date().toLocaleDateString(),
    };

    setVendas([...vendas, novaVenda]);

    setProduto("");
    setQuantidade("");
    setValor("");
  }

  const totalDia = vendas.reduce(
    (acc, venda) => acc + venda.quantidade * venda.valor,
    0
  );

  return (
    <div className="container">
      <h2>Sabor & Ponto - Controle de Vendas</h2>

      <form onSubmit={adicionarVenda}>
        <input
          type="text"
          placeholder="Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Valor Unitário"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <button type="submit">Registrar Venda</button>
      </form>

      <h3 className="total">Total do Dia: R$ {totalDia.toFixed(2)}</h3>

      {vendas.map((venda) => (
        <div key={venda.id} className="card">
          <strong>{venda.produto}</strong>
          <p>Qtd: {venda.quantidade}</p>
          <p>Valor: R$ {venda.valor.toFixed(2)}</p>
          <p>Total: R$ {(venda.quantidade * venda.valor).toFixed(2)}</p>
          <small>{venda.data}</small>
        </div>
      ))}
    </div>
  );
}

export default App;