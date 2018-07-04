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
    logged: false
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ logged: true });
        this._loadDatabase();
        //this.props.navigation.setParams({ logged: true })
      } else {
        this.setState({ logged: false });
        //this.props.navigation.setParams({ logged: false })
        this.props.navigation.navigate("Login");
      }
    });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ logged: true });
        this._loadDatabase();
        //this.props.navigation.setParams({ logged: true })
      } else {
        this.setState({ logged: false });
        //this.props.navigation.setParams({ logged: false })
        this.props.navigation.navigate("Login");
      }
    });
  }
  _loadDatabase = async => {
    const user = firebase.auth().currentUser;
    if (user) {
      var uid = user.uid;
      firebase
        .database()
        .ref("App/Users/" + uid + "/favorites")
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
              immagineEvento: child.val().ImmagineEvento
            });
          });
          this.setState({ cardList: favoritelist });
        });
    }
  };
  renderCard = ({ item }) => (
    <EventCard
      data={item}
      onFavorite={() => this._favorite(item)}
      onEventPress={() =>
        this.props.navigation.navigate("EventPage", { eventInfo: item })
      }
    />
  );

  _keyExtractor = (item, index) => {
    item.id = index;
    String(index);
  };

  renderLog() {
    return (
      <View
        style={{
          backgroundColor: BACKGROUND_COLOR,
          paddingBottom: (80 * 110) / 100,
          flex: 1
        }}
      >
        <ScrollView style={{ backgroundColor: BACKGROUND_COLOR }}>
          <FlatList
            data={this.state.cardList}
            renderItem={this.renderCard}
            keyExtractor={this._keyExtractor}
          />
        </ScrollView>
      </View>
    );
  }

  renderNotLog() {
    return (
      <View
        style={{
          backgroundColor: BACKGROUND_COLOR,
          paddingBottom: (80 * 110) / 100,
          flex: 1
        }}
      >
        <Text style={styles.noResultText}>
          Effettua prima il login per visualizzare i preferiti
        </Text>
      </View>
    );
  }

  render() {
    return this.state.logged ? this.renderLog() : this.renderNotLog();
  }
}

Favorites.navigationOptions = ({ navigation }) => {
  return {
    title: "Favorites",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    }
  };
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  searchBar: {
    backgroundColor: "rgb(233,233,238)",
    borderTopColor: "rgb(233,233,238)",
    borderRadius: 30,
    borderBottomWidth: 0,
    width: (Dimensions.get("window").width * 90) / 100
  },
  noResultText: {
    color: TINT_COLOR,
    marginTop: "50%",
    fontSize: 20,
    textAlign: "center"
  }
});
