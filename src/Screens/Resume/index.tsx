import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from "@react-navigation/native";

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from "styled-components"
import { useAuth } from "../../hooks/auth";

import { HistoryCard } from "../../Components/HistoryCard";

import { 
  Container,
  Header, 
  Title, 
  Content, 
  ChartContainer,
  MounthSelect,
  MounthSelectButton,
  SelectIcon,
  Mounth,
  LoadingContainer,
} from "./styles";

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
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [ selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    }else{
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => 
      expensive.type === 'negative' && 
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives
    .reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);

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

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum, 
          totalFormatted,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }
  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
       <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading ? 
        <LoadingContainer>
          <ActivityIndicator 
            color={theme.colors.primary} 
            size="large" 
          /> 
        </LoadingContainer> : 
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >

          <MounthSelect>
            <MounthSelectButton onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left"/>
            </MounthSelectButton>

            <Mounth>
              { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
            </Mounth>

            <MounthSelectButton onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right"/>
            </MounthSelectButton>
          </MounthSelect>

          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(categoy => categoy.color)}
              style={{
                labels: { 
                  fontSize: RFValue(14),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
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
    }
    </Container>
  );
}