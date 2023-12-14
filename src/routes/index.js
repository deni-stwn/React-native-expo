import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import Open1 from "../pages/open1";
import MyTabBar from "../components/MyTabBar";
import Statistic from "../pages/statistic";
import Activity from "../pages/activity";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Statistic"
        component={Statistic}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <Stack.Navigator initialRouteName="Open1">
      <Stack.Screen
        name="Open1"
        component={Open1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;

const styles = StyleSheet.create({});
