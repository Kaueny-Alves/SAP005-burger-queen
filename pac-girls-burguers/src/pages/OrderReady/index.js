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
  Time, 
  Id
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

export const OrderReady = () => {
  const [ready, setReady] = useState([]);

  useEffect(() => {
    async function getOrder() {
      const orders = await api.getOrders();

      const ready = orders.filter(({ status }) => status === "ready");
      setReady(ready);
    }
    getOrder();
  }, []);

  async function putDeliver(orderId) {
    const body = { status: "deliver" };
    const orders = await api.putOrdersId(orderId, body);
    window.location = "/ready";
    console.log(orders);
  }

  return (
    <Container>
      <Header>
        <MenuItem icon="/assets/preparing1.png" link="/preparing" />
        <MenuItem icon="/assets/pending.png" link="/kitchen" />
      </Header>
      <ProductArea>
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
                  <Id>
                      <strong>Pedido:</strong> {item.id}
                    </Id>
                    <ClientName><strong>Cliente:</strong> {item.client_name}</ClientName>
                    <Table><strong>Mesa:</strong> {item.table}</Table>
                   

                    <Waiter><strong>Garçon:</strong> {item.user_id}</Waiter>
                    <Time><strong>Tempo de Preparo:</strong>  {" " + minutes} min </Time>
                    <Status>
                     <strong>Status:</strong>  {item.status.replace("ready", "Pronto")}
                    </Status>
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
                          <Container>
                            {item.Products &&
                              item.Products.map((product, index) => (
                                <ProductItem key={index}>
                                  <ProductName>
                                   <strong>Item:</strong>  {product.name + " "}
                                  </ProductName>
                                  <ProductQuantity>
                                 <strong>Qtd:</strong>    {" " + product.qtd}
                                  </ProductQuantity>
                                </ProductItem>
                              ))}
                          </Container>
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
    </Container>
  );
};
