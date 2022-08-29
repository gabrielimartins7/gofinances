import React, { useState } from "react";

import { Input } from "../../Components/Forms/Input";
import { Button } from "../../Components/Forms/Button";
import { TransactionTypeButton } from "../../Components/Forms/TransactionTypeButton";
import { CategorySelect } from "../../Components/Forms/CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionType>
          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
