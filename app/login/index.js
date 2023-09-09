import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, Text, ActivityIndicator } from "react-native";
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const entrar = async () => {
    setError("");
    setLoading(true);

    const storedEmail = await AsyncStorage.getItem("email");
    const storedPassword = await AsyncStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      setLoading(true);

      router.push("/pokemon");
    } else {
      setLoading(false);

      setError("Credenciais inválidas.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollContainer>
        <Container>
          <Image source={require("../../assets/gifLogo.gif")} />
          <Text style={{ fontSize: 30, alignSelf: "flex-start" }}>Login</Text>
          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Example@mail.com"
          />
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="**********"
            secureTextEntry={true}
          />

          <TextDefault style={{ color: "red" }}>{error}</TextDefault>
          <Button onPress={() => entrar()} disabled={loading}>
            {loading ? (
              <ActivityIndicator size={27} color="white" />
            ) : (
              <TextDefault>Entrar</TextDefault>
            )}
          </Button>

          <ContainerOptions>
            <Link href="/" asChild>
              <Text>Voltar</Text>
            </Link>

            <Link href="/register" asChild>
              <Text>Cadastrar-se</Text>
            </Link>
          </ContainerOptions>
        </Container>
      </ScrollContainer>
    </SafeAreaView>
  );
}
