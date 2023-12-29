// BottomSheetContainer.js
import React, { useCallback, useMemo, useRef } from "react";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../color/Color";

const BottomSheetContainer = ({ content, handleSheetChanges, index = 1 }) => {
  const props = { content, handleSheetChanges };
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["40%", "55%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.buttonAdd}
        >
          <Entypo name="add-to-list" size={24} color="white" />
        </TouchableOpacity>
        <BottomSheetModal
          style={{ backgroundColor: "white" }}
          ref={bottomSheetModalRef}
          index={index}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          {/* Use the BottomSheetContent component */}
          {props.content}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "end",
  },
  buttonAdd: {
    position: "absolute",
    top: -70,
    left: 310,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomSheetContainer;
