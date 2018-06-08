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

export default class SearchResult extends React.Component {
  state = {
    text:"",
    cardList: [],
  };

_loadDatabase = request => {
  let eventList = firebase.database().ref("App/Events");
    eventList.on("value", snap => {
      var eventi = [];
      snap.forEach(child => {
        if (child.val().Place.City == request) {
          eventi.push({
            nomeEvento: child.val().Title,
            localita: request,
            agenzia: child.val().Manager,
            descrizione: child.val().Description,
            prezzo: child.val().Price
          });
        }
      });
        this.setState({ cardList: eventi });
      });
}

componentWillMount(){
    let request = this.props.navigation.state.params.request;
    this._loadDatabase(request);

  }

  renderCard = ({item}) => (
    <EventCard data={item}/>
  )

  _keyExtractor = (item, index) => {
    item.id = index;
    String(index);
  };

  render() {
    return (
      <ScrollView style={{backgroundColor:BACKGROUND_COLOR}}>
        <View style={styles.searchContainer}>
        <SearchBar
            inputStyle={{ backgroundColor: "rgb(233,233,238)", }}
            containerStyle={styles.searchBar}
            placeholder={"Scrivi qui"}
            onChangeText={value => this.setState({ text: value })}
            onSubmitEditing={() => this._loadDatabase(this.state.text)}
          />
        </View>
          <FlatList
            data={this.state.cardList}
            renderItem={this.renderCard}
            keyExtractor={this._keyExtractor}
          />
        }
      </ScrollView>
    );
  }   
}

SearchResult.navigationOptions = ({ navigation }) => {
  return {
    title: "SearchResult",
    headerStyle: {},
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
    marginTop: 25,
    marginBottom: 25,
  },
  searchBar: {
    backgroundColor: "rgb(233,233,238)",
    borderTopColor: "rgb(233,233,238)",
    borderRadius: 30,
    borderBottomWidth:0,
    width: (Dimensions.get("window").width * 90)/ 100
  },
});
