import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Todo = props => {
  const titleStyle = props.completed
    ? [styles.todoTitle, styles.titleComplete]
    : [styles.todoTitle];
  const checkStyle = props.completed
    ? [styles.checkedTodo]
    : [styles.uncheckedTodo];

  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={_ => props.checkBoxToggle(props.index)}>
        <Text style={checkStyle}>Check</Text>
      </TouchableOpacity>

      <Text style={titleStyle}>{props.title}</Text>
      {props.completed && (
        <TouchableOpacity onPress={_ => props.onDelete(props.index)}>
          <Text style={styles.deleteIcon}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowOffset: { height: 2, width: 0 },
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    elevation: 5,
    position: "relative"
  },
  checkBoxIcon: {
    fontSize: 22
  },
  todoTitle: {
    fontSize: 18,
    paddingLeft: 15,
    width: "80%"
  },
  titleComplete: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  deleteIcon: {
    color: "red",
    right: 10
  },
  checkedTodo: {
    color: "green"
  },
  uncheckedTodo: {
    color: "gray"
  }
});

export default Todo;
