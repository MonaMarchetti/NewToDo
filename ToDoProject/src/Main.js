import React from "react";
import {
  StatusBar,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  AsyncStorage
} from "react-native";
import { styles as GlobalStyles } from "./utils/styles";
import { Header } from "./components/Header";
import Todos from "./components/Todos/Todos";
const TODO_STORAGE_KEY = "TODO_STORAGE_KEY";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.loadTodos();
    //this.deleteKeys();
  }

  state = {
    todo: "",
    inputError: false,
    loading: true,
    todos: []
  };

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      this.setState({
        todos: JSON.parse(todos) || [],
        loading: false
      });
    } catch (e) {
      console.log("Error getting Todo Items >", e);
    }
  };

  save = async () => {
    try {
      AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(this.state.todos));
    } catch (e) {
      console.log("Error while storing Todo Items >", e);
    }
  };

  deleteKeys = async () => {
    try {
      const todos = await AsyncStorage.removeItem(TODO_STORAGE_KEY);
      this.seState({
        todos: JSON.parse(todos) || [],
        loading: false
      });
    } catch (e) {
      console.log("Error while deleting Todo Keys >", e);
    }
  };

  addTodo = () => {
    if (this.state.todo.length === 0) {
      this.setState({ inputError: true });
      return;
    }
    const todos = this.state.todos;
    const todo = {
      title: this.state.todo,
      completed: false,
      createdOn: Date.now(),
      notes: "",
      dueDate: null,
      remindMe: false,
      completedOn: null
    };
    const addedTodos = todos.concat([todo]);
    this.setState({ todos: addedTodos, todo: "" });
    this.save();
  };

  checkBoxToggle = i => {
    const todos = this.state.todos;
    const checkedTodos = todos.map((todo, j) => {
      if (j === i) {
        const newCompleted = !todo.completed;
        const newCompletedOn = todo.completed ? Date.now() : null;
        return {
          ...todo,
          completed: newCompleted,
          completedOn: newCompletedOn
        };
      } else {
        return todo;
      }
    });
    this.setState({ todos: checkedTodos });
    this.save();
  };

  onDeleteAction = deletedIndex => {
    const todos = this.state.todos;
    const remainingTodos = todos.filter((todo, index) => index != deletedIndex);
    this.setState({ todos: remainingTodos });
    this.save();
  };

  render() {
    return (
      <View style={{ flex: 1 }} backgroundColor={"#000000"}>
        <StatusBar barStyle="light-content" />
        <Header title="Todo App" />
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="sentences"
            placeholder="What needs to be done?"
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            onChangeText={todo => this.setState({ todo })}
            blurOnSubmit={false}
            onSubmitEditing={this.addTodo}
            value={this.state.todo}
          />
          <View style={styles.todosWrp}>
            <View style={styles.listHeaderWrp}>
              <Text style={styles.listHeader}>Your Todos</Text>
            </View>
            <ScrollView>
              <Todos
                todos={this.state.todos}
                checkBoxToggle={this.checkBoxToggle}
                onDelete={this.onDeleteAction}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  textInput: {
    color: GlobalStyles.fontColor,
    fontSize: 28,
    fontStyle: "italic"
  },
  listHeaderWrp: {
    marginBottom: 10
  },
  listHeader: {
    fontSize: GlobalStyles.fontSize,
    color: "rgba(255, 255, 255, 0.7)"
  },
  todosWrp: {
    marginTop: 20
  }
});
