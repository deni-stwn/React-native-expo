import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GREY_COLOR, SECONDARY_COLOR, TEXT_GREY } from "../color/Color";

const ProfileInfo = ({ label, value, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between",
        backgroundColor: SECONDARY_COLOR,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={24} color="black" />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Sora-semibold",
            color: TEXT_GREY,
            marginLeft: 10,
          }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Sora-semibold",
          color: "#000",
        }}
      >
        {value}
      </Text>
      {/* <Text
      style={{
        fontSize: 14,
        color: "#000",
      }}
    >
      {user?.email}
    </Text> */}
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({});
