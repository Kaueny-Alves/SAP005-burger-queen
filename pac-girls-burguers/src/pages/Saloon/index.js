import React, { useEffect, useState } from "react";
import {
  Container,
  Select,
  Option,
  ProductArea,
  ProductList,
  Input,
  Label,
  ContainerInput,
} from "./styled";
import { api } from "../../api";

import Header from "../../components/Header";
import ProductItem from "../../components/ProductItem";
import Modal from "../../components/Modal";
import ModalProduct from "../../components/ModalProduct";
import Order from "../../components/Order";
import Loading from "../../components/Loading";
import MenuItem from "../../components/MenuItem";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { ProducSend } from "../../components/Order/styled";
import { useSelector } from "react-redux";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 10,
    top: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "10px",
  },
}))(Badge);

export default function Saloon(props) {
  const productsItem = useSelector((state) => state.order.products);
  const [productsList, setProductsList] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState({});
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [menu, setMenu] = useState([]);
  const [options, setOptions] = useState("breakfast");
  const [products, setProducts] = useState([]);

  const breakfast =
    productsList.length > 0 &&
    productsList.filter(({ type }) => type === "breakfast");
  const lunch =
    productsList.length > 0 &&
    productsList.filter(({ sub_type }) => sub_type === "hamburguer");
  const drinks =
    productsList.length > 0 &&
    productsList.filter(({ sub_type }) => sub_type === "drinks");
  const side =
    productsList.length > 0 &&
    productsList.filter(({ sub_type }) => sub_type === "side");

  function renderProducts(options) {
    switch (options) {
      case "breakfast":
        return breakfast ? (
          breakfast.map((item, index) => (
            <ProductItem key={index} data={item} onClick={handleProductClick} />
          ))
        ) : (
          <Loading />
        );
      case "lunch":
        return lunch.map((item, index) => (
          <ProductItem key={index} data={item} onClick={handleProductClick} />
        ));
      case "drinks":
        return drinks.map((item, index) => (
          <ProductItem key={index} data={item} onClick={handleProductClick} />
        ));
      case "side":
        return side.map((item, index) => (
          <ProductItem key={index} data={item} onClick={handleProductClick} />
        ));
      default:
        return "breakfast";
    }
  }

  useEffect(() => {
    async function readyOrders() {
      const data = await api.getOrders();
      setProducts(
        data ? (
          data.filter(({ status }) => status === "deliver")
        ) : (
          <div>carregando...</div>
        )
      );
    }
    readyOrders();
  }, []);

  useEffect(() => {
    const products = async () => {
      const prodItens = await api.getProducts();
      setProductsList(prodItens);
    };

    products();
  }, []);

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

      window.location.href = "/hall";

      return data;
    }
  };

  const handleProductClick = (data) => {
    setModalData(data);
    setModalStatus(true);
    setMenu(menu);
  };

  const onChangeClient = ({ target }) => {
    setClient(target.value);
  };
  const onChangeTable = ({ target }) => {
    setTable(target.value);
  };

  return (
    <Container>
      <Header>
        <IconButton aria-label="waiter">
          <StyledBadge badgeContent={products.length} color="secondary">
            <MenuItem icon="/assets/waiter.png" link="/orders" />
          </StyledBadge>
        </IconButton>
      </Header>

      <Label>Categorias:</Label>
      <Select
        value={options}
        onChange={(e) => {
          setOptions(e.target.value);
          console.log(e.target.value);
        }}
      >
        <Option value={"breakfast"}>Café da Manhã</Option>
        <Option value={"lunch"}>Lanches</Option>
        <Option value={"side"}>Acompanhamentos</Option>
        <Option value={"drinks"}>Bebidas</Option>
      </Select>
      <ContainerInput>
        <Label>Cliente:</Label>
        <Input
          type="text"
          placeholder="PacBurguer"
          onChange={onChangeClient}
          value={client}
        />
        <Label>Mesa:</Label>
        <Input
          type="number"
          placeholder="09"
          onChange={onChangeTable}
          value={table}
        />
        <ProducSend
          onClick={() => {
            sendOrder();
          }}
        >
          Enviar Pedido
        </ProducSend>
      </ContainerInput>

      <ProductArea>
        <ProductList>
          {productsList.length > 0 ? renderProducts(options) : <Loading />}
        </ProductList>
      </ProductArea>

      <Modal status={modalStatus} setStatus={setModalStatus}>
        <ModalProduct data={modalData} setStatus={setModalStatus} />
      </Modal>

      <Order client={client} table={table} />
    </Container>
  );
}
