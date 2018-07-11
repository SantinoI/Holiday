import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Button
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import BookingComponent from "../components/BookingComponent";
import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

StatusBar.setBarStyle("light-content");

const todolist = [
  { text: "Buy the milk", done: false },
  { text: "Submit the app", done: false },
  { text: "Write an article", done: true },
  { text: "Walk the dog", done: false },
  { text: "Go shopping on Amazon", done: false },
  { text: "Wash the dish", done: false },
  { text: "Call Steve", done: false },
  { text: "Call Ray", done: false },
  { text: "Buy a present to Antonio", done: false }
];

export default class BookingList extends React.Component {
  state = {
    todolist: todolist || []
  };
  renderRow = ({ item }) => (
    <BookingComponent data={item} onToggle = {() => this._toggle(item)}/>
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

//   _update = (todo) => {
//     const checklistRef = firebase.database().ref("checklist");
//     checklistRef.push(todo);
//   };

  _toggle = (item) => {
    const newTodoList = this.state.todolist.map(
      currentTodo => (currentTodo === item ? {...currentTodo, done: !currentTodo.done} : currentTodo)
    )
    this.setState({todolist: newTodoList});
  }

  componentDidMount() {
    // const checklist = firebase.database().ref("checklist");
    // checklist.on("value", snap => {
    //   console.log(snap);
    //   var elenco = [];
    //   snap.forEach(child => { 
    //     //if (child.val().text == "buy the milk"){
    //       elenco.push({
    //         done: child.val().done,
    //         text: child.val().text,
    //         shouldremind: child.val().shouldremind,
    //       })
    //     //}
    //   })
    //   console.log(elenco);
    //   this.setState({todolist: elenco});
    // })
    // creo nei parametri della navigation onAdd
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todolist}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

BookingList.navigationOptions = ({ navigation }) => {
    return {
        title: "Lista Prenotazioni",
        headerStyle: {
          backgroundColor: "white",
          borderBottomWidth: 0
        },
  
        headerLeft: null,
  
        // headerRight: (
        //   <TouchableOpacity onPress={() => navigation.navigate("NewEventPage")}>
        //       <MaterialIcons style={{marginRight: 30}} name='add-circle-outline' size={30} color={TINT_COLOR}/>
        //   </TouchableOpacity>
        // )
      };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  }
});
