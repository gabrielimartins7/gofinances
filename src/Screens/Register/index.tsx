import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../Components/Forms/Input";
import { Button } from "../../Components/Forms/Button";
import { TransactionTypeButton } from "../../Components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Forms/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleTransactionSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
