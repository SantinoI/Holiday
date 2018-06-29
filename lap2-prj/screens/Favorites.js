import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";


const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class Favorites extends React.Component {
    state = {
      cardList: [],
      logged: true
    }

    _loadDatabase = async => {
      const uid = firebase.auth().currentUser.uid;
    //const uid = "Fq1m5IHnZePsbbu19qzAaqAvmFm2";
    console.log(uid);
    this.uid = uid;
    if (uid) {
      firebase
        .database()
        firebase.database().ref("App/Users/" + uid + "/favorites")
        .on("value", snap => {
          let favoritelist = [];
          snap.forEach(child => {
            favoritelist.push({
              IDevento: child.val().IDevento,
              agenzia: child.val().Agenzia,
              email: child.val().Email,
              numero: child.val().Numero,
              facebook: child.val().Facebook,
              nomeEvento: child.val().NomeEvento,
              citta: child.val().Localita.Citta,
              provincia: child.val().Localita.Provincia,
              descrizioneBreve: child.val().DescrizioneBreve,
              descrizioneCompleta: child.val().DescrizioneCompleta,
              prezzo: child.val().Prezzo,
              difficolta: child.val().Difficolta,
              data: child.val().Data,
              orario: child.val().Orario,
              durata: child.val().Durata,
              immagineAgenzia: child.val().ImmagineAgenzia,
              immagineEvento: child.val().ImmagineEvento,
            });
          });
          this.setState({ cardList: favoritelist });
        });
    }
    }

    render() {
      return(
        <View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex: 1}}>
          <ScrollView style={{backgroundColor:BACKGROUND_COLOR}}>
            {/* Visualizza FlatList solo se cardList[] > 0 */}

            {this.state.logged == true ? (
              this.state.cardList.length ? (
                <FlatList
                  data={this.state.cardList}
                  renderItem={this.renderCard}
                  keyExtractor={this._keyExtractor}
                />) :
                (<Text style={styles.noResultText}>Nessun Evento tra i preferiti :( </Text>)
            ) :
             (<Text style={styles.noResultText}> Non sei loggato </Text>)}

            
          </ScrollView>
        </View>
        
      );
    }
}

Favorites.navigationOptions = ({ navigation }) => {
    return {
      title: "Favorites",
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome
            style={{ paddingHorizontal: 15 }}
            name="user-circle"
            size={34}
            color={TINT_COLOR}
          />
        </TouchableOpacity>
      )
    };
  };

  const styles = StyleSheet.create({
    searchContainer: {
      backgroundColor: BACKGROUND_COLOR,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    searchBar: {
      backgroundColor: "rgb(233,233,238)",
      borderTopColor: "rgb(233,233,238)",
      borderRadius: 30,
      borderBottomWidth:0,
      width: (Dimensions.get("window").width * 90)/ 100
    },
    noResultText: {
      color: TINT_COLOR,
      marginTop: '50%',
      fontSize: 20,
      textAlign: 'center'
    }
});
