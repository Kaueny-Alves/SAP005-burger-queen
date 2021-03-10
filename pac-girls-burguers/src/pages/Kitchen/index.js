import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Container,
  ProductArea,
  ProductList,
  Titulo,
  ContainerProduct,
  ProductInfoArea,
  ProductName,
  ProductType,
  ProductItem,
  ClientName,
  ProductQuantity,
  Table,
  Status,
  Waiter,
  ButtonToDo,
} from "./styled";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "../../components/MenuItem";
import ReactTooltip from "react-tooltip";

export default function Kitchen() {
  const [pending, setPending] = useState([]);
  const [preparing, setPreparing] = useState([]);
  const [ready, setReady] = useState([]);

  useEffect(() => {
    async function getOrder() {
      const orders = await api.getOrders();
      const pending = orders.filter(({ status }) => status === "pending");
      setPending(pending);
      const preparing = orders.filter(({ status }) => status === "preparing");
      setPreparing(preparing);
      const ready = orders.filter(({ status }) => status === "ready");
      setReady(ready);
    }
    getOrder();
  }, []);

  async function putPreparing(orderId) {
    const body = { status: "preparing" };
    const orders = await api.putOrdersId(orderId, body);
    window.location = "/kitchen";
    console.log(orders);
  }
  async function putReady(orderId) {
    const body = { status: "ready" };
    const orders = await api.putOrdersId(orderId, body);
    window.location = "/kitchen";
    console.log(orders);
  }
  async function putDeliver(orderId) {
    const body = { status: "deliver" };
    const orders = await api.putOrdersId(orderId, body);
    window.location = "/kitchen";
    console.log(orders);
  }

  return (
    <Container>
      <Header>
        <MenuItem icon="/assets/preparing1.png" link="/preparing" />
        <MenuItem icon="/assets/ready1.png" link="/ready" />
      </Header>
      <ProductArea>
        <ProductList>
          <Titulo> PEDIDOS PENDENTES</Titulo>
          {pending ? (
            pending.map((item, index) => {
              const created = new Date(item.createdAt).toLocaleString("pt-br");
              return (
                <ContainerProduct key={index}>
                  <ProductInfoArea>
                    <ClientName>Cliente: {item.client_name}</ClientName>
                    <Table>Mesa: {item.table}</Table>
                    <Status>
                      Status: {item.status.replace("pending", "Pendente")}
                    </Status>

                    <Waiter>Garçon: {item.user_id}</Waiter>
                    <div>Criado: {created}</div>
                    <ProductType>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography> Pedidos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.Products &&
                            item.Products.map((product, index) => (
                              <ProductItem key={index}>
                                <ProductName>
                                  Item: {product.name + " "}
                                </ProductName>
                                <ProductQuantity>
                                  Qtd: {" " + product.qtd}
                                </ProductQuantity>
                              </ProductItem>
                            ))}
                        </AccordionDetails>
                      </Accordion>

                      <ButtonToDo
                        onClick={(e) => {
                          e.preventDefault();
                          putPreparing(item.id);
                        }}
                      >
                        Preparar Pedido
                      </ButtonToDo>
                    </ProductType>
                  </ProductInfoArea>
                </ContainerProduct>
              );
            })
          ) : (
            <Loading />
          )}
        </ProductList>
        <ProductList>
          <Titulo>PEDIDOS EM PREPARO</Titulo>
          {preparing ? (
            preparing.map((item, index) => {
              const created = new Date(item.createdAt).toLocaleString("pt-br");
              const updated = new Date(item.updatedAt).toLocaleString("pt-br");
              return (
                <ContainerProduct key={index}>
                  <ProductInfoArea>
                    <ClientName>Cliente: {item.client_name}</ClientName>
                    <Table>Mesa: {item.table}</Table>
                    <Status>
                      Status: {item.status.replace("preparing", "Preparando")}
                    </Status>

                    <Waiter>Garçon: {item.user_id}</Waiter>
                    <div>Criado: {created}</div>
                    <div>Atualizado: {updated}</div>
                    <ProductType>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography> Pedidos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.Products &&
                            item.Products.map((product, index) => (
                              <ProductItem key={index}>
                                <ProductName>
                                  Item: {product.name + " "}
                                </ProductName>
                                <ProductQuantity>
                                  Qtd: {" " + product.qtd}
                                </ProductQuantity>
                              </ProductItem>
                            ))}
                        </AccordionDetails>
                      </Accordion>

                      <ButtonToDo
                        onClick={(e) => {
                          e.preventDefault();
                          putReady(item.id);
                        }}
                        ready={false}
                      >
                        Pedidos Pronto
                      </ButtonToDo>
                    </ProductType>
                  </ProductInfoArea>
                </ContainerProduct>
              );
            })
          ) : (
            <Loading />
          )}
        </ProductList>
        <ProductList>
          <Titulo>PEDIDOS PRONTOS</Titulo>
          {ready ? (
            ready.map((item, index) => {
              const dataUpdated = new Date(item.updatedAt);
              const dataCreated = new Date(item.createdAt);
              const difference = Math.abs(dataUpdated) - dataCreated;
              const minutes = Math.floor(difference / 1000 / 60);
              return (
                <ContainerProduct key={index}>
                  <ProductInfoArea>
                    <ClientName>Cliente: {item.client_name}</ClientName>
                    <Table>Mesa: {item.table}</Table>
                    <Status>
                      Status: {item.status.replace("ready", "Pronto")}
                    </Status>

                    <Waiter>Garçon: {item.user_id}</Waiter>
                    <div> Tempo de Preparo: {" " + minutes} min </div>
                    <ProductType>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography> Pedidos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.Products &&
                            item.Products.map((product, index) => (
                              <ProductItem key={index}>
                                <ProductName>
                                  Item: {product.name + " "}
                                </ProductName>
                                <ProductQuantity>
                                  Qtd: {" " + product.qtd}
                                </ProductQuantity>
                              </ProductItem>
                            ))}
                        </AccordionDetails>
                      </Accordion>

                      <ButtonToDo
                        onClick={(e) => {
                          e.preventDefault();
                          putDeliver(item.id);
                        }}
                        ready={true}
                      >
                        Avisar o Garçon
                      </ButtonToDo>
                    </ProductType>
                  </ProductInfoArea>
                </ContainerProduct>
              );
            })
          ) : (
            <Loading />
          )}
        </ProductList>
      </ProductArea>
      <ReactTooltip id="tip-top" place="top" effect="solid" />
    </Container>
  );
}
