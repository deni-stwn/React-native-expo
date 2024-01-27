import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Route from "./src/routes";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { MenuProvider } from "react-native-popup-menu";
import { CategoryProvider } from "./src/contexts/Category";
import { LAYOUT_COLOR } from "./src/components/color/Color";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Sora-bold": require("./assets/fonts/Sora-Bold.ttf"),
    "Sora-regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-semibold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Sora-light": require("./assets/fonts/Sora-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <MenuProvider>
      <CategoryProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <ExpoStatusBar />
          <Route />
        </NavigationContainer>
      </CategoryProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LAYOUT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});
