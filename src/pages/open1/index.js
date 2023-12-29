import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Link, useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import slides from "./slides";
import { PRIMARY_COLOR } from "../../components/color/Color";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Open1 = () => {
  const navigate = useNavigation();
  const handlePress = () => {
    navigate.navigate("Login");
  };

  // const handlePress = () => {
  //   navigation.dispatch(StackActions.replace("Login"));
  // };

  return (
    <SafeAreaView
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
          marginTop: screenHeight * 0.1,
        }}
      >
        TaskTracker
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
              color: PRIMARY_COLOR,
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
              backgroundColor: PRIMARY_COLOR,
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
              backgroundColor: PRIMARY_COLOR,
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
              backgroundColor: selected ? PRIMARY_COLOR : "#ccc",
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
    </SafeAreaView>
  );
};

export default Open1;

const styles = StyleSheet.create({});
