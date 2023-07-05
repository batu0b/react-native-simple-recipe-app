import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/Loader";
const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        let timer;
        timer = setTimeout(() => {
          setIsLoading(false);
          clearTimeout(timer);
        }, 2500);
      });
  }, []);

  const Item = ({ item }) => (
    <View
      style={{
        backgroundColor: "#e32929",
        flexDirection: "row",
        marginLeft: 30,
        marginVertical: 20,
        padding: 10,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 10,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Products", {
            categoryName: item.strCategory,
          })
        }
        style={{ flexDirection: "row", gap: 32, alignItems: "center" }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${item.strCategoryThumb}`,
          }}
        />
        <Text variant="titleMedium" style={{ color: "white" }}>
          {item.strCategory}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        alignItems: `${isLoading ? "center" : "flex-end"}`,
        justifyContent: "center",
        flex: 1,
      }}
    >
      {!isLoading ? (
        <FlatList
          renderItem={({ item }) => <Item item={item} />}
          data={categories}
          keyExtractor={(item) => item.idCategory}
        />
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffb80e",
  },
});

export default HomeScreen;
