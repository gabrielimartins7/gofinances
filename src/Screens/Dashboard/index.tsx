import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { HighlightCard } from "../../Components/HighlightCard";
import { TransactionCard } from "../../Components/TransactionCard";

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
} from "./styles";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de App",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "17/08/2022",
    },
    {
      title: "Desenvolvimento de App",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "17/08/2022",
    },
    {
      title: "Desenvolvimento de App",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "17/08/2022",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/62737286?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gabi</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransacion="Última entrada dia 17 de agosto"
        />
        <HighlightCard
          type="down"
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransacion="Última saida dia 10 de agosto"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransacion="1 à 17 de agosto"
        />
      </HighlightCards>

      <Transaction>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard
              data={item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace(),
              }}
            />
          )}
        />
      </Transaction>
    </Container>
  );
}
