import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
 } from "./styles";

export function SignIn(){
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(200)}
                        height={RFValue(200)}
                    />
                    <Title>
                        Controle suas
                        finanças de forma
                        muito simples
                    </Title>
                </TitleWrapper>

                
                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer></Footer>
        </Container>
    );
}