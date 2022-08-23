import React from "react";

import { Input } from "../../Components/Forms/Input";
import { Button } from "../../Components/Forms/Button";

import { Container, Header, Title, Form, Fields } from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
