import React, { useState } from "react";

import {
  Button,
  Input,
  Select,
  Container,
  Logo,
  Title,
  Option,
  P,
} from "./register-styled";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../api";

const Register = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  async function handleButton(e) {
    e.preventDefault();
    try {
      if (email === "" || password === "" || role === "" || name === "") {
        alert("Por favor, preencha todos os campos");
      } else {
        const body = {
          email,
          password,
          role,
          restaurant: "PacBurguer",
          name,
        };
        await api.register(body);
        alert("dados cadastrado com sucesso");
        history.push("/login");
      }

    } catch (error) {

    }

  }

  return (
    <Container>
      <Logo src="/assets/logo-pac.png" />
      <Title>Cadastre-se no Pac Burguers</Title>

      <Input
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Nome"
        required
      />
      <br />
      <Input
        type="email"
        value={email}
        onChange={handleEmail}
        placeholder="Email"
        required
      />
      <br />
      <Select value={role} onChange={handleRole} required>
        <Option disabled value={""}>
          Selecione seu cargo
        </Option>
        <Option value={"kitchen"}>Cozinha | Chefe</Option>
        <Option value={"saloon"}>Salão | Garçon</Option>
      </Select>
      <br />
      <Input
        type="password"
        value={password}
        onChange={handlePassword}
        placeholder="Senha mínimo 6 caracteres"
        required
      />
      <br />
      <Button type="submit" onClick={handleButton}>
        Cadastrar
      </Button>

      <P>
        Já tem cadastro: <Link to="/login">Entre aqui</Link>
      </P>
    </Container>
  );
};

export default Register;
