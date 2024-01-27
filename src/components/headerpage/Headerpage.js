import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const HeaderShown = ({ label, showHeart, Option }) => {
  const navigation = useNavigation();

  const optionsStyles = {
    optionsContainer: {
      // Custom styles for the options container
      padding: 5,
    },
    optionWrapper: {
      // Custom styles for each option
      padding: 10,
    },
    optionText: {
      // Custom styles for the text of each option
      fontSize: 16,
    },
  };

  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 24,
        paddingTop: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: "black",
          fontWeight: "bold",
          paddingRight: showHeart ? "0%" : "43%",
        }}
      >
        {label}
      </Text>
      {showHeart && (
        <View style={styles.menuContainer}>
          <Menu>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              {Option}
              {/* <MenuOption text="Update" />
              <MenuOption onSelect={() => handleDeleteTask(id)} text="Delete" /> */}
            </MenuOptions>
          </Menu>
        </View>
      )}
    </View>
  );
};

export default HeaderShown;

const styles = StyleSheet.create({
  menuContainer: {},
});
