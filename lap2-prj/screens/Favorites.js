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

import EventCard from "../components/EventCardFav";

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
      console.log(uid)
      let eventList = firebase
        .database()
        .ref("App/Users/" + uid + "/Favorites");
      eventList.on("value", snap => {
        console.log(snap);
        var eventi = [];
        snap.forEach(child => {
          eventi.push({
            IDevento: child.val().IDevento,
            agenzia: child.val().agenzia,
            email: child.val().email,
            numero: child.val().numero,
            facebook: child.val().facebook,
            nomeEvento: child.val().nomeEvento,
            citta: child.val().Localita.citta,
            provincia: child.val().Localita.provincia,
            descrizioneBreve: child.val().descrizioneBreve,
            descrizioneCompleta: child.val().descrizioneCompleta,
            prezzo: child.val().prezzo,
            difficolta: child.val().difficolta,
            data: child.val().data,
            orario: child.val().orario,
            durata: child.val().durata,
            immagineAgenzia: child.val().immagineAgenzia,
            immagineEvento: child.val().immagineEvento
          });
        });
        this.setState({ cardList: eventi });
        console.log(eventi);
      });
    }
  };
  renderCard = ({ item }) => (
    <EventCard
      data={item}
      onRemove={() => 
        this._onRemove(item)
      }

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

  _onRemove = item => {
    console.log("onRemove")
    const uid = firebase.auth().currentUser.uid;
    let eventList = firebase.database().ref("App/Users/" + uid + "/Favorites");
    eventList.on("value", snap => {
      snap.forEach(child => {
        console.log("ehi")
        if (child.val().IDevento === item.IDevento) {
          console.log("Rimosso")
          child.ref.remove();
        };
      });
    });
  };

  _keyExtractor = (item, index) => {
    //item.id = index;
    return String(index);
  };

  renderLog() {
    return (
      <ScrollView style={{backgroundColor: BACKGROUND_COLOR}}>
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
      <ScrollView style={{ paddingTop: 50,  backgroundColor: BACKGROUND_COLOR }}>
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
      
        this.state.logged ? this.renderLog() : this.renderNotLog()
      
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
