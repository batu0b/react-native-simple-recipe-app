import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

export default function Loader() {
  return (
    <AnimatedLottieView
      source={require("../../assets/loader.json")}
      autoPlay
      autoSize
    />
  );
}
