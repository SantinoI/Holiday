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
  Alert,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";

import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Container, Button } from 'native-base';

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import EventCard from "../components/EventCard";

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['it'] = {
  monthNames: ['Gennaio','Febbraio','Marzo','Aprile',' Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  monthNamesShort: ['Gen.','Febr.','Mar.','Apr.','Mag.','Giu.','Lug.','Ago.','Sett.','Ott.','Nov.','Dic.'],
  dayNames: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mer.','Gio.','Ven.','Sab.']
};

LocaleConfig.defaultLocale = 'it';

export default class Profile extends React.Component {
    state = {
      cardList: [],
      profileImage: null,
      username: "",
      Sede: "",
      //logged: false
    }

    _loadProfileInfo = () => {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log(user.uid);
        var uid = user.uid;
      
        this.setState({imageLoading: true})
        // firebase.database().ref("App/Organizzatori/" + uid + "/ProfileImage")
        //   .on("value", snap => {
        //     let imageURL = snap.val()
        //     console.log(snap.val())
        //     this.setState({ profileImage: imageURL });
        //   });
        
        let dati = firebase.database().ref("App/Organizzatori/" + uid + "/Dati");
          dati.on("value", snap => {
            console.log(snap.val())
            this.setState({ username: snap.val().username });
            this.setState({ sede: snap.val().sede });
            this.setState({ numero: snap.val().numero });
            this.setState({ email: snap.val().email });

          });

        this.setState({imageLoading: false})
      }
    }

    _loadDatabase = () => {
      let eventList = firebase.database().ref("App/Events");
      eventList.on("value", snap => {
        var eventi = [];
        snap.forEach(child => {
          if (child.val().IDorganizzatore === firebase.auth().currentUser.uid) {
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
    }

    componentWillMount() {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.setState({logged: true})
          this._loadProfileInfo();
          this._loadDatabase();
        }
        else {
          this.setState({logged: false})

        }
      })
    }

    renderCard = ({ item }) => {
      {console.log(item);}
      return (
        <EventCard data={item} onRemove={() => this._onRemove()} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item}) }/> // LA PROP DATA DOVREBBE PASSARE I PARAMETRI DELLA LIST IN QUESTOFILE
        // AI TEXT IN OUTPUT NEL FILE EVENTCARD
      );
    };
  
    _keyExtractor = (item, index) => {
      //item.id = index;
      return String(index);
    };

    _onRemove = item => {
      let eventList = firebase.database().ref("App/Events");
      eventList.on("value", snap => {
        snap.forEach(child => {
          if (child === item) {
            child.val().remove();
          };
        });
      });
    };

    renderNotLog() {
      return (
        <ImageBackground
        source={require("../assets/background-user.png")}
        style={{width:"100%", height:"100%"}}
      >
        <ScrollView style={{ paddingTop: 50, }}>
            <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:88, borderRadius: 10, alignItems:"center"}}>

              <CardItem style={{flexDirection: 'column', alignItems: 'center', marginTop: 50 }} >
                  <FontAwesome name='user-circle-o' size={160} color={TINT_COLOR}/>                         
              </CardItem>            

                <CardItem style={{flexDirection: 'column', alignItems: 'center', marginBottom: 50 }} >
                <Text style={{fontSize: 24, textAlign: 'center'}}> Effettua l'accesso per visualizzare i tuoi contenuti! </Text>
                </CardItem>

                <CardItem style={{flexDirection: 'column', alignItems: 'center', marginBottom: 50 }} >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.loginButton}
                        activeOpacity={0.5}
                        onPress={() => this.props.navigation.navigate("Login")}
                    >
                    <Text style={{textAlign:'center', color: "white" }}> ACCEDI </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>


             </Card>
             </ScrollView>
        </ImageBackground>
      );
    }

    renderLog() {
      return (
        <ImageBackground
        source={require("../assets/background-user.png")}
        style={{height:'100%', width:'100%'}}
      >
        <ScrollView style={{ paddingTop: 50, marginBottom: 88}}>
          <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:10, borderRadius: 10}}>
                <TouchableOpacity style={{marginTop: -75 ,marginBottom: 0, alignSelf: 'center'}}>
                  <Image
                    resizeMode="cover"
                    rounded
                    style= {{borderRadius:80, width: 160, height: 160}}
                    source = {  this.state.profileImage ? { uri: this.state.profileImage } : require("../assets/image.png")}
                    />         
                </TouchableOpacity>

                <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
                <Text style={{fontSize: 24, textAlign: 'center'}}> {this.state.username} </Text>
                </CardItem>

                {/* AGENZIA E EMAIL */}
                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                  <Text>Informazioni personali</Text>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                  <MaterialCommunityIcons name='map-marker-outline' size={16}/>
                  <Text style={{marginLeft: 10}}>{this.state.sede}</Text>
                  </Body>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='email-outline' size={16}/>
                    <Text style={{marginLeft: 10}}>{this.state.email}</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                    <Feather name='phone' size={16}/>
                    <Text style={{marginLeft: 10}}>{this.state.numero}</Text>
                </Body>

                </CardItem>                

                  <CardItem style={{flexDirection: 'column', alignItems: 'center', marginBottom: 30, marginTop: 20 }} >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => firebase.auth().signOut()}>
                      <Text style={{textAlign:'center', color: "grey" }}> Esci </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                  
             </Card>

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
                      <Feather name="chevron-up" size={24} color= {TINT_COLOR}/>
                    </View>
                    <View style={{paddingBottom: 50}}>
                      <FlatList // VISTUALIZZO LA FLATLIST
                        data={this.state.cardList}
                        renderItem={this.renderCard}
                        keyExtractor={this._keyExtractor}
                      />
                    </View>
                  </View>
                  ) :
                  ( 
                    <Text style={styles.noResultText}>Non hai ancora creato nessun Evento!</Text>
                  )
              )}
          </ScrollView>
          </ImageBackground>
      );
    }

    render() {
      return(
        //<View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex: 1}}>
          this.state.logged ? (this.renderLog()) : this.renderNotLog()          
        //</View>
        
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {
  _onAccountPress = () => {
    var uid = firebase.auth().currentUser;
    if (uid) {
     firebase.auth().signOut()
    }
  };

  return {
      title: "Profile",
      headerStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0
      },
      
      /*headerRight: (
        <TouchableOpacity onPress={() => _onAccountPress()}>
            <MaterialCommunityIcons style={{marginRight: 30}} name='exit-to-app' size={30} color={TINT_COLOR}/>
        </TouchableOpacity>
      )*/
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
    loginButton: {
      marginLeft: '10%',
      marginRight: '10%',
      width: 160,
      padding: 10,
      backgroundColor: TINT_COLOR,
      borderRadius: 30,
    },
    logoutButton: {
      marginLeft: '10%',
      marginRight: '10%',
      width: 160,
      //height: 30,
      padding: 10,
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor:"grey"
    },
    noResultText: {
      textAlign: 'center',
      overflow: 'hidden',
      borderRadius: 20,
      marginTop: 20,
      padding: 10,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: 'rgb(233,233,238)',
      color: 'rgb(136,147,158)'
    },
    scrolltext: {
      margin: 10,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 30,
      alignItems: "center",
      backgroundColor: "white",
      borderWidth: 0,
      //borderColor: "grey",
    },
});
