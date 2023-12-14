import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TabItems = ({
  index,
  label,
  onPress,
  onLongPress,
  isFocused,
  options,
}) => {
  const Logo = () => {
    if (label === "Home") {
      return isFocused ? (
        <Ionicons name="home" size={26} color="#6F6CD9" />
      ) : (
        <Ionicons name="home" size={26} color="grey" />
      );
    }
    if (label === "Activity") {
      return isFocused ? (
        <Ionicons name="ios-newspaper" size={26} color="#6F6CD9" />
      ) : (
        <Ionicons name="ios-newspaper" size={26} color="grey" />
      );
    }
    if (label === "Statistic") {
      return isFocused ? (
        <AntDesign name="piechart" size={26} color="#6F6CD9" />
      ) : (
        <AntDesign name="piechart" size={26} color="grey" />
      );
    }
  };
  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ alignItems: "center" }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Logo />
        {isFocused ? (
          <View
            style={{
              width: 10,
              height: 5,
              borderRadius: 18,
            }}
          >
            {/* <LinearGradient
              colors={["#C67C4E", "#EDAB81"]}
              style={{
                width: 10,
                height: 5,
                borderRadius: 18,
              }}
            /> */}
          </View>
        ) : (
          <></>
        )}
        <Text
          style={{
            color: isFocused ? "#6F6CD9" : "grey",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 55,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 4.65,
    elevation: 3,
  },
});
