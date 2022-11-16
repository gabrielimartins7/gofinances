import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../Components/HistoryCard";

import { Container, Header, Title, Content } from "./styles";

import { categories } from "../../utils/categories";

interface TransactionData{
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: Number;
  totalFormatted: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum, 
          totalFormatted
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }
  useEffect(() =>{
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

    <Content>
      <VictoryPie 
        data={totalByCategories}
        x="name"
        y="total"
      />
      {
        totalByCategories.map(item => (
          <HistoryCard 
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))
      }
    </Content>
    </Container>
  );
}