import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../Screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs } from "../tabs";
import HomeScreen from "../../Screens/HomeScreen";
import ProductScreen from "../../Screens/ProductScreen";
import DetailsScreen from "../../Screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export const HomeStacks = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_bottom",
      headerStyle: { backgroundColor: "#e32929" },
      headerTitleStyle: { color: "#ffb80e" },
      headerTintColor: "#fff",
      navigationBarHidden: true,
      statusBarTranslucent: true,
    }}
    initialRouteName="Categories"
  >
    <Stack.Screen name="Categories" component={HomeScreen} />
    <Stack.Screen
      options={({ route }) => ({ title: route.params.categoryName })}
      name="Products"
      component={ProductScreen}
    />
    <Stack.Screen
      options={({ route }) => ({ title: route.params.mealName })}
      name="Details"
      component={DetailsScreen}
    />
  </Stack.Navigator>
);

export const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeStack"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          navigationBarHidden: true,
          statusBarTranslucent: true,
        }}
      >
        <Stack.Screen name="WelcomeStack" component={WelcomeScreen} />
        <Stack.Screen name="HomeStack" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
