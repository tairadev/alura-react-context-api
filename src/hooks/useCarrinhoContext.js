import { useContext } from 'react';
import { CarrinhoContext } from '@/context/CarrinhoContext';

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  const mudarQuantidade = (id, quantidade) => {
    carrinho.map((produto) => {
      if (produto.id === id) {
        produto.quantidade += quantidade;
      }
      return produto;
    });
  };

  const adicionarProduto = (novoProduto) => {
    const temProduto = carrinho.some(
      (produto) => produto.id === novoProduto.id
    );

    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho([...carrinho, novoProduto]);
    }

    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id) {
          return {
            ...itemDoCarrinho,
            quantidade: itemDoCarrinho.quantidade + 1,
          };
        }
        return itemDoCarrinho;
      })
    );
  };

  const removerProduto = (id) => {
    const produto = carrinho.find((produto) => produto.id === id);
    const ultimoItem = produto.quantidade === 1;
    if (ultimoItem) {
      setCarrinho(carrinho.filter((produto) => produto.id !== id));
    } else {
      setCarrinho(
        carrinho.map((produto) => {
          if (produto.id === id) {
            return {
              ...produto,
              quantidade: produto.quantidade - 1,
            };
          }
          return produto;
        })
      );
    }
  };

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  };
};
