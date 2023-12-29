import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { PRIMARY_COLOR, TERTIARY_COLOR, TEXT_GREY } from "../color/Color";

const CardTask = ({ tasks, setIsDone, handleTaskDone, navigate }) => {
  return (
    <View>
      {tasks.map((task, index) => (
        <TouchableOpacity
          key={index}
          style={styles.taskContainer}
          onPress={() =>
            navigate.navigate("Detail", {
              id: task.id,
              title: task.title,
              description: task.description,
              deadline: task.deadline,
              categoryId: task.categoryId,
              isDone: task.isDone,
            })
          }
        >
          <Checkbox
            style={{
              alignSelf: "flex-start",
              marginTop: 10,
              marginRight: 18,
              borderRadius: 100,
            }}
            value={task.isDone}
            onValueChange={(newValue) => {
              setIsDone(newValue);
              handleTaskDone(task.id, newValue);
            }}
            color={task.isDone ? PRIMARY_COLOR : TEXT_GREY}
          />
          <View>
            <Text
              style={{
                textDecorationLine: task.isDone ? "line-through" : "none",
                color: "#222222",
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {task.title}
            </Text>
            <Text
              style={{
                color: TEXT_GREY,
                fontSize: 12,
              }}
            >
              {task.deadline.toDate().toLocaleDateString("en-GB")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: TERTIARY_COLOR,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 5,
    marginTop: 10,
  },
});
