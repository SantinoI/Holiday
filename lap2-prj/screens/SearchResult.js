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
  Dimensions,
  Alert
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
    searchOption: this.props.navigation.state.params.searchOption,
    text:this.props.navigation.state.params.request || null,
    cardList: [],
    loading: false,
  };

_loadDatabase = async => {

  this.setState({loading: true})
  if (this.state.searchOption === "Città") {              // SE LA RICERCA E' PER CITTA
    let eventList = firebase.database().ref("App/Events");
          eventList.on("value", snap => {
            var eventi = [];
            snap.forEach(child => {
              if (child.val().Localita.Provincia.includes(this.state.text)) {
                eventi.push({
                  IDevento: child.val().IDevento,
                  IDorganizzatore: child.val().IDorganizzatore,
                  agenzia: child.val().Agenzia,
                  email: child.val().Email,
                  numero: child.val().Numero,
                  nomeEvento: child.val().NomeEvento,
                  citta: child.val().Localita.Citta,
                  provincia: child.val().Localita.Provincia,
                  regione: child.val().Localita.Regione,
                  descrizioneBreve: child.val().DescrizioneBreve,
                  descrizioneCompleta: child.val().DescrizioneCompleta,
                  prezzo: child.val().Prezzo,
                  difficolta: child.val().Difficolta,
                  data: child.val().Data,
                  orario: child.val().Orario,
                  durata: child.val().Durata,
                  immagineAgenzia: child.val().ImmagineAgenzia,
                  immagineEvento: child.val().ImmagineEvento,
                  favorite: false
                });
              }
            });
            // CONTROLLO CHE L'EVENTO SIA TRA I PREFERITI E MODIFICO IL CAMPO FAVORITE
            // POSSO FARE QUESTO CONTROLLO SOLO SE FACCIO IL LOGIN, ALTRIMENTI, TUTTI FALSI
            if (firebase.auth().currentUser) {
              var temp = eventi
              const uid = firebase.auth().currentUser.uid;
              firebase.database().ref("App/Users/"+ uid + "/Favorites").on("value", snap => {
                snap.forEach(child => {
                  const newCardlist = temp.map( currentCard =>
                    currentCard.IDevento == child.val().IDevento
                      ? { ...currentCard, favorite: true }
                      : currentCard
                  );
                  temp = newCardlist
                  //this.setState({ cardList: newCardlist });
                  console.log(newCardlist)
                });
                this.setState({ cardList: temp });
              });
            }
            else {
              this.setState({cardList: eventi})
            }

            //
          
          });
  } else if (this.state.searchOption === "Eventi") {                // SE LA RICERCA E' PER EVENTI
    let eventNameList = firebase.database().ref("App/Events");
        eventNameList.on("value", snap => {
          var eventi = [];
          snap.forEach(child => {
            if (child.val().NomeEvento.includes(this.state.text)) {
              eventi.push({
                IDevento: child.val().IDevento,
                IDorganizzatore: child.val().IDorganizzatore,
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
                favorite: false
              });
            }
          });
            
          // CONTROLLO CHE L'EVENTO SIA TRA I PREFERITI E MODIFICO IL CAMPO FAVORITE
            // POSSO FARE QUESTO CONTROLLO SOLO SE FACCIO IL LOGIN, ALTRIMENTI, TUTTI FALSI
            if (firebase.auth().currentUser) {
              var temp = eventi
              const uid = firebase.auth().currentUser.uid;
              firebase.database().ref("App/Users/"+ uid + "/Favorites").on("value", snap => {
                snap.forEach(child => {
                  const newCardlist = temp.map( currentCard =>
                    currentCard.IDevento == child.val().IDevento
                      ? { ...currentCard, favorite: true }
                      : currentCard
                  );
                  temp = newCardlist
                  //this.setState({ cardList: newCardlist });
                  console.log(newCardlist)
                });
                this.setState({ cardList: temp });
              });
            }
            else {
              this.setState({cardList: eventi})
            }
        
          });
  } else if (this.state.searchOption === "Organizzatori") {             // SE LA RICERCA E' PER ORGANIZZATORI
    let ManagerNameList = firebase.database().ref("App/Events");
        ManagerNameList.on("value", snap => {
          var eventi = [];
          snap.forEach(child => {
            if (child.val().Agenzia.includes(this.state.text)) {
              eventi.push({
                IDevento: child.val().IDevento,
                IDorganizzatore: child.val().IDorganizzatore,
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
                favorite: false,
              });
            }
          });
            
          // CONTROLLO CHE L'EVENTO SIA TRA I PREFERITI E MODIFICO IL CAMPO FAVORITE
            // POSSO FARE QUESTO CONTROLLO SOLO SE FACCIO IL LOGIN, ALTRIMENTI, TUTTI FALSI
            if (firebase.auth().currentUser) {
              var temp = eventi
              const uid = firebase.auth().currentUser.uid;
              firebase.database().ref("App/Users/"+ uid + "/Favorites").on("value", snap => {
                snap.forEach(child => {
                  const newCardlist = temp.map( currentCard =>
                    currentCard.IDevento == child.val().IDevento
                      ? { ...currentCard, favorite: true }
                      : currentCard
                  );
                  temp = newCardlist
                  //this.setState({ cardList: newCardlist });
                  console.log(newCardlist)
                });
                this.setState({ cardList: temp });
              });
            }
            else {
              this.setState({cardList: eventi})
            }
        
          });
          
  }
  this.setState({loading: false})
}

  async componentWillMount(){
    this._loadDatabase();
  }


  uploadFavorite = item => {
    const userId = firebase.auth().currentUser.uid;
    console.log(item);
    const Localita = {
      citta: item.citta,
      provincia: item.provincia
    }
    const newFavorite = {
      IDevento: item.IDevento,
      agenzia: item.agenzia,
      email: item.email,
      numero: item.numero,
      nomeEvento: item.nomeEvento,
      Localita: Localita,
      descrizioneBreve: item.descrizioneBreve,
      descrizioneCompleta: item.descrizioneCompleta,
      prezzo: item.prezzo,
      data: item.data,
      orario: item.orario,
      immagineAgenzia:item.immagineAgenzia,
      immagineEvento: item.immagineEvento,
    };
    var pushedRef = firebase
    .database()
    .ref("App/Users/" + userId+ "/Favorites/" + item.IDevento)
    .update(newFavorite)
    console.log(pushedRef.key)
    
  };

  renderCard = ({item}) => (
    <EventCard data={item} onFavorite={() => this._favorite(item)} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item})}/>
  )

  _favorite = item => {
    if (!firebase.auth().currentUser) {
        Alert.alert(
          "Accedi per poter aggiungere questo evento tra quelli a cui desidereresti partecipare!",
          "",
          [
            {
              text: "Cancella",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
        );
        return;
    }
    else {
      const newCardlist = this.state.cardList.map(
        currentCard =>
          currentCard === item
            ? { ...currentCard, favorite: true }
            : currentCard
      );
      this.uploadFavorite(item);
      this.setState({ cardList: newCardlist });
    }
  };

  _keyExtractor = (index) => {
    return String(index);
  };


  render() {
    return (
        <View style={{paddingBottom: 88, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.searchContainer}>
              <SearchBar
                  inputStyle={{ backgroundColor: "rgb(233,233,238)", }}
                  containerStyle={styles.searchBar}
                  placeholder={"Scrivi qui"}
                  onChangeText={value => this.setState({ text: value })}
                  onSubmitEditing={() => this._loadDatabase(this.state.text)}
                />
            </View>        
            {this.state.loading ? 
            (
              <ActivityIndicator size="large" color={TINT_COLOR} />
            ) :
            (
            <ScrollView>
              {/* Visualizza FlatList solo se cardList[] > 0 */}
              {this.state.cardList.length ? (
                <FlatList
                  data={this.state.cardList}
                  renderItem={this.renderCard}
                  keyExtractor={this._keyExtractor}
                  
                />
              ) :
                (<Text style={styles.noResultText}>Nessun risultato, cerca altro :(</Text>)}
            </ScrollView>
            )}
        </View>
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
    textAlign: 'center',
    marginBottom: '70%'
  }
});
