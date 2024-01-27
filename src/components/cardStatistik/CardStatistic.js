import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TEXT_GREY } from "../color/Color";

const CardStatistic = ({ color, title, value }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 100,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: 12,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 5,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: TEXT_GREY,
          fontSize: 12,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default CardStatistic;

const styles = StyleSheet.create({});
