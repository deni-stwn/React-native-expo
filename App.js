import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Route from "./src/routes";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { MenuProvider } from "react-native-popup-menu";
import { CategoryProvider } from "./src/contexts/Category";
import { LAYOUT_COLOR } from "./src/components/color/Color";

export default function App() {
  return (
    <MenuProvider>
      <CategoryProvider>
        <NavigationContainer>
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
