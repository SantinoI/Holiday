import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ImageBackground,
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

import BookCard from "../components/BookCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

export default class SearchResult extends React.Component {
  state = {
    cardList: [],
    loading: false,
  };

  _loadBookings = async request => {
    const user = firebase.auth().currentUser;
    if (user) {
      //console.log(user.uid);
      let uid = user.uid;
      //console.log(path)
      let eventList = firebase.database().ref("App/Prenotazioni");
      eventList.on("value", snap => {
        //var date = [];
        var prenotazioni = [];
        snap.forEach(child => {
          if (child.val().IDcliente == uid) {
            //console.log("ci siamo");
            //date.push(child.val().DatiEvento.Data)

            prenotazioni.push({
              IDevento: child.val().IDevento,
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
              orario: child.val().DatiEvento.Orario,
              immagineEvento: child.val().DatiEvento.ImmagineEvento,

              cognome: child.val().DatiUtente.cognome,
              nome: child.val().DatiUtente.nome,
              email: child.val().DatiUtente.email,
              username: child.val().DatiUtente.username,

              stato: child.val().Stato
            });
          }
        });

        this.setState({ cardList: prenotazioni });
        //this.setState({dates: date});
        console.log(this.state.cardList);
       // console.log(this.state.dates);
      });
    }
  };
  async componentDidMount(){
    await this._loadBookings();

  }


  renderCard = ({item}) => (
    <BookCard data={item} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item})}
     onManagerPress={() => this.props.navigation.navigate("ManagerPage", {managerInfo: item.agenzia})}/>
  )

  _favorite = item => {
    const newCardlist = this.state.cardList.map(
      currentCard =>
        currentCard === item
          ? { ...currentCard, favorite: !currentCard.favorite }
          : currentCard
    );
    //this.uploadFavorite(item);
    this.setState({ cardList: newCardlist });
  };

  _keyExtractor = (item, index) => {
    //item.id = index;
    return String(index);
  };


  render() {
    return (
      <ScrollView style={{backgroundColor: BACKGROUND_COLOR}}>
              {/* {this.state.loading ? 
            (
              <ActivityIndicator size="large" color={TINT_COLOR} />
            ) :
            ( */}
        {this.state.cardList.length ? (
          <FlatList
            data={this.state.cardList}
            renderItem={this.renderCard}
            keyExtractor={this._keyExtractor}
            />
          ) :
          (
          <Text style={styles.noResultText}>Non hai ancora effettuato nessuna prenotazione</Text>
          )
        }
      </ScrollView>

    );
  }   
}

SearchResult.navigationOptions = ({ navigation }) => {
  return {
    title: "Risultati",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
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
