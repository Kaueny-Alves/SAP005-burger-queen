import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";

import {
  OrderArea,
  OrderHeader,
  OrderBody,
  OrderIcon,
  OrderText,
  ProductsArea,
  ProductItem,
  ProductPhoto,
  ProductInfoArea,
  ProductName,
  ProductPrice,
  ProductQuantityArea,
  ProductQtIcon,
  ProductQtText,
  ProducSend,
  TotalPrice
} from "./styled";

export default function Order({ client, table }) {
  const history = useHistory();
  const productsItem = useSelector((state) => state.order.products);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {}, [productsItem]);
  const handleOrderClick = () => {
    setShow(!show);
  };

  const handleProductChange = (key, type) => {
    dispatch({
      type: "CHANGE_PRODUCT",
      payload: { key, type },
    });
  };

  const sendOrder = async () => {
    if (client === "" || table === "") {
      alert("preencha o nome do cliente e a mesa");
    } else {
      const body = {
        client,
        table,
        products: productsItem.map((item) => ({
          id: Number(item.id),
          qtd: item.qt,
        })),
      };
      const data = await api.postOrders(body);
      console.log(data);
      alert("pedido enviado para cozinha");

      history.push("/hall");

      return data;
    }
  };

  useEffect(() => {
    if (productsItem.length === 0) {
      setShow(false);
    }
  }, [productsItem.length]);

  return (
    <OrderArea>
      <OrderHeader onClick={handleOrderClick}>
        <OrderIcon src="/assets/edit.png" />
        <OrderText>Comanda ({productsItem.length})</OrderText>
        {show && <OrderIcon src="/assets/down.png" />}
      </OrderHeader>
      <OrderBody show={show}>
        <ProductsArea>
          {productsItem.map((item, index) => (
            <ProductItem key={index}>
              <ProductPhoto src={item.image}></ProductPhoto>
              <ProductInfoArea>
                <ProductName>{item.name}</ProductName>
                <ProductPrice>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}{" "}
                  |
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price * item.qt)}
                </ProductPrice>
              </ProductInfoArea>
              <ProductQuantityArea>
                <ProductQtIcon
                  onClick={() => {
                    handleProductChange(index, "-");
                  }}
                  src="/assets/minus.png"
                />
                <ProductQtText>{item.qt}</ProductQtText>
                <ProductQtIcon
                  onClick={() => {
                    handleProductChange(index, "+");
                  }}
                  src="/assets/plus.png"
                />
              </ProductQuantityArea>
            </ProductItem>
          ))}
        </ProductsArea>
        <TotalPrice>
          Total: R$
          {productsItem
            .reduce(
              (accumulator, currentValue) =>
                accumulator +
                Number(currentValue.price) * Number(currentValue.qt),
              0
            )
            .toFixed(2)}
        </TotalPrice>

        {productsItem.length > 0 ? (
          <ProducSend
            onClick={() => {
              sendOrder();
            }}
          >
            Enviar Pedido
          </ProducSend>
        ) : (
          <></>
        )}
      </OrderBody>
    </OrderArea>
  );
}
