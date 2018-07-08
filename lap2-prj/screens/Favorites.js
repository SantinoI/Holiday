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
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";

import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Container,
  Button
} from "native-base";

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar } from "react-native-elements";

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
      } else {
        this.setState({ logged: false });
        //this.props.navigation.navigate("Login");
      }
    });
  }
  _loadDatabase = async => {
    const user = firebase.auth().currentUser;
    if (user) {
      var uid = user.uid;
      let eventList = firebase
        .database()
        .ref("App/Users/" + uid + "/favorites");
      eventList.on("value", snap => {
        console.log(snap);
        var eventi = [];
        snap.forEach(child => {
          eventi.push({
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
        this.setState({ cardList: eventi });
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
      onManagerPress={() =>
        this.props.navigation.navigate("ManagerPage", {
          ManagerInfo: item.agenzia
        })
      }
    />
  );

  _keyExtractor = (item, index) => {
    //item.id = index;
    return String(index);
  };

  renderLog() {
    return (
      <ScrollView style={{}}>
        <FlatList
          data={this.state.cardList}
          renderItem={this.renderCard}
          keyExtractor={this._keyExtractor}
        />
      </ScrollView>
    );
  }

  renderNotLog() {
    return (
      <ScrollView style={{ paddingTop: 50 }}>
        <Card
          style={{
            marginTop: 50,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 88,
            borderRadius: 10,
            alignItems: "center"
          }}
        >
          <CardItem
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 50
            }}
          >
            <Feather name="heart" size={160} color={TINT_COLOR} />
          </CardItem>

          <CardItem
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 50
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              {" "}
              Effettua l'accesso per visualizzare i tuoi contenuti!{" "}
            </Text>
          </CardItem>

          <CardItem
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 50
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  {" "}
                  ACCEDI{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/background.png")}
        style={{ resizeMode: "stretch" }}
      >
        {this.state.logged ? this.renderLog() : this.renderNotLog()}
      </ImageBackground>
    );
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
  },
  loginButton: {
    marginLeft: "10%",
    marginRight: "10%",
    width: 160,
    padding: 10,
    backgroundColor: TINT_COLOR,
    borderRadius: 30
  }
});
