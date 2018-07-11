import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class BookingComponent extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <TouchableHighlight
          onPress={this.props.onToggle}
          underlayColor={TINT_COLOR}
        >
          {this.props.data.done ? (
            <MaterialIcons name="check-box" size={24} color={TINT_COLOR} />
          ) : (
            <MaterialIcons name="check-box-outline-blank" size={24} />
          )}
        </TouchableHighlight>

        <Text style={styles.text}> ciao </Text>
        <TouchableHighlight >
          <Ionicons
            size={28}
            color={TINT_COLOR}
            name="ios-information-circle-outline"
          />
        </TouchableHighlight>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginLeft: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginRight: 10,
    padding: 10
  },

  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10
  }
});
