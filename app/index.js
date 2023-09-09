import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, Container, TextDefault } from "./styles";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Link } from "expo-router";

export default function Page() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1);

    return () => clearInterval(interval);
  }, [colorIndex]);

  const text = "Aplicativo Muito Incrível";
  const textAnimatedStyles = text.split("").map((char, index) => {
    const charColor = useSharedValue(colors[index % colors.length]);
    useEffect(() => {
      charColor.value = withTiming(
        colors[(index + colorIndex) % colors.length],
        {
          duration: 1,
          easing: Easing.ease,
        }
      );
    }, [colorIndex]);

    const charAnimatedStyle = useAnimatedStyle(() => {
      return {
        color: charColor.value,
      };
    });

    return (
      <Animated.Text key={index} style={[{ fontSize: 25 }, charAnimatedStyle]}>
        {char}
      </Animated.Text>
    );
  });

  return (
    <Container>
      <Image source={require("../assets/gifLogo.gif")} />

      <View style={{ flexDirection: "row" }}>{textAnimatedStyles}</View>

      <Link href="/login" asChild>
        <Button>
          <TextDefault>Login</TextDefault>
        </Button>
      </Link>
    </Container>
  );
}
