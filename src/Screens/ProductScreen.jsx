import { View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

export default function ProductScreen({ route, navigation }) {
  const [meals, setMeals] = useState(null);

  const { params } = route;
  useEffect(() => {
    if (params) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`
      )
        .then((res) => res.json())
        .then((json) => setMeals(json.meals));
    }
  }, [params]);

  const Items = ({ item }) => {
    return (
      <Card style={{ margin: 12, overflow: "hidden" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              id: item.item.idMeal,
              mealName: item.item.strMeal,
            })
          }
        >
          <ImageBackground
            style={{ borderRadius: 12 }}
            source={{ uri: `${item.item.strMealThumb}` }}
            resizeMode="cover"
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(217, 30, 24,0.8)", "transparent"]}
            >
              <Card.Cover
                style={{ opacity: 0 }}
                source={{ uri: `${item.item.strMealThumb}` }}
              />
              <Text
                variant="titleLarge"
                style={{ color: "white", fontWeight: "700", margin: 12 }}
              >
                {item.item.strMeal}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={{ padding: 30 }}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={(item) => <Items item={item} />}
      />
    </View>
  );
}
