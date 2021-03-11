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
  TotalPrice,
} from "./styled";
import { Modal } from "@material-ui/core";

export default function Order({ client, table }) {
  const productsItem = useSelector((state) => state.order.products);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsItem);
  }, [productsItem]);
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
        products: products.map((item) => ({
          id: Number(item.id),
          qtd: item.qt,
        })),
      };
      const data = await api.postOrders(body);
      console.log(data);
      alert("pedido enviado para cozinha")

      window.location.href = "/hall";

      return data;
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      setShow(false);
    }
  }, [products.length]);

  return (
    <OrderArea>
      <OrderHeader onClick={handleOrderClick}>
        <OrderIcon src="/assets/edit.png" />
        <OrderText>Comanda ({products.length})</OrderText>
        {show && <OrderIcon src="/assets/down.png" />}
      </OrderHeader>
      <OrderBody show={show}>
        <ProductsArea>
          {products.map((item, index) => (
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
          {products
            .reduce(
              (accumulator, currentValue) =>
                accumulator +
                Number(currentValue.price) * Number(currentValue.qt),
              0
            )
            .toFixed(2)}
        </TotalPrice>

        {products.length > 0 ? (
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
