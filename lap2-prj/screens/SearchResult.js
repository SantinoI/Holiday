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
    text:this.props.navigation.state.params.request || null,
    cardList: [],
  };

_loadDatabase = async => {
  let eventList = firebase.database().ref("App/Events");
    eventList.on("value", snap => {
      var eventi = [];
      snap.forEach(child => {
        if (child.val().Localita.Provincia == this.state.text) {
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
            immagineEvento: child.val().ImmagineEvento,

          });
        }
      });
        this.setState({ cardList: eventi });
      });
}

  async componentWillMount(){
    await this._loadDatabase();

  }

  renderCard = ({item}) => (
    <EventCard data={item} onFavorite={() => this._favorite(item)} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item}) }/>
  )

  _favorite = item => {
    const newCardlist = this.state.cardList.map(
      currentCard =>
        currentCard === item
          ? { ...currentCard, favorite: !currentCard.favorite }
          : currentCard
    );
    this.setState({ cardList: newCardlist });
  };

  _keyExtractor = (item, index) => {
    item.id = index;
    String(index);
  };




  render() {
    return (
    <View style={{flex:1, backgroundColor:BACKGROUND_COLOR, paddingBottom: 0}}>
        <View style={styles.searchContainer}>
          <SearchBar
              inputStyle={{ backgroundColor: "rgb(233,233,238)", }}
              containerStyle={styles.searchBar}
              placeholder={"Scrivi qui"}
              onChangeText={value => this.setState({ text: value })}
              onSubmitEditing={() => this._loadDatabase(this.state.text)}
            />
        </View>
        
        <ScrollView style={{backgroundColor:BACKGROUND_COLOR}}>
          {/* Visualizza FlatList solo se cardList[] > 0 */}
          {this.state.cardList.length ? (
            <FlatList
              data={this.state.cardList}
              renderItem={this.renderCard}
              keyExtractor={this._keyExtractor}
            />) :
            (<Text style={styles.noResultText}>Nessun risultato, cerca altro :(</Text>)}

        </ScrollView>
      </View>

    );
  }   
}

SearchResult.navigationOptions = ({ navigation }) => {
  return {
    title: "SearchResult",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
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
