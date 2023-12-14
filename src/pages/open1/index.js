import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { Link, useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import slides from "./slides";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Open1 = () => {
  const navigate = useNavigation();
  const handlePress = () => {
    navigate.navigate("HomeTab");
  };

  // const handlePress = () => {
  //   navigation.dispatch(StackActions.replace("Login"));
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: screenHeight * 0.04,
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
          marginTop: screenHeight * 0.001,
        }}
      >
        Financy
      </Text>
      <Onboarding
        onSkip={() => {
          handlePress();
        }}
        onDone={() => {
          handlePress();
        }}
        bottomBarHighlight={false}
        bottomBarHeight={80}
        SkipButtonComponent={({ ...props }) => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#6F6CD9",
              marginLeft: 20,
            }}
            {...props}
          >
            Skip
          </Text>
        )}
        NextButtonComponent={({ ...props }) => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
              marginRight: 20,
              backgroundColor: "#6F6CD9",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            {...props}
          >
            Next
          </Text>
        )}
        DoneButtonComponent={({ ...props }) => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
              marginRight: 20,
              backgroundColor: "#6F6CD9",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            {...props}
          >
            Done
          </Text>
        )}
        DotComponent={({ selected }) => (
          <View
            style={{
              width: selected ? 20 : 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 6,
              backgroundColor: selected ? "#6F6CD9" : "#ccc",
            }}
          />
        )}
        pages={slides.map((slide, index) => ({
          backgroundColor: "#fff",
          image: (
            <View style={{ marginTop: screenHeight * -0.3 }}>
              <Image
                source={slide.image}
                style={{ width: screenWidth, height: screenHeight * 0.4 }}
                resizeMode={`${index === 1 ? "contain" : "cover"}`}
              />
            </View>
          ),
          title: slide.title,
          subtitle: slide.description,
        }))}
      />
    </View>
  );
};

export default Open1;

const styles = StyleSheet.create({});
