import React from "react";
import { useHistory } from "react-router-dom";

import { Container, Button } from "./styled";

export const HallSaloon = () => {
  const history = useHistory();

  const buttonNew = () => {
    history.push("/saloon");
  };
  const buttonReady = () => {
    history.push("/orders");
  };
  return (
    <Container>
      <Button new={true} onClick={buttonNew}>
        Novo Pedido
      </Button>
      <Button onClick={buttonReady}>Pedidos Prontos</Button>
    </Container>
  );
};
