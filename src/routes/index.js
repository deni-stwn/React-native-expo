import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import Open1 from "../pages/open1";
import MyTabBar from "../components/MyTabBar";
import Statistic from "../pages/statistic";
import Activity from "../pages/activity";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";

import { auth } from "../../firebaseConfig";
import Profile from "../pages/profile";
import Detail from "../pages/detail/Detail";

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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator initialRouteName="Open1">
      {user ? (
        <>
          <Stack.Screen
            name="HomeTab"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Open1"
            component={Open1}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// const Route = () => {
//   return (
//     <Stack.Navigator initialRouteName="Open1">
//       <Stack.Screen
//         name="Open1"
//         component={Open1}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="HomeTab"
//         component={HomeTabs}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

export default Route;

const styles = StyleSheet.create({});
