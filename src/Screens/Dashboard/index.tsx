import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../Components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserName,
  HighlightCards,
  Transaction,
  TransactionList,
  Title,
  LogoutButton,
  LoadingContainer
} from "./styles";

import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlighProps {
  total: string;
  lastTransacion: string;
}

interface HighlightData {
  entries: HighlighProps;
  expensives: HighlighProps;
  amountTotal: HighlighProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
    ){

      const lastTransacion = new Date(
      Math.max.apply(Math, collection
      .filter(transactions => transactions.type === type)
      .map(transactions => new Date(transactions.date).getTime())))

      return `${lastTransacion.getDate()} de ${lastTransacion.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions(){
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      
      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;
    

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransacion: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransacion: `Última saída dia ${lastTransactionExpensives}`,
      },
      amountTotal: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransacion: totalInterval
      }
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? 
        <LoadingContainer>
          <ActivityIndicator 
            color={theme.colors.primary} 
            size="large" 
          /> 
        </LoadingContainer> : 
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.total}
              lastTransacion={highlightData.entries.lastTransacion}
            />
            <HighlightCard
              type="down"
              title="Saidas"
              amount={highlightData.expensives.total}
              lastTransacion={highlightData.expensives.lastTransacion}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.amountTotal.total}
              lastTransacion={highlightData.amountTotal.lastTransacion}
            />
          </HighlightCards>

          <Transaction>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transaction>
      </>
    }
    </Container>
  );
}
