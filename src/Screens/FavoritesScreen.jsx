import { View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "../components/Loader";
import { useFocusEffect } from "@react-navigation/native";

export default function FavoritesScreen({ navigation }) {
  const [fovorites, setFavorites] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const data = await AsyncStorage.getItem("favorites");
      setFavorites(JSON.parse(data));
    } catch (err) {
      console.log(err);
    } finally {
      let timer;
      timer = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(timer);
      }, 2000);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, [])
  );

  const Items = ({ item }) => {
    return (
      <Card style={{ margin: 12, overflow: "hidden" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              id: item.id,
              mealName: item.mealName,
            })
          }
        >
          <ImageBackground
            style={{ borderRadius: 12 }}
            source={{ uri: `${item.uri}` }}
            resizeMode="cover"
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(217, 30, 24,0.8)", "transparent"]}
            >
              <Card.Cover
                style={{ opacity: 0 }}
                source={{ uri: `${item.uri}` }}
              />
              <Text
                variant="titleLarge"
                style={{ color: "white", fontWeight: "700", margin: 12 }}
              >
                {item.mealName}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Card>
    );
  };

  if (!isLoading) {
    return (
      <SafeAreaView mode="padding" style={{ flex: 1 }}>
        <FlatList
          renderItem={({ item }) => <Items item={item} />}
          data={fovorites}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }
}
