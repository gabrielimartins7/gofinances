import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../Components/HistoryCard";

import { Container, Header, Title } from "./styles";

import { categories } from "../../utils/categories";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface categoryData {
  name: string;
  total: string;
}

export function Resume() {

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative');

    const totalByCategory = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key)
          categorySum += Number(expensive.amount);
      });

      if(categorySum > 0){
        totalByCategory.push({
          name: category.name,
          total: categorySum
        });
      }
    })
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard 
        title="Compras"
        amount="R$150,50"
        color="red"
      />
    </Container>
  );
}
