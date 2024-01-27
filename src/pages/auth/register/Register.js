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
import { auth, db, firebase } from "../../../../firebaseConfig"; // import the auth object from your Firebase configuration
// import { db } from "../../../../firebaseConfig"; // import the auth object from your Firebase configuration
import { Link, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { PRIMARY_COLOR } from "../../../components/color/Color";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Send email verification
      await auth.currentUser.sendEmailVerification({
        handleCodeInApp: true,
        // url: "https://tasktracker-ppm.firebaseapp.com",
        url: "https://tasktracker-746f2.firebaseapp.com",
      });

      ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
      // alert("Verification email sent. Please check your email.");
      // Add user details to Firestore
      await db.collection("users").doc(userCredential.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      const defaultCategories = [
        {
          id: "All",
          name: "All",
        },
        {
          id: "Study",
          name: "Study",
        },
        {
          id: "Work",
          name: "Work",
        },
        {
          id: "Personal",
          name: "Personal",
        },
      ];

      const categoryCollection = db.collection("categories");
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      defaultCategories.forEach(async (category) => {
        await categoryCollection.add({
          ...category,
          userId: userCredential.user.uid,
          createdAt: timestamp,
        });
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", error.message);
    }
  };

  const lottieAnimation = useMemo(
    () => (
      <LottieView
        source={require("../../../assets/lottie/regis.json")}
        autoPlay
        loop
        style={{
          width: width * 1.2,
          height: height * 0.4,
          marginBottom: 20,
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
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
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
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      /> */}
      <TouchableOpacity
        onPress={handleRegister}
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
          Register
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigate.navigate("Login")}>
          <Text style={{ color: PRIMARY_COLOR }}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
    padding: 10,
    borderRadius: 5,
  },
});
