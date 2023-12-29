import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, Image, LogBox } from "react-native";
import { auth, firebase, db } from "../../../firebaseConfig";
import { TouchableOpacity } from "react-native";
import { LAYOUT_COLOR } from "../../components/color/Color";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const fetchUser = async () => {
    try {
      const documentSnapshot = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();

      // console.log("User exists: ", documentSnapshot.exists);
      if (documentSnapshot.exists) {
        // console.log("User data: ", documentSnapshot.data());
        setUser(documentSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  LogBox.ignoreLogs([
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
  ]);

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    delete result.cancelled;
    console.log("jjjj", result);

    if (!result.canceled) {
      const imageUrl = await uploadImage(result.assets[0].uri);
      // console.log("jjjj", result.assets);
      await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ profilePicture: imageUrl });
      fetchUser();
    }
  };

  const uploadImage = async (uri) => {
    const userId = firebase.auth().currentUser.uid;
    const imageName = `profile/${userId}`;
    const reference = firebase.storage().ref(imageName);

    const response = await fetch(uri);
    const blob = await response.blob();

    await reference.put(blob);
    return reference.getDownloadURL();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chooseImage}>
        {user?.profilePicture ? (
          <Image
            source={{ uri: user?.profilePicture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={require("../../assets/img/1.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
        {/* <Image
          source={{ uri: user?.profilePicture }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        /> */}
      </TouchableOpacity>
      <Text>
        {user && user.firstName ? user.firstName : ""}{" "}
        {user && user.lastName ? user.lastName : ""}
      </Text>
      <Text>{user?.email}</Text>

      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: LAYOUT_COLOR,
    paddingHorizontal: 20,
  },
});
