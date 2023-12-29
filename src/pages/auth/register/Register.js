import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth, db, firebase } from "../../../../firebaseConfig"; // import the auth object from your Firebase configuration
// import { db } from "../../../../firebaseConfig"; // import the auth object from your Firebase configuration
import { Link, useNavigation } from "@react-navigation/native";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();

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

      alert("Verification email sent. Please check your email.");
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

  return (
    <View style={styles.container}>
      <Text>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
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
          <Text style={{ color: "blue" }}> Login</Text>
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
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
