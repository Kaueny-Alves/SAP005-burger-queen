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

export const OrderPreparing = () => {
  const [preparing, setPreparing] = useState([]);

  useEffect(() => {
    async function getOrder() {
      const orders = await api.getOrders();

      const preparing = orders.filter(({ status }) => status === "preparing");
      setPreparing(preparing);
    }
    getOrder();
  }, []);

  async function putReady(orderId) {
    const body = { status: "ready" };
    const orders = await api.putOrdersId(orderId, body);
    window.location = "/preparing";
    console.log(orders);
  }

  return (
    <Container>
      <Header>
        <MenuItem icon="/assets/ready1.png" link="/ready" />
        <MenuItem icon="/assets/pending.png" link="/kitchen" />
      </Header>
      <ProductArea>
        <ProductList>
          <Titulo>PEDIDOS EM PREPARO</Titulo>
          {preparing ? (
            preparing.map((item, index) => {
              const created = new Date(item.createdAt).toLocaleString("pt-br");
              const updated = new Date(item.updatedAt).toLocaleString("pt-br");
              return (
                <ContainerProduct key={index}>
                  <ProductInfoArea>
                    <Id>
                      <strong>Pedido:</strong> {item.id}
                    </Id>
                    <ClientName>
                      <strong>Cliente:</strong> {item.client_name}
                    </ClientName>
                    <Table>
                      <strong>Mesa:</strong> {item.table}
                    </Table>

                    <Waiter>
                      <strong>Garçon:</strong> {item.user_id}
                    </Waiter>
                    <div>
                      <strong>Data:</strong> {created}
                    </div>
                    <Status>
                      <strong>Status: </strong>
                      {item.status.replace("preparing", "Preparando")}
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
                                    <strong>Item: </strong> {product.name + " "}
                                  </ProductName>
                                  <ProductQuantity>
                                    <strong>Qtd:</strong> {" " + product.qtd}
                                  </ProductQuantity>
                                </ProductItem>
                              ))}
                          </Container>
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
      </ProductArea>
    </Container>
  );
};
