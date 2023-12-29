import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import HeaderShown from "../../components/headerpage/Headerpage";
import { useNavigation } from "@react-navigation/native";
import { deleteTask, updateTask } from "../../services/firebase";
import { MenuOption } from "react-native-popup-menu";
import { CategoryContext } from "../../contexts/Category";
import { db, auth, firebase } from "../../../firebaseConfig";
import { SECONDARY_COLOR, TEXT_GREY } from "../../components/color/Color";
import InputWithIcon from "../../components/input/Input";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const firestore = db;

const Detail = ({ route }) => {
  console.log("Route :", route.params);
  const getCurrentUserId = () => auth.currentUser.uid;
  const userId = getCurrentUserId();
  const navigation = useNavigation();
  const {
    id,
    title: initialTitle,
    description: initialDescription,
    deadline: initialDeadline,
    categoryId: initialCategoryId,
    isDone: initialIsDone,
  } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [deadline, setDeadline] = useState(
    new Date(initialDeadline.seconds * 1000)
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [categories, setCategory] = useContext(CategoryContext);
  const [isDone, setIsDone] = useState(initialIsDone);

  const onChangeDate = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || deadline;
      setShowDatePicker(false);
      setDeadline(currentDate);
    },
    [deadline]
  );

  const onChangeTime = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || deadline;
      setShowTimePicker(false);
      setDeadline(currentDate);
    },
    [deadline]
  );

  const toggleDone = () => {
    setIsDone(!isDone);
  };

  const handleDeleteTask = useCallback(
    async (id) => {
      try {
        deleteTask(id);
        navigation.goBack();
        alert("Task deleted");
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }
    },
    [navigation]
  );

  console.log("deadline", isDone);

  useEffect(() => {
    updateTask(id, { title, description, deadline, categoryId, isDone });
  }, [title, description, deadline, categoryId, isDone]);

  // const handleUpdateTask = useCallback(
  //   async (id) => {
  //     try {
  //       const updatedTask = {
  //         title,
  //         description,
  //         deadline,
  //         categoryId,
  //       };
  //       await updateTask(id, updatedTask);
  //       navigation.goBack();
  //     } catch (error) {
  //       console.error("Error updating task:", error.message);
  //     }
  //   },
  //   [title, description, deadline, categoryId, navigation]
  // );

  const pickerItems = useMemo(
    //useMemo untuk menghindari re-rendering yang tidak perlu / tidak perlu dijalankan ulang ketika ada perubahan state
    () =>
      categories.length > 0 &&
      categories.map(
        (item, index) =>
          index > 0 && (
            <Picker.Item key={index} label={item.name} value={item.name} />
          )
      ),
    [categories]
  );

  return (
    <>
      <HeaderShown
        label={"TaskTracker"}
        showHeart
        Option={
          <>
            <MenuOption onSelect={() => handleDeleteTask(id)} text="Delete" />
          </>
        }
      />
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: SECONDARY_COLOR,
                // height: 50,
                marginTop: 10,
                borderRadius: 12,
                width: "100%",
              }}
            >
              <Picker
                selectedValue={categoryId}
                style={{
                  width: "auto",
                  color: `${TEXT_GREY}`,
                }}
                onValueChange={(itemValue) => setCategoryId(itemValue)}
              >
                <Picker.Item
                  style={{ fontSize: 16 }}
                  label="Select Category"
                  value={null}
                />
                {pickerItems}
              </Picker>
            </View>
            <TextInput
              value={title}
              multiline={true}
              numberOfLines={4}
              onChangeText={setTitle}
              style={{
                fontSize: 24,
                fontWeight: "500",
                marginVertical: 20,
                color: "#222222",
                height: 150,
              }}
              placeholder="Enter task title"
            />

            <InputWithIcon
              iconName="newspaper-outline"
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
            <TouchableOpacity
              style={{
                width: "100%",
              }}
              onPress={() => toggleDone()}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="checkmark-done-outline"
                    size={24}
                    color={`${TEXT_GREY}`}
                  />
                  <Text
                    style={{
                      color: `${TEXT_GREY}`,
                      fontSize: 14,
                      marginLeft: 10,
                    }}
                  >
                    Task
                  </Text>
                </View>
                <Text
                  style={{
                    color: `${TEXT_GREY}`,
                    fontSize: 12,
                  }}
                >
                  {isDone ? "Done" : "Not Done"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="calendar-sharp"
                    size={24}
                    color={`${TEXT_GREY}`}
                  />
                  <Text
                    style={{
                      color: `${TEXT_GREY}`,
                      fontSize: 14,
                      marginLeft: 10,
                    }}
                  >
                    Date
                  </Text>
                </View>
                <Text
                  style={{
                    color: `${TEXT_GREY}`,
                    fontSize: 12,
                  }}
                >
                  {deadline.toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 8,
                  paddingHorizontal: 12,

                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="timer-outline"
                    size={24}
                    color={`${TEXT_GREY}`}
                  />
                  <Text
                    style={{
                      color: `${TEXT_GREY}`,
                      fontSize: 14,
                      marginLeft: 10,
                    }}
                  >
                    Time
                  </Text>
                </View>
                <Text
                  style={{
                    color: `${TEXT_GREY}`,
                    fontSize: 12,
                  }}
                >
                  {deadline.toLocaleTimeString()}
                </Text>
              </View>
            </TouchableOpacity>

            {/* <Text>Deadline:</Text>
            <Button
              title="Select Date"
              onPress={() => setShowDatePicker(true)}
            /> */}
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

            {/* <Button title="Save" onPress={() => handleUpdateTask(id)} /> */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({});
