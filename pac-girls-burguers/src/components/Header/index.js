import React from "react";
import { Container, Logo, Title, Button, Div } from "./styled";

export default ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <Container>
      <Div>
        <Logo src="/assets/logo-pac.png" />
        <Title>PAC BURGUER</Title>
      </Div>
      {children}
      <Button onClick={handleLogout}>
        <img style={{ width: "100px" }} src="/assets/logout.png" />
      </Button>
    </Container>
  );
};
