import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheetContainer from "../../components/BottomSheet/BottomSheetContainer";

const Activity = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Activity</Text>
      <BottomSheetContainer />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({});
