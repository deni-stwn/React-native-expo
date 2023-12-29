import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LAYOUT_COLOR, PRIMARY_COLOR } from "../color/Color";

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
        <Ionicons name="home" size={22} color={`${PRIMARY_COLOR}`} />
      ) : (
        <Ionicons name="home" size={22} color="grey" />
      );
    }
    if (label === "Activity") {
      return isFocused ? (
        <Ionicons name="ios-newspaper" size={22} color={`${PRIMARY_COLOR}`} />
      ) : (
        <Ionicons name="ios-newspaper" size={22} color="grey" />
      );
    }
    if (label === "Statistic") {
      return isFocused ? (
        <AntDesign name="piechart" size={22} color={`${PRIMARY_COLOR}`} />
      ) : (
        <AntDesign name="piechart" size={22} color="grey" />
      );
    }
    if (label === "Profile") {
      return isFocused ? (
        <Ionicons name="person" size={22} color={`${PRIMARY_COLOR}`} />
      ) : (
        <Ionicons name="person" size={22} color="grey" />
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
            <LinearGradient
              colors={[`${PRIMARY_COLOR}`, `${PRIMARY_COLOR}`]}
              style={{
                width: "auto",
                height: 5,
                marginTop: 3,
                borderRadius: 18,
              }}
            />
          </View>
        ) : (
          <></>
        )}
        {/* <Text
          style={{
            color: isFocused ? {`${PRIMARY_COLOR}`} : "grey",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {label}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: LAYOUT_COLOR,
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
