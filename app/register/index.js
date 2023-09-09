import React, { useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Input,
  Container,
  TextDefault,
  Button,
  ContainerOptions,
  ScrollContainer,
} from "../styles";

export default function login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const cadastrar = async () => {
    setErro("");
    if (!email || !name || !password || !confirmPassword) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      setErro("Email inválido.");
      return;
    }

    if (password !== confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      setTimeout(() => {
        setErro("Cadastrado com sucesso.");

        setLoading(false);
      }, 1000);

      setTimeout(() => {
        router.push("/login");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollContainer>
        <Container>
          <Image source={require("../../assets/gifLogo.gif")} />
          <Text style={{ fontSize: 30, alignSelf: "flex-start" }}>
            Cadastro
          </Text>

          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Example@mail.com"
          />
          <Input onChangeText={setName} value={name} placeholder="Nome" />
          <Input
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}
            placeholder="Sua senha"
          />
          <Input
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            value={confirmPassword}
            placeholder="Confirme sua senha"
          />

          <TextDefault
            style={{
              color: error === "Cadastrado com sucesso." ? "green" : "red",
            }}
          >
            {error}
          </TextDefault>

          <Button onPress={() => cadastrar()} disabled={loading}>
            {loading ? (
              <ActivityIndicator size={27} color="white" /> // Indicador de loading
            ) : (
              <TextDefault>Cadastrar</TextDefault>
            )}
          </Button>

          <ContainerOptions>
            <Link href="/login" asChild>
              <Text>Já Possuo Conta</Text>
            </Link>
          </ContainerOptions>
        </Container>
      </ScrollContainer>
    </SafeAreaView>
  );
}
