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
    bookinglist: []
  };
  renderRow = ({ item }) => (
    <BookingComponent data={item} onSelect = {(selection) => this._onSelect(selection)}/>
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

//   _update = (todo) => {
//     const checklistRef = firebase.database().ref("checklist");
//     checklistRef.push(todo);
//   };

  _onSelect = (selection) => {
    return;
  }

  _loadDatabase = () => {
    let eventList = firebase.database().ref("App/Events");
    eventList.on("value", snap => {
      var prenotazioni = [];
      snap.forEach(child => {
        if (child.val().IDorganizzatore == firebase.auth().currentUser.uid) {
          prenotazioni.push({
            IDevento: child.val().IDevento,
            agenzia: child.val().Agenzia,
            nomeEvento: child.val().NomeEvento,
            citta: child.val().Localita.Citta,
            provincia: child.val().Localita.Provincia,
            descrizioneBreve: child.val().DescrizioneBreve,
            descrizioneCompleta: child.val().DescrizioneCompleta,
            prezzo: child.val().Prezzo,
            difficolta: child.val().Difficolta,
            data: child.val().Data,
            orari: child.val().Orario,
            durata: child.val.Durata,
            immagineAgenzia: child.val().ImmagineAgenzia,
            immagineEvento: child.val().ImmagineEvento,
            idUtente: child.val().Prenotazioni.idUtente,
            // cognomeUtente: child.val().Prenotazioni.DatiUtente.cognome,
            // nomeUtente: child.val().Prenotazioni.DatiUtente.nome,
            // username: child.val().Prenotazioni.DatiUtente.username,
            // emailUtente: child.val().Prenotazioni.DatiUtente.email,
            // stato: child.val().Prenotazioni.STATO

          });
        }
      });
      this.setState({ bookinglist: prenotazioni })
    });
  }

  async componentWillMount() {
    await this._loadDatabase();
    console.log(this.state.bookinglist);
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.bookinglist}
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
    marginTop: 50,
    //alignItems: 'center',
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  }
});
