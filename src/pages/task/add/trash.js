import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
// import { Picker } from "@react-native-picker/picker";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "react-native-bottom-sheet";
// import DatePicker from "react-native-datepicker"; // Import date picker
import { db, auth } from "../../../../firebaseConfig";
import { addCurrentTask } from "../../../services/firebase"; // Sesuaikan dengan path file yang sesuai

export const AddTaskScreen = ({
  bottomSheetVisible,
  setBottomSheetVisible,
}) => {
  // "react-native-bottom-sheet": "^1.0.3",
  const firestore = db;
  const getCurrentUserId = () => auth.currentUser.uid;
  // const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const userId = getCurrentUserId();

  // Mendapatkan daftar kategori pengguna
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

  const handleAddTask = async () => {
    if (!title.trim() || !selectedCategory) {
      alert("Title and category are required");
      return;
    }

    try {
      // Memanggil fungsi untuk menambahkan tugas
      const taskId = await addCurrentTask(
        {
          title,
          description,
          deadline,
          // tambahkan properti lain sesuai kebutuhan
        },
        selectedCategory
      );

      // Reset formulir setelah menambahkan tugas
      setTitle("");
      setDescription("");
      // setDeadline(new Date());
      setSelectedCategory(null);

      // Menampilkan pesan atau navigasi ke halaman tugas setelah menambahkan tugas
      alert(`Task added successfully with ID: ${taskId}`);

      // Menutup Bottom Sheet setelah menambahkan tugas
      setBottomSheetVisible(false);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <View>
      <BottomSheetModal
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
      >
        <BottomSheetScrollView>
          <Text>Title:</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />

          <Text>Description:</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
          />

          <Text>Deadline:</Text>
          {/* Komponen date picker */}
          {/* <DatePicker
            style={{ width: 200 }}
            date={deadline}
            mode="datetime"
            placeholder="Select date and time"
            format="YYYY-MM-DD HH:mm"
            minDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... other custom styles
            }}
            onDateChange={(date) => setDeadline(date)}
          /> */}

          <Text>Category:</Text>
          {/* Tambahkan komponen untuk memilih kategori, misalnya dropdown atau picker */}
          {/* Contoh dropdown sederhana */}
          {/* <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {categories.map((categoryId) => (
              <Picker.Item
                key={categoryId}
                label={categoryId}
                value={categoryId}
              />
            ))}
          </Picker> */}

          <Button title="Add Task" onPress={handleAddTask} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

// export default AddTaskScreen;
