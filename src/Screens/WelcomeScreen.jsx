import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1 / 2,
          justifyContent: "center",
          gap: 30,
          width: (Dimensions.get("window").width * 2) / 3,
        }}
      >
        <Text variant="displaySmall">
          Welcome To <Text style={{ color: "#ffb80e" }}>MealMaster </Text>
        </Text>
        <Text variant="bodyLarge">
          Each recipe in MealMaster comes with detailed step-by-step
          instructions, making it easy for anyone to follow along. You'll also
          find useful tips, tricks, and cooking techniques to enhance your
          skills in the kitchen.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeStack")}
          style={{
            backgroundColor: "#e32929",
            padding: 12,
            borderRadius: 5,
            shadowColor: "black",
            shadowOffset: {
              width: 12,
              height: 4,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 12,
          }}
        >
          <Text style={{ color: "white" }}>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
