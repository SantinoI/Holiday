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
  ActivityIndicator,
  TextInput,
  Image,
  ImageBackground,
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


export default class Home extends React.Component {
  state = {
    text: "",
    searchOption:"Città",
    errorMessage: null,
    address: null,
    location: null,
    loading: true,
    cardList: []/*       AGGIUNTA DELL'ARRAY NELLO STATE        */
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: " Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({location: location});
    let address = await Location.reverseGeocodeAsync(location.coords);
    this.setState({address: address });

    //console.log(location)
    console.log(address)
  };

  _loadDatabaseAsync = async request => {
    let eventList = firebase.database().ref("App/Events");
    eventList.on("value", snap => {
      var eventi = [];
      snap.forEach(child => {
        if (child.val().Localita.Provincia == this.state.address[0].city) {
          eventi.push({
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
            immagineEvento: child.val().ImmagineEvento
          });
        }
      });
      this.setState({ cardList: eventi });
    });
  };

  async componentWillMount() {
    this.setState({loading: true})
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    // Geolocation
    await this._getLocationAsync();
    //var location = "Messina";

    // Carico database in base all'utente
    await this._loadDatabaseAsync(this.state.address[0].city);

    this.setState({loading: false})
  }

  // Funzione che passa come parametro il contenuto della searchBar alla navigation quando viene premuto il button search
  _goToResult = item => {
    if (this.state.text != "")
      this.props.navigation.navigate("SearchResult", {
        request: item,
        searchOption: this.state.searchOption,
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
    {console.log(item);}
    return (
      <EventCard data={item} onFavorite={() => this._favorite(item)} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item}) }/> // LA PROP DATA DOVREBBE PASSARE I PARAMETRI DELLA LIST IN QUESTOFILE
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

  _searchOption = filter => {
    switch (filter) {
      case "Città" : this.setState({searchOption: "Città"}); break;
      case "Eventi" : this.setState({searchOption: "Eventi"}); break;
      case "Organizzatori" : this.setState({searchOption: "Organizzatori"}); break;
    }
  }
  /*************************/

  render() {
    if (this.state.loadingFont) {
      return <Expo.AppLoading />;
    }
    return (
      <ImageBackground
          source={require("../assets/palm.png")}
          style={{resizeMode: 'stretch'}}
        >
      <ScrollView >
        <View style={styles.searchContainer}>
          <View>
            <Image
              style={{width: 200, height: 200}}
              source={require("../assets/logo-round2.png")}
            />
          </View>
          
          <View style = {styles.buttonContainer} >
            <TouchableOpacity
                    style={this.state.searchOption === "Città" ? (styles.searchOptionSelect) : styles.searchOption}
                    activeOpacity={0.5}
                    onPress={() => this._searchOption("Città")}
                  >
                    <Text style={this.state.searchOption === "Città" ? (styles.optionTextSelect) : styles.optionText}>Città</Text>
            </TouchableOpacity>


            <TouchableOpacity
                    style={this.state.searchOption === "Eventi" ? (styles.searchOptionSelect) : styles.searchOption}
                    activeOpacity={0.5}
                    onPress={() => this._searchOption("Eventi")}
                  >
                    <Text style={this.state.searchOption === "Eventi" ? (styles.optionTextSelect) : styles.optionText}>Eventi</Text>
              </TouchableOpacity>

            <TouchableOpacity
                  style={this.state.searchOption === "Organizzatori" ? (styles.searchOptionSelect) : styles.searchOption}
                  activeOpacity={0.5}
                  onPress={() => this._searchOption("Organizzatori")}
                >
                  <Text style={this.state.searchOption === "Organizzatori" ? (styles.optionTextSelect) : styles.optionText}>Organizzatori</Text>
            </TouchableOpacity>

          </View>

          <SearchBar
            inputStyle={{ backgroundColor: "rgb(233,233,238)", }}
            containerStyle={styles.searchBar}
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
              <Text style={{ color: "white" }}> Cerca </Text>
            </TouchableOpacity>
          </View>
        </View>

      

        {this.state.loading ? 
        (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size="large" color={TINT_COLOR} />
          </View>
        ) :
        (
          this.state.cardList.length ? 
            (
            <View>
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
            </View>
            ) :
            ( 
              <Text style={styles.noResultText}>Sembra che non ci siano eventi nelle vicinanze :(</Text>
            )
        )}
      </ScrollView>
    </ImageBackground>
    );
  }
}



Home.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
  };
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "column",
    alignItems: "center",
    //marginTop: Dimensions.get("window").height / 2 - 150
    marginTop: 80
  },
  buttonContainer: {

    flexDirection: "column",
    //alignItems: "center",
  },
  searchBar: {
    backgroundColor: "rgb(233,233,238)",
    borderTopColor: "rgb(233,233,238)",
    borderRadius: 30,
    borderBottomWidth:0,
    width: (Dimensions.get("window").width * 90)/ 100
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
    borderRadius: 30
  },
  searchOption: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: TINT_COLOR,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: BACKGROUND_COLOR,
  },

  searchOptionSelect: {
    paddingTop: 10,
    paddingBottom: 10,
    padding: 15,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#bde26c",
    backgroundColor: TINT_COLOR,
  },
  optionText: {
    color: TINT_COLOR,
    textAlign: "center"
  },
  optionTextSelect: {
    color: "white",
    textAlign: "center"
  },

  scrolltext: {
    marginTop: (Dimensions.get("window").height / 2 - 200)*110/100,
    marginBottom: 0,
    alignItems: "center",
    backgroundColor: TINT_COLOR,
    borderWidth: 1,
    borderColor: "#b4fb7f"
  },

  noResultText: {
    color: BACKGROUND_COLOR,
    marginTop: '50%',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: TINT_COLOR,
    borderWidth: 1,
    borderColor: "#bde26c",
  }
});
