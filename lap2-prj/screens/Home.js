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
  Alert,
} from "react-native";
import { Permissions, Location } from "expo";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { Font } from "expo";

import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

StatusBar.setHidden(true);
StatusBar.setBarStyle("light-content");

<<<<<<< HEAD
/*
=======
/*       CARDLIST ARRAY         */ 
>>>>>>> 0e348179028430d3c780c702eb1a1d82113b2278
const cardListArray = [
  { nomeEvento: "Escursione Monte Calanducci", 
    agenzia: "Tele-Truffa",
    immagineEvento: "../assets/image.png",
    localitaEvento: "Unknow", 
    prezzoEvento: '10000$',
    descrizioneEvento: 'Alla ricerca delle merdate Calanducciane ',
    favorite: false,
  },
  { nomeEvento: "Evento1", 
    agenzia: "agenzia1",
    immagineEvento: "../assets/image.png",
    localitaEvento: "località1", 
    descrizioneEvento: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    favorite: false,
  },
  { nomeEvento: "Evento1", 
  agenzia: "agenzia1",
  immagineEvento: "../assets/image.png",
  localitaEvento: "località1", 
  descrizioneEvento: 'Questa è una breve descrizione',
  favorite: false,
  },
  { nomeEvento: "Evento1", 
  agenzia: "agenzia1",
  immagineEvento: "../assets/image.png",
  localitaEvento: "località1", 
      descrizioneEvento: 'Questa è una breve descrizione',
      favorite: false,
  },
];
*/
export default class Home extends React.Component {
  state = {
    text: "",
    address: "",
    location: "",
    loadingFont: true,
    //cardList: cardListArray /*       AGGIUNTA DELL'ARRAY NELLO STATE        */
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadingFont: false });
  /*
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
        })
        console.log(address);
      }
      */
   // this.setState({ cardList: cardListArray });
    var location = "Messina";
    
    // Carico database in base all'utente
    let eventList = firebase
      .database()
      .ref("App/Events");
      eventList.on("value", snap =>{
        var eventi = [];
        snap.forEach(child => {
          if(child.val().Place.City == location){
          eventi.push({
            nomeEvento: child.val().Title,
            localita: location,
            agenzia: child.val().Manager
          })}
        })
      this.setState({cardList: eventi});  
      })
      
  }

  // Funzione che passa come parametro il contenuto della searchBar alla navigation quando viene premuto il button search
  _goToResult = item => {
    if (this.state.text != "")
      this.props.navigation.navigate("SearchResult", {
        request: item
      });
    else {
      Alert.alert('Non posso effettuare la ricerca', 'Inserisci cosa vuoi cercare',)
    }
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
      <ScrollView style={{backgroundColor: BACKGROUND_COLOR}}>
       
        <View style={styles.searchContainer}>
          
          <SearchBar
            inputStyle={{backgroundColor: 'rgb(233,233,238)'}}
            containerStyle={styles.searchBar}
            //placeholderTextColor='#g5g5g5'
            placeholder={'Scrivi qui'}
            onChangeText={value => this.setState({ text: value })}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButton} activeOpacity = { .5 } onPress={()=>this._goToResult(this.state.text)} title="Trova Escursioni">
              <Text style={{color: 'white'}}> Trova Escursioni </Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.scrolltext}>
            <Text style={{color: TINT_COLOR, fontSize: 20}} >Scorri per i risultati nelle vicinanze</Text>
            <Feather name="chevron-up" size={24} color={TINT_COLOR} />
        </View>

        <View>
          <FlatList                     // VISTUALIZZO LA FLATLIST
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
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: Dimensions.get('window').height/2-150,
  },

  searchBar: {
    backgroundColor: 'rgb(233,233,238)', 
    borderTopColor: 'rgb(233,233,238)',
    borderRadius: 25,
    borderBottomWidth: 0,
    width: (Dimensions.get('window').width/110)*100
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  searchButton: {
    marginTop:20,
    paddingTop:15,
    paddingBottom:15,
    padding: 30,
    marginLeft:30,
    marginRight:30,
    backgroundColor: TINT_COLOR,
    borderRadius:25,
    
  },

  scrolltext: {
    marginTop: Dimensions.get('window').height/2-80,
    alignItems: "center",
    borderColor: "red",
  }
});
