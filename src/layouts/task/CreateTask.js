import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import date picker
import { firebase, db, auth } from "../../../firebaseConfig";
import {
  addCurrentCategory,
  addCurrentTask,
  getCurrentUserCategory,
} from "../../services/firebase"; // Sesuaikan dengan path file yang sesuai
import { CategoryContext } from "../../contexts/Category";
import InputWithIcon from "../../components/input/Input";
import { Ionicons } from "@expo/vector-icons";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_GREY,
} from "../../components/color/Color";

const CreateTask = ({ onTaskCreated }) => {
  const getCurrentUserId = () => auth.currentUser.uid;
  const firestore = db;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [categories, setCategories] = useContext(CategoryContext);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === "ios");
    setDeadline(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowTimePicker(Platform.OS === "ios");
    setDeadline(currentDate);
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        const userData = doc.data();
        if (userData && userData.categoryIds) {
          setCategories(userData.categoryIds);
        }
      });

    return () => unsubscribe();
  }, [userId]);

  // useEffect(() => {
  //   const unsubscribe = firestore
  //     .collection("categories")
  //     .where("userId", "==", userId)
  //     .orderBy("createdAt", "asc")
  //     .onSnapshot((snapshot) => {
  //       const categories = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         categories.push(data);
  //       });
  //       setCategories(categories);
  //     });

  //   return () => unsubscribe();
  // });
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

  console.log("Categories :", categories);

  const handleAddCategory = async () => {
    try {
      const currentCategories = await getCurrentUserCategory();
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      if (currentCategories.some((cat) => cat.name === category)) {
        alert("A category with this name already exists.");
        return;
      }

      const categoryData = {
        name: category,
        createdAt: timestamp,
      };

      await addCurrentCategory(categoryData);

      setIsModalVisible(false);
      setCategory("");
      alert(`Category added successfully`);
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  const handleAddTask = async () => {
    try {
      if (!title.trim()) {
        alert("Please enter a task title");
        return;
      }
      const combinedDateTime = new Date(deadline);
      const selectedTime = new Date(deadline); // Assuming deadline is the selected time

      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());
      const taskId = await addCurrentTask(
        {
          title,
          description,
          deadline: combinedDateTime,
        },
        selectedCategory
      );
      onTaskCreated();
      setTitle("");
      setDescription("");
      setDeadline(new Date());
      setSelectedCategory(null);

      alert(`Task added successfully`);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  // let categoryString = category.toString();

  const userId = getCurrentUserId();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, marginHorizontal: 20 }}
      enabled
    >
      <View style={{ flex: 1 }}>
        <InputWithIcon
          value={title}
          onChangeText={setTitle}
          placeholder={"Enter Task"}
          iconName={"checkmark-done-sharp"}
        />

        {/* <Text>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
        /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: SECONDARY_COLOR,
              // height: 50,
              borderRadius: 12,
              width: "50%",
            }}
          >
            <Picker
              selectedValue={selectedCategory}
              style={{
                width: "auto",
                color: `${TEXT_GREY}`,
              }}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item
                style={{ fontSize: 12 }}
                label="Select Category"
                value={null}
              />
              {categories.length > 0 &&
                categories.map(
                  (category, index) =>
                    index > 0 && (
                      <Picker.Item
                        key={index}
                        label={category.name}
                        value={category.name}
                      />
                    )
                )}
            </Picker>
          </View>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View>
              <Ionicons
                name="calendar-sharp"
                size={24}
                color={`${TEXT_GREY}`}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <View>
              <Ionicons name="timer-outline" size={24} color={`${TEXT_GREY}`} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View>
              <Ionicons name="ios-list" size={24} color={`${TEXT_GREY}`} />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={deadline}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={deadline}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <TouchableOpacity onPress={handleAddTask}>
            <View
              style={{
                backgroundColor: `${SECONDARY_COLOR}`,
                borderRadius: 12,
                padding: 10,
                transform: [{ rotate: "270deg" }],
              }}
            >
              <Ionicons name="ios-send" size={28} color={`${PRIMARY_COLOR}`} />
            </View>
          </TouchableOpacity>
          {/* <Text>{deadline.toDateString()}</Text> */}
        </View>
        {/* <Button title="Add Category" onPress={() => setIsModalVisible(true)} /> */}

        {/* <Button title="Add Task" onPress={handleAddTask} /> */}
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputWithIcon
              onChangeText={setCategory}
              placeholder={"Enter Category"}
              iconName={"add"}
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <View
                  style={{
                    backgroundColor: `${SECONDARY_COLOR}`,
                    borderRadius: 12,
                    padding: 10,
                  }}
                >
                  <Ionicons name="ios-close" size={28} color={`#FC8787`} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCategory}>
                <View
                  style={{
                    backgroundColor: `${SECONDARY_COLOR}`,
                    borderRadius: 12,
                    padding: 10,
                  }}
                >
                  <Ionicons
                    name="ios-send"
                    size={28}
                    color={`${PRIMARY_COLOR}`}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
