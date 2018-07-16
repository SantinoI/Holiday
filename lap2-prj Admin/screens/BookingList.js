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
const BACKGROUND_COLOR = "#d7e4e5";


StatusBar.setBarStyle("light-content");

export default class BookingList extends React.Component {
  state = {
    bookinglist: []
  };
  renderRow = ({ item }) => (
    <BookingComponent data={item} onSelect = {(selection) => this._onSelect(item, selection)}/>
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

  _update = (todo) => {
    const checklistRef = firebase.database().ref("checklist");
    checklistRef.push(todo);
  };

  _onSelect = (item, selezione) => {
    var eventContactsRef = firebase.database().ref('App/Prenotazioni');
    var query = eventContactsRef.orderByChild('IDcliente').equalTo(item.IDcliente);
    query.on('child_added', function(snapshot) {
      if (snapshot.val().IDevento == item.IDevento) {
          snapshot.ref.update({Stato: selezione});
      }
    })

  }

  _loadDatabase = () => {
    firebase.database().ref("App/Prenotazioni").on("value", snap => {
      var prenotazioni = [];
      snap.forEach(child => {
        if (child.val().IDorganizzatore == firebase.auth().currentUser.uid) {
          prenotazioni.push({
            IDevento: child.val().IDevento,
            IDcliente: child.val().IDcliente,
            IDorganizzatore: child.val().IDorganizzatore,

            agenzia: child.val().DatiOrganizzatore.Agenzia,
            numero: child.val().DatiOrganizzatore.Numero,
            immagineAgenzia: child.val().DatiOrganizzatore.ImmagineAgenzia,

            nomeEvento: child.val().DatiEvento.NomeEvento,
            citta: child.val().DatiEvento.localita.Citta,
            provincia: child.val().DatiEvento.localita.Provincia,
            descrizioneBreve: child.val().DatiEvento.DescrizioneBreve,
            descrizioneCompleta: child.val().DatiEvento.DescrizioneCompleta,
            prezzo: child.val().DatiEvento.Prezzo,
            data: child.val().DatiEvento.Data,
            orari: child.val().DatiEvento.Orario,
            immagineEvento: child.val().DatiEvento.ImmagineEvento,

            cognome: child.val().DatiUtente.cognome,
            email: child.val().DatiUtente.email,
            nome: child.val().DatiUtente.nome,
            username: child.val().DatiUtente.username,

            stato: child.val().Stato
          });
        }
      });
      this.setState({ bookinglist: prenotazioni })
      //console.log(this.state.bookinglist);
    });
  }

  async componentWillMount() {
    this._loadDatabase();
    //console.log(this.state.bookinglist);
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
    backgroundColor: BACKGROUND_COLOR
  }
});
