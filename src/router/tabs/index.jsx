import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStacks } from "../stack";
import FavoritesScreen from "../../Screens/FavoritesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeTab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, ...props }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "FavoritesTab") {
            iconName = focused ? "star" : "star-outline";
          }

          return <Ionicons name={iconName} {...props} />;
        },
        tabBarActiveTintColor: "#ffb80e",
        tabBarInactiveTintColor: "#ffff",
        tabBarInactiveBackgroundColor: "#e32929",
        tabBarActiveBackgroundColor: "#e32929",
      })}
    >
      <HomeTab.Screen
        name="HomeTab"
        options={{ title: "Home" }}
        component={HomeStacks}
      />
      <HomeTab.Screen
        name="FavoritesTab"
        options={{ title: "Favorites" }}
        component={FavoritesScreen}
      />
    </HomeTab.Navigator>
  );
};

export { HomeTabs };
