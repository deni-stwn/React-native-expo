import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  deleteCategory,
  getCurrentUserCategory,
  getCurrentUserTasks,
} from "../../services/firebase";
import { firebase, db } from "../../../firebaseConfig";
import { CategoryContext } from "../../contexts/Category";
import { Ionicons } from "@expo/vector-icons";
import {
  GREY_COLOR,
  LAYOUT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  TEXT_GREY,
} from "../../components/color/Color";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardStatistic from "../../components/cardStatistik/CardStatistic";

const Statistic = () => {
  const [category, setCategory] = useContext(CategoryContext);
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        const tasks = await getCurrentUserTasks();
        setTask(tasks);
      } catch (error) {
        console.error("Error fetching task data:", error.message);
      }
      setIsLoading(false);
    };

    const unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        fetchTask();
      });

    return () => unsubscribe();
  }, []);

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
              // console.log("Category deleted successfully");
            } catch (error) {
              console.error("Error deleting category:", error.message);
            }
          },
        },
      ]
    );
  };

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: LAYOUT_COLOR,
        paddingHorizontal: 20,
      }}
    >
      {/*  */}
      <View
        style={{
          marginTop: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <CardStatistic
          color={TERTIARY_COLOR}
          title="Total Category"
          value={category.slice(4).length.toString() || "0"}
        />
        <CardStatistic
          color={SECONDARY_COLOR}
          title="Total Task"
          value={task.length.toString() || "0"}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <CardStatistic
          color={SECONDARY_COLOR}
          title="Total Done"
          value={task.filter((t) => t.isDone == true).length.toString() || "0"}
        />
        <CardStatistic
          color={TERTIARY_COLOR}
          title="Total Unfinished"
          value={task.filter((t) => t.isDone == false).length.toString() || "0"}
        />
      </View>
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
          width: "100%",
          height: 2,
          opacity: 0.5,
          backgroundColor: GREY_COLOR,
        }}
      ></View>
      <Text
        style={{
          marginTop: 10,
          fontFamily: "Sora-semibold",
          fontSize: 18,
          color: "#000",
          textAlign: "center",
        }}
      >
        {/* {category.length >= 5 ? ( */}
        Category
      </Text>
      <View
        style={{
          marginTop: 10,
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
                  {cat.name}
                </Text>
                <Text
                  style={{
                    color: TEXT_GREY,
                    fontSize: 12,
                  }}
                >
                  {cat.id}
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
