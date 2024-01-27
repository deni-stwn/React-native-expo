import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { firebase } from "../../../firebaseConfig";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import BottomSheetAdd from "../task/add";
import BottomSheetContainer from "../../components/BottomSheet/BottomSheetContainer";
import CreateTask from "../../layouts/task/CreateTask";
import Checkbox from "expo-checkbox";
import {
  deleteTask,
  getCurrentUserCategory,
  getCurrentUserTasks,
  getCurrentUserTasksByCategory,
} from "../../services/firebase";
import CardTask from "../../components/cardTask/CardTask";
import { CategoryContext } from "../../contexts/Category";
import {
  LAYOUT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_GREY,
} from "../../components/color/Color";
import { RefreshControl } from "react-native";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [category, setCategory] = useContext(CategoryContext);
  // const [category, setCategory] = useState([
  //   {
  //     id: "All",
  //     name: "All",
  //   },
  //   {
  //     id: "Study",
  //     name: "Study",
  //   },
  //   {
  //     id: "Work",
  //     name: "Work",
  //   },
  //   {
  //     id: "Personal",
  //     name: "Personal",
  //   },
  // ]);
  const [categoryId, setCategoryId] = useState("All");

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();
    fetchTasks();
    fetchCategory();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleTaskCreated = () => {
    setShowAddTask(-1);
    handleSheetChanges(-1);
    setShowAddTask(1);
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const documentSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();

      // console.log("User exists: ", documentSnapshot.exists);
      if (documentSnapshot.exists) {
        // console.log("User data: ", documentSnapshot.data());
        setUser(documentSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true); // Set loading state to true before fetching tasks
    const { tasks: allTasks, userTasks: tasksByUser } =
      await getCurrentUserTasksByCategory(categoryId);
    setTasks(allTasks);
    setUserTasks(tasksByUser);
    setIsLoading(false); // Set loading state to false after fetching tasks
  };
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        fetchTasks();
      });

    return () => unsubscribe();
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const categories = await getCurrentUserCategory();
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching category data:", error.message);
    }
  };
  useEffect(() => {
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

  const handleTabPress = (newCategoryId) => {
    setCategoryId(newCategoryId);
  };

  const handleTaskDone = async (taskId, isDone) => {
    try {
      await firebase.firestore().collection("tasks").doc(taskId).update({
        isDone: isDone,
      });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: PRIMARY_COLOR,
            height: height * 0.2,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        >
          {user?.profilePicture ? (
            <Image
              source={{ uri: user?.profilePicture }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={require("../../assets/img/default.jpg")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
          )}
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#f9ffff",
              }}
            >
              Hii, {user && user.firstName ? user.firstName : ""}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
              }}
            >
              Wellcome back
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={category}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor:
                    item.name === categoryId ? PRIMARY_COLOR : SECONDARY_COLOR,
                  borderRadius: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  marginHorizontal: 10,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => handleTabPress(item.name)}
                >
                  <Text
                    style={{
                      color: item.name === categoryId ? "#fff" : TEXT_GREY,
                    }}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 20,
          }}
        >
          {categoryId === "All" ? (
            tasks.length > 0 ? (
              <CardTask
                tasks={tasks}
                setIsDone={setIsDone}
                handleTaskDone={handleTaskDone}
                navigate={navigate}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                  marginTop: 30,
                }}
              >
                <Image
                  source={require("../../assets/img/undraw_Reminder_re_fe15.png")}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Add Tasks First
                </Text>
              </View>
            )
          ) : userTasks.length > 0 ? (
            <CardTask
              tasks={userTasks}
              setIsDone={setIsDone}
              handleTaskDone={handleTaskDone}
              navigate={navigate}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                }}
              >
                {isLoading && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                {!isLoading && <Text>You don't have any task</Text>}
              </Text>
            </View>
          )}
        </ScrollView>
        <BottomSheetContainer
          index={showAddTask}
          content={<CreateTask onTaskCreated={handleTaskCreated} />}
          handleSheetChanges={handleSheetChanges}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LAYOUT_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
