import React, { useEffect, useState } from "react";
import api from "../../api";
import Header from "../../components/Header";
import { Container, Orders, Cards, CardContainer, Button, H2 } from "./styled";
import MenuItem from "../../components/MenuItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import {
  ProductItem,
  ProductName,
  ProductQuantity,
} from "../OrderPreparing/styled";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function OrderSaloon() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function readyOrders() {
      const data = await api.getOrders();
      setProducts(data);
      console.log(data);
    }
    readyOrders();
  }, []);

  async function status(orderId) {
    const body = { status: "delivered" };
    const data = await api.putOrdersId(orderId, body);
    window.location.href = "/orders";
  }

  return (
    <Container>
      <Header>
        <MenuItem icon="/assets/back.png" link="/saloon" />
        <MenuItem icon="/assets/delivered.png" link="/delivered" />
      </Header>
      <Orders>
        <CardContainer>
          <H2>Pedidos Prontos</H2>
          {products &&
            products
              .filter(({ status }) => status === "deliver")
              .map((item, index) => {
                return (
                  <Cards key={index}>
                    <p>
                      <strong>Pedido:</strong> {item.id}
                    </p>
                    <p>
                      <strong>Cliente:</strong>
                      {" " + item.client_name}
                    </p>
                    <p>
                      <strong>Mesa: </strong>
                      {item.table}
                    </p>
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
                    <Button
                      onClick={() => {
                        status(item.id);
                      }}
                    >
                      Entregar
                    </Button>
                  </Cards>
                );
              })}
        </CardContainer>
      </Orders>
    </Container>
  );
}
