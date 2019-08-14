import React from "react";
import { Text, StyleSheet } from "react-native";
import Todo from "./Todo";
import { styles as GlobalStyles } from "../../utils/styles";

const Todos = props => {
  if (!props.todos.length) {
    return <Text style={styles.noTodo}>No TODOs</Text>;
  }
  const TodoList = props.todos.map((item, index) => {
    return (
      <Todo
        key={index}
        index={index}
        title={item.title}
        completed={item.completed}
        checkBoxToggle={props.checkBoxToggle}
        onDelete={props.onDelete}
      />
    );
  });
  return TodoList;
};

const styles = StyleSheet.create({
  noTodo: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: "bold"
  }
});

export default Todos;
