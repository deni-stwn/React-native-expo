import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  LogBox,
  Alert,
} from "react-native";
import { auth, firebase, db } from "../../../firebaseConfig";
import { TouchableOpacity } from "react-native";
import {
  GREY_COLOR,
  LAYOUT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_GREY,
} from "../../components/color/Color";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import InputWithIcon from "../../components/input/Input";
import ProfileInfo from "../../components/sectionProfile/ProfileInfo";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => logout() },
      ],
      { cancelable: false }
    );
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const updateUser = async () => {
    try {
      await db.collection("users").doc(firebase.auth().currentUser.uid).update({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      fetchUser();
    } catch (error) {
      console.error("Error updating user data:", error.message);
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

    // delete result.cancelled;
    // console.log("jjjj", result);

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

  const removeImage = async () => {
    Alert.alert(
      "Remove Profile Picture",
      "Are you sure you want to remove your profile picture?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => removeProfilePicture() },
      ],
      { cancelable: false }
    );
  };

  const removeProfilePicture = async () => {
    try {
      await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ profilePicture: null });

      fetchUser();
    } catch (error) {
      console.error("Error removing profile picture: ", error);
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
    <View
      style={{
        flex: 1,
        backgroundColor: LAYOUT_COLOR,
      }}
    >
      <View
        style={{
          backgroundColor: PRIMARY_COLOR,
          width: "100%",
          paddingTop: 60,
          paddingBottom: 20,
          borderBottomRightRadius: 18,
          borderBottomLeftRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={chooseImage}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user?.profilePicture ? (
            <Image
              source={{ uri: user?.profilePicture }}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={require("../../assets/img/default.jpg")}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Sora-semibold",
            color: "#fff",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {user?.firstName} {user?.lastName}
        </Text>
      </View>
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={removeImage}
        >
          <Text
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            Remove profile picture
          </Text>
        </TouchableOpacity> */}
        <View
          style={{
            width: "100%",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Sora-semibold",
                color: "#000",
                marginBottom: 20,
                paddingHorizontal: 20,
                // textAlign: "center",
              }}
            >
              Account
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Sora-semibold",
                color: PRIMARY_COLOR,
                marginBottom: 20,
                paddingHorizontal: 20,
                // textAlign: "center",
              }}
            >
              Edit
            </Text>
          </View>
          {/* section tagname */}
          <ProfileInfo
            icon={"person-outline"}
            label="Name"
            value={user?.firstName}
          />
          <ProfileInfo
            icon={"albums-outline"}
            label="Last Name"
            value={user?.lastName}
          />
          <ProfileInfo
            icon="at-circle-outline"
            label="Email"
            value={user?.email}
          />
          {/* <InputWithIcon
          iconName="person-outline"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="first name"
        />
        <InputWithIcon
          iconName="albums-outline"
          value={lastName}
          onChangeText={setLastName}
          placeholder="last name"
        />
        <InputWithIcon
          iconName="at-circle-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="email"
        /> */}
        </View>
        {/* <TouchableOpacity
        style={{
          backgroundColor: PRIMARY_COLOR,
          width: "100%",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={updateUser}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          Update
        </Text>
      </TouchableOpacity> */}

        <View
          style={{
            width: "100%",
            marginTop: 30,
            height: 1,
            backgroundColor: GREY_COLOR,
          }}
        ></View>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: SECONDARY_COLOR,
            width: "100%",
            padding: 10,
            borderRadius: 14,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontFamily: "Sora-semibold",
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={removeImage}
          style={{
            backgroundColor: SECONDARY_COLOR,
            width: "100%",
            padding: 10,
            borderRadius: 14,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontFamily: "Sora-semibold",
            }}
          >
            Remove profile picture
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: LAYOUT_COLOR,
    paddingHorizontal: 20,
  },
});
