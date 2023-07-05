import { PaperProvider } from "react-native-paper";
import { Main } from "./src/router/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    const clearAll = async () => {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        // clear error
      }

      console.log("Done.");
    };
    clearAll();
  }, []);

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Main />
    </PaperProvider>
  );
}
