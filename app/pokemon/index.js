import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import { Card, ContainerPoke, TextDefault } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");

  const typeColors = {
    normal: "gray",
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "yellow",
    ice: "lightblue",
    fighting: "orange",
    poison: "purple",
    ground: "brown",
    flying: "skyblue",
    psychic: "pink",
    bug: "limegreen",
    rock: "sienna",
    ghost: "darkpurple",
    steel: "silver",
    dark: "darkgray",
    dragon: "indigo",
    fairy: "pink",
  };

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=30"
      );
      const data = await response.json();
      const pokemonList = data.results;

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        })
      );

      setPokemonData(pokemonDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon:", error);
    }
  };

  const getName = async () => {
    const storedName = await AsyncStorage.getItem("name");
    setName(storedName);
  };

  const logout = () => {
    router.push("/login");
  };

  useEffect(() => {
    fetchPokemonData();
    getName();
  }, []);

  const renderPokemon = ({ item }) => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="blue" />;
    }

    const types = item.types.map((type) => type.type.name);
    const borderColor = typeColors[types[0]] || "gray";

    return (
      <Card
        style={{
          borderColor,
          shadowColor: borderColor,
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
          }}
          style={{ width: 200, height: 200 }}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50%",
          }}
        >
          <ActivityIndicator size={80} color="green" />
        </View>
      ) : (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 20,
            }}
          >
            <TextDefault style={{ color: "black" }}>{name}</TextDefault>
            <TextDefault style={{ color: "red" }} onPress={() => logout()}>
              Sair
            </TextDefault>
          </View>
          <ContainerPoke
            data={pokemonData}
            keyExtractor={(item) => item.name}
            renderItem={renderPokemon}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
