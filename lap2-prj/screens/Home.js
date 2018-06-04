import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Permissions, Location } from "expo";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { Font } from "expo";

import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

/*       CARDLIST ARRAY         */

const cardListArray = [
  {
    nomeEvento: "Evento1",
    localita: "località1",
    agenzia: "agenzia1",
    favorite: false
  },
  {
    nomeEvento: "Evento2",
    localita: "località2",
    agenzia: "agenzia2",
    favorite: false
  },
  {
    nomeEvento: "Evento3",
    localita: "località3",
    agenzia: "agenzia3",
    favorite: true
  },
  {
    nomeEvento: "Evento4",
    localita: "località4",
    agenzia: "agenzia4",
    favorite: false
  }
];

export default class Home extends React.Component {
  state = {
    text: "",
    address: "",
    location: "",
    loadingFont: true,
    cardList: cardListArray /*       AGGIUNTA DELL'ARRAY NELLO STATE        */
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadingFont: false });

    /*let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert("You need to enable the GPS and authorize it");
        return;
      }else{
        let location = await Location.getCurrentPositionAsync();
        console.log(location);
        this.setState({ location: location.coords, isMapVisible: true });
        let address = await Location.reverseGeocodeAsync(location.coords);
        this.setState({
          address: address[0].city + ", " + address[0].name
        });
        console.log(address);
      }*/
    this.setState({ cardList: cardListArray });
  }

  // Funzione che passa come parametro il contenuto della searchBar alla navigation quando viene premuto il button search
  _goToResult = item => {
    this.props.navigation.navigate("SearchResult", {
      request: item
    });
  };

  /*       FUNZIONE PER IL RENDERING DI CIASCUNA CARD DELLA FLATLIST          */

  renderCard = ({ item }) => (
    <EventCard data={item} onFavorite={() => this._favorite(item)} /> // LA PROP DATA DOVREBBE PASSARE I PARAMETRI DELLA LIST IN QUESTOFILE
    // AI TEXT IN OUTPUT NEL FILE EVENTCARD
  );

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
            containerStyle={styles.searchBar}
            onChangeText={value => this.setState({ text: value })}
            lightTheme
            showLoading
            searchIcon={true}
            placeholder="Type Here..."
            Platform={Platform.OS === "ios" ? "ios" : "android"}
            cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
          />
          <Button
            style={{ marginTop: 10 }}
            // loading = {this.state.isLoading}
            raised
            backgroundColor={TINT_COLOR}
            title="Trova Escursioni"
            onPress={() => this._goToResult(this.state.text)} // Ricerca
          />
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
    headerStyle: {}
  };
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 150,
    backgroundColor: "#ecf0f1",
    borderWidth: 1
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white"
  },
  scrolltext: {
    marginTop: 300,
    marginBottom: 150,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1
  }
});
