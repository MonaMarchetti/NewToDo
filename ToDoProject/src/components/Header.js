import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles as GlobalStyles } from "../utils/styles";

export const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    height: 40,
    justifyContent: "center",
    alignContent: "center"
  },
  headerText: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: "800",
    textAlign: "center"
  }
});
