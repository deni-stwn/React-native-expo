import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import {
  deleteCategory,
  getCurrentUserCategory,
} from "../../services/firebase";
import { firebase } from "../../../firebaseConfig";
import { CategoryContext } from "../../contexts/Category";
import { Ionicons } from "@expo/vector-icons";
import {
  LAYOUT_COLOR,
  PRIMARY_COLOR,
  TERTIARY_COLOR,
  TEXT_GREY,
} from "../../components/color/Color";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Statistic = () => {
  const [category, setCategory] = useContext(CategoryContext);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCurrentUserCategory();
        setCategory(categories);
      } catch (error) {
        console.error("Error fetching category data:", error.message);
      }
    };

    const unsubscribe = firebase
      .firestore()
      .collection("categories")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        fetchCategory();
      });

    return () => unsubscribe();
  }, []);

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteCategory(categoryId);
              setCategory((prevCategories) =>
                prevCategories.filter((category) => category.id !== categoryId)
              );
              console.log("Category deleted successfully");
            } catch (error) {
              console.error("Error deleting category:", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: LAYOUT_COLOR,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          marginTop: 50,
        }}
      >
        {category.length >= 5 ? (
          category.slice(4).map((cat, index) => (
            <View key={index} style={styles.taskContainer}>
              <View>
                <Text
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: "500",
                    marginBottom: 5,
                  }}
                >
                  {cat.id}
                </Text>
                <Text
                  style={{
                    color: TEXT_GREY,
                    fontSize: 12,
                  }}
                >
                  {cat.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteCategory(cat.id)}>
                <Ionicons name="trash" size={24} color={PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: TERTIARY_COLOR,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 5,
    marginTop: 10,
  },
});
