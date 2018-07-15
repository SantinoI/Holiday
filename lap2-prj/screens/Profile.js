import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ImageBackground,
  ActionSheetIOS,
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

import { Permissions, Location, ImagePicker, ImageManipulator, } from "expo";
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
      profileImage: null,
      username:"",
      nome:"",
      cognome:"",
      email:"",
      bookingList: []
    }

    _loadUserData = async => {
      const user = firebase.auth().currentUser;
      if (user) {
        //console.log(user.uid);
        var uid = user.uid;
      
        this.setState({imageLoading: true})
        firebase.database().ref("App/Users/" + uid)
          .on("value", snap => {
            //console.log(snap.val())
            this.setState({ profileImage: snap.val().ProfileImage});
            this.setState({ username: snap.val().Username});
            this.setState({ nome: snap.val().Nome});
            this.setState({ cognome: snap.val().Cognome});
            this.setState({ email: snap.val().Email});
          });
        

        
        this.setState({imageLoading: false})
      }
    }

    // _loadBookings = async request => {
    //   const user = firebase.auth().currentUser;
    //   if (user) {
    //     console.log(user.uid);
    //     let uid = user.uid;
    //     //console.log(path)
    //     let eventList = firebase.database().ref("App/Events");
    //     eventList.on("value", snap => {
    //       var prenotazioni = [];
    //       snap.forEach(child => {
    //         console.log(child.val());
    //         //console.log(child.val().IDcliente);
    //         if (child.val().IDcliente == uid) {
    //           console.log("ci siamo");
    //           prenotazioni.push({
    //             // IDevento: child.val().IDevento,
    //             // agenzia: child.val().Agenzia,
    //             // nomeEvento: child.val().NomeEvento,
    //             // citta: child.val().Localita.Citta,
    //             // provincia: child.val().Localita.Provincia,
    //             // descrizioneBreve: child.val().DescrizioneBreve,s
    //             // descrizioneCompleta: child.val().DescrizioneCompleta,
    //             // prezzo: child.val().Prezzo,
    //             // difficolta: child.val().Difficolta,
    //             // data: child.val().Data,
    //             // orari: child.val().Orario,
    //             // durata: child.val.Durata,
    //             // immagineAgenzia: child.val().ImmagineAgenzia,
    //             // immagineEvento: child.val().ImmagineEvento
    //             stato: child.val().Stato
    //           });

    //         //}
    //         }
    //       });
    //       prenotazioni = prenotazioni[1]

    //       this.setState({ bookingList: prenotazioni });
    //       console.log(this.state.bookingList);
    //     });
    //   }
    // };

    _loadBookings = async request => {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log(user.uid);
        let uid = user.uid;
        //console.log(path)
        let eventList = firebase.database().ref("App/Prenotazioni");
        eventList.on("value", snap => {
          var prenotazioni = [];
          snap.forEach(child => {
            if (child.val().IDcliente == uid) {
              console.log("ci siamo");
              prenotazioni.push({
                IDevento: child.val().IDevento,
                agenzia: child.val().DatiOrganizzatore.Agenzia,
                numero: child.val().DatiOrganizzatore.Numero,
                nomeEvento: child.val().DatiEvento.NomeEvento,
                citta: child.val().DatiEvento.localita.Citta,
                provincia: child.val().DatiEvento.localita.Provincia,
                descrizioneBreve: child.val().DatiEvento.DescrizioneBreve,
                descrizioneCompleta: child.val().DatiEvento.DescrizioneCompleta,
                prezzo: child.val().DatiEvento.Prezzo,
                data: child.val().DatiEvento.Data,
                orari: child.val().DatiEvento.Orario,
                immagineAgenzia: child.val().DatiOrganizzatore.ImmagineAgenzia,
                immagineEvento: child.val().DatiEvento.ImmagineEvento,
                stato: child.val().Stato
              });
            }
          });

          this.setState({ bookingList: prenotazioni });
          console.log(this.state.bookingList);
        });
      }
    };


    componentWillMount() {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.setState({logged: true})
          this._loadUserData();
          this._loadBookings();
          //this.props.navigation.setParams({ logged: true })
        }
        else {
          this.setState({logged: false})
          //this.props.navigation.setParams({ logged: false })
          this.props.navigation.navigate('Login')
        }
      })
    }

  _updateProfileImage = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
    .database()
    .ref("App/" + "Users/" + userId)
    .update({ProfileImage: this.state.profileImage})
  }
      //Apertura galleria per choosing foto profilo utente
  _openPhotoGallery = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (result.status !== "granted") {
        alert("you need to authorized the app");
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log(result);
      // Resize the image
      const manipResult = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 375 } }],
        { format: "png" }
      );
      console.log(manipResult);
      this.setState({ profileImage: manipResult.uri });
      this._updateProfileImage();
    }
  };

  _selectPhoto = () => {
    console.log("show actions sheet");
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Camera", "Photo Gallery", "Cancel"],
          cancelButtonIndex: 2,
          title: "Scegli immagine da:"
        },
        buttonIndex => {
          if (buttonIndex == 1) {
            this._openPhotoGallery();
          }
        }
      );
    }
  };

    renderNotLog() {
      return (

        <ScrollView style={{ paddingTop: 50 , backgroundColor:BACKGROUND_COLOR}}>
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
      );
    }

    renderLog() {
      return (

        <ScrollView style={{ paddingTop: 50, backgroundColor:BACKGROUND_COLOR }}>
          <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:60, borderRadius: 10}}>
                <TouchableOpacity style={{marginTop: -75 ,marginBottom: 0, alignSelf: 'center'}} onPress={this._selectPhoto}>
                  <Image
                    resizeMode="cover"
                    rounded
                    style= {{borderRadius:80, width: 160, height: 160}}
                    source = {  this.state.profileImage ? { uri: this.state.profileImage } : require("../assets/imagep.png")}
                    />         
                </TouchableOpacity>

                <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
                <Text style={{fontSize: 24, textAlign: 'center'}}> {this.state.username} </Text>
                </CardItem>

                {/* AGENZIA E EMAIL */}
                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                  <Text>Informazioni personali</Text>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                  <SimpleLineIcons name='user' size={16}/>
                  <Text style={{marginLeft: 10}}>{this.state.nome} {this.state.cognome}</Text>
                  </Body>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='email-outline' size={16}/>
                    <Text style={{marginLeft: 10}}>{this.state.email}</Text>
                </Body>

                </CardItem>                

                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                  <Text>Eventi in programma</Text>
                  <Calendar
                      style={styles.calendar}
                      current={'2012-05-16'}
                      minDate={'2012-05-10'}
                      maxDate={'2012-05-29'}
                      firstDay={1}
                      markedDates={{
                        '2012-05-23': {selected: true, marked: true},
                        '2012-05-24': {selected: true, marked: true, dotColor: 'green'},
                        '2012-05-25': {marked: true, dotColor: 'red'},
                        '2012-05-26': {marked: true},
                        '2012-05-27': {disabled: true, activeOpacity: 0}
                      }}
                      // disabledByDefault={true}
                      hideArrows={false}
                    />
                  </CardItem>

                  <CardItem style={{flexDirection: 'column', alignItems: 'center', marginBottom: 30, marginTop: 20 }} >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => firebase.auth().signOut()}>
                      <Text style={{textAlign:'center', color: "grey" }}> Esci </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                  
             </Card>
          </ScrollView>
      );
    }

    render() {
      return(
          this.state.logged ? (this.renderLog()) : this.renderNotLog()           
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {
  header:null
  _onAccountPress = () => {
    var uid = firebase.auth().currentUser;
    if (uid) {
     firebase.auth().signOut()
    }
  };

  return {
      title: "Profile",
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
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
      color: TINT_COLOR,
      marginTop: '50%',
      fontSize: 20,
      textAlign: 'center'
    }
});
