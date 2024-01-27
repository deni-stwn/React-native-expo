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
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../components/color/Color";
import LottieView from "lottie-react-native";

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
        justifyContent: "center",
        // alignItems: "center",
        paddingTop: screenHeight * 0.1,
      }}
    >
      {/* <Text
        style={{
          fontSize: screenHeight * 0.04,
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
          marginTop: screenHeight * 0.1,
        }}
      >
        TaskTracker
      </Text> */}
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
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={{ marginTop: screenHeight * -0.3 }}>
                <LottieView
                  source={require("../../assets/lottie/1.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                {/* <Image
                  source={require("../../../assets/images/1.png")}
                  style={{ width: screenWidth, height: screenHeight * 0.4 }}
                  resizeMode="cover"
                /> */}
              </View>
            ),
            title: <Text style={styles.title}>Welcome to TaskTracker</Text>,
            subtitle: (
              <Text style={styles.subtitle}>
                The best app to manage your task and collaborate with your team
              </Text>
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={{ marginTop: screenHeight * -0.3 }}>
                <LottieView
                  source={require("../../assets/lottie/2.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                {/* <Image
                  source={require("../../../assets/images/2.png")}
                  style={{ width: screenWidth, height: screenHeight * 0.4 }}
                  resizeMode="cover"
                /> */}
              </View>
            ),
            title: (
              <Text style={styles.title}>Personalize Your Experience</Text>
            ),
            subtitle: (
              <Text style={styles.subtitle}>
                Choose your favorite theme and personalize your experience
              </Text>
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={{ marginTop: screenHeight * -0.3 }}>
                <LottieView
                  source={require("../../assets/lottie/4.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: <Text style={styles.title}>Collaborate with Ease</Text>,
            subtitle: (
              <Text style={styles.subtitle}>
                Invite your team and collaborate with them easily
              </Text>
            ),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default Open1;

const styles = StyleSheet.create({
  lottie: {
    width: screenWidth * 1.2,
    height: screenHeight * 0.4,
  },
  title: {
    fontSize: 24,
    fontFamily: "Sora-semibold",
    paddingHorizontal: 24,
    textAlign: "center",
    color: PRIMARY_COLOR,
  },
  subtitle: {
    fontFamily: "Sora-regular",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    paddingTop: 14,
    paddingHorizontal: 20,
  },
});

// slides.map((slide, index) => ({
//   backgroundColor: "#fff",
//   image: (
//     <View style={{ marginTop: screenHeight * -0.3 }}>
//       <Image
//         source={slide.image}
//         style={{ width: screenWidth, height: screenHeight * 0.4 }}
//         resizeMode={`${index === 1 ? "contain" : "cover"}`}
//       />
//     </View>
//   ),
//   title: slide.title,
//   subtitle: slide.description,
// }))
