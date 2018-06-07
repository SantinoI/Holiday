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
  StatusBar,
  Dimensions,
  Alert
} from "react-native";
import { Permissions, Location, Font, Constants } from "expo";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

StatusBar.setHidden(true);
StatusBar.setBarStyle("light-content");

/*       CARDLIST ARRAY         */

const cardListArray = [
  {
    nomeEvento: "Escursione Monte Calanducci",
    agenzia: "Tele-Truffa",
    immagineEvento:
      "https://firebasestorage.googleapis.com/v0/b/lap2-prj-v2.appspot.com/o/egyptian.png?alt=media&token=3c54fa48-57d4-46f7-8398-f287583ec269",
    localitaEvento: "Unknow",
    prezzoEvento: "10000$",
    descrizioneEvento: "Alla ricerca delle merdate Calanducciane ",
    favorite: false
  },
  {
    nomeEvento: "Evento1",
    agenzia: "agenzia1",
    immagineEvento: "../assets/image.png",
    localitaEvento: "località1",
    descrizioneEvento: "aaaaaaaaaaaaaaaaaaaaa",
    favorite: false
  },
  {
    nomeEvento: "Evento1",
    agenzia: "agenzia1",
    immagineEvento: "../assets/image.png",
    localitaEvento: "località1",
    descrizioneEvento: "Questa è una breve descrizione",
    favorite: false
  },
  {
    nomeEvento: "Evento1",
    agenzia: "agenzia1",
    immagineEvento: "../assets/image.png",
    localitaEvento: "località1",
    descrizioneEvento: "Questa è una breve descrizione",
    favorite: false
  }
];

export default class Home extends React.Component {
  state = {
    text: "",
    errorMessage: null,
    address: null,
    location: null,
    loadingFont: true,
    cardList: cardListArray/*       AGGIUNTA DELL'ARRAY NELLO STATE        */
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: " Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    let address = await Location.reverseGeocodeAsync(location.coords);
    this.setState({ address });
  };

  _loadDatabaseAsync = async => {
    let eventList = firebase.database().ref("App/Events");
    eventList.on("value", snap => {
      var eventi = [];
      snap.forEach(child => {
        if (child.val().Place.City == this.state.address[0].city) {
          eventi.push({
            nomeEvento: child.val().Title,
            localita: this.state.address[0].city,
            agenzia: child.val().Manager,
            descrizione: child.val().Description,
            prezzo: child.val().Price
          });
        }
      });
      this.setState({ cardList: eventi });
    });
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadingFont: false });

    // Geolocation
    await this._getLocationAsync();

    this.setState({ cardList: cardListArray });
    //var location = "Messina";

    // Carico database in base all'utente
    await this._loadDatabaseAsync();
  }

  // Funzione che passa come parametro il contenuto della searchBar alla navigation quando viene premuto il button search
  _goToResult = item => {
    if (this.state.text != "")
      this.props.navigation.navigate("SearchResult", {
        request: item
      });
    else {
      Alert.alert(
        "Non posso effettuare la ricerca",
        "Inserisci cosa vuoi cercare"
      );
    }
  };

  /*       FUNZIONE PER IL RENDERING DI CIASCUNA CARD DELLA FLATLIST          */

  renderCard = ({ item }) => {
    {
      console.log(item);
    }
    return (
      <EventCard data={item} onFavorite={() => this._favorite(item)} /> // LA PROP DATA DOVREBBE PASSARE I PARAMETRI DELLA LIST IN QUESTOFILE
      // AI TEXT IN OUTPUT NEL FILE EVENTCARD
    );
  };

  _keyExtractor = (item, index) => {
    item.id = index;
    String(index);
  };

  /* CALL BACK PER EVENT CARD */
  _favorite = item => {
    const newCardlist = this.state.cardList.map(
      currentCard =>
        currentCard === item
          ? { ...currentCard, favorite: !currentCard.favorite }
          : currentCard
    );
    this.setState({ cardList: newCardlist });
  };
  /*************************/

  render() {
    if (this.state.loadingFont) {
      return <Expo.AppLoading />;
    }
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <SearchBar
            inputStyle={{ backgroundColor: "rgb(233,233,238)" }}
            containerStyle={styles.searchBar}
            placeholderTextColor={"#g5g5g5"}
            placeholder={"Scrivi qui"}
            onChangeText={value => this.setState({ text: value })}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.5}
              onPress={() => this._goToResult(this.state.text)}
              title="Trova Escursioni"
            >
              <Text style={{ color: "white" }}> Trova Escursioni </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scrolltext}>
          <Text style={{ color: TINT_COLOR, fontSize: 20 }}>
            Scorri per i risultati nelle vicinanze
          </Text>
          <Feather name="chevron-up" size={24} color={TINT_COLOR} />
        </View>

        <View>
          <FlatList // VISTUALIZZO LA FLATLIST
            data={this.state.cardList}
            renderItem={this.renderCard}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </ScrollView>
    );
  }
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
    },
    headerRight: (
      <TouchableOpacity>
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
    flexDirection: "column",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 2 - 150
  },

  searchBar: {
    backgroundColor: "rgb(233,233,238)",
    borderTopColor: "rgb(233,233,238)",
    width: 250
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "center"
  },

  searchButton: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    padding: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: TINT_COLOR,
<<<<<<< HEAD
    borderRadius: 30
=======
    borderRadius:25,
    
>>>>>>> af15ce5c41f46f7bdf1ca0f48c2c8ed52b0e6f64
  },

  scrolltext: {
    marginTop: Dimensions.get("window").height / 2 - 80,
    alignItems: "center",
    borderColor: "red"
  }
});
