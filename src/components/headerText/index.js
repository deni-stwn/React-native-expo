import { StyleSheet, Text, View } from "react-native";
import React from "react";
const HeaderText = ({ label, size, mt, mb }) => {
  return (
    <Text
      style={{
        fontSize: size,
        fontFamily: "Sora-semibold",
        color: "#222",
        marginTop: mt,
        marginBottom: mb,
      }}
    >
      {label}
    </Text>
  );
};

export default HeaderText;

const styles = StyleSheet.create({});
