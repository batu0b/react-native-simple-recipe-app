import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loader from "../components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function DetailsScreen({ route }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setisAdded] = useState(false);
  const { params } = route;

  useEffect(() => {
    if (params) {
      setIsLoading(true);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
        .then((res) => res.json())
        .then((json) => {
          setDetails(json.meals[0]);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [params]);

  useFocusEffect(() => {
    const chekIsAdded = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        const favoriteJson = await JSON.parse(favorites);
        if (!favoriteJson) {
          setisAdded(false);
        } else {
          const val = favoriteJson.some((item) => item.id === params.id);
          setisAdded(val);
        }
      } catch (err) {
        console.log(err);
      }
    };
    chekIsAdded();
  });
  const openYotube = async () => {
    await Linking.openURL(details?.strYoutube);
  };

  const addFavorites = async () => {
    try {
      const prev = await AsyncStorage.getItem("favorites");
      const prevData = await JSON.parse(prev);
      const currentData = {
        id: details?.idMeal,
        mealName: details?.strMeal,
        uri: details?.strMealThumb,
      };
      if (prevData === null) {
        const data = [currentData];
        await AsyncStorage.setItem("favorites", JSON.stringify(data));
      } else {
        const data = [...prevData, currentData];

        await AsyncStorage.setItem("favorites", JSON.stringify(data));
      }
      setisAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavorites = async () => {
    try {
      const prev = await AsyncStorage.getItem("favorites");
      const prevData = await JSON.parse(prev);
      const newArr = [...prevData.filter((item) => item.id !== params.id)];
      await AsyncStorage.setItem("favorites", JSON.stringify(newArr));
      setisAdded(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      {!isLoading ? (
        <ScrollView style={{ flex: 1 }}>
          <Card style={{ flex: 1 }}>
            <Card.Cover source={{ uri: `${details?.strMealThumb}` }} />
            <Card.Content style={{ gap: 12 }}>
              <Text variant="titleLarge">{details?.strMeal}</Text>
              <View>
                <Text variant="titleMedium">Instructions:</Text>
                <Text variant="bodyMedium">{details?.strInstructions}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={{ gap: 32 }}>
              {!isAdded ? (
                <TouchableOpacity
                  onPress={addFavorites}
                  style={{ alignSelf: "center" }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={32}
                    color="#ffb80e"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={removeFavorites}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={32}
                    color="#e32929"
                  />
                </TouchableOpacity>
              )}

              <Button
                style={{ backgroundColor: "#e32929" }}
                onPress={openYotube}
              >
                Watch On Youtube
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}
