import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { auth } from "../../../../firebaseConfig"; // import the auth object from your Firebase configuration
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import HeaderText from "../../../components/headerText";
import { PRIMARY_COLOR } from "../../../components/color/Color";
import { Ionicons } from "@expo/vector-icons"; // import Ionicons from expo vector icons

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Login = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    navigate.navigate("Register");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      // Alert.alert("Success!", "Logged in successfully");
      ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
      navigate.navigate("HomeTab"); // change this line
      setLoading(false);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        Alert.alert("Invalid credentials. Please try again.");
      } else {
        Alert.alert("Error!", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const lottieAnimation = useMemo(
    () => (
      <LottieView
        source={require("../../../assets/lottie/login.json")}
        autoPlay
        loop
        style={{
          width: width * 1.2,
          height: height * 0.4,
        }}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      {lottieAnimation}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
      /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <TextInput
          style={{
            width: "90%",
            height: 40,
          }}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.toggleShowPassword}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: PRIMARY_COLOR,
          width: "100%",
          height: 40,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "Sora-semibold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      {loading && <Text>Loading...</Text>}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ color: PRIMARY_COLOR, marginLeft: 5 }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
