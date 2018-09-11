import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  ActionSheetIOS,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  Alert
} from "react-native";

import {Card, CardItem,Body} from 'native-base';

import { Permissions,ImagePicker, ImageManipulator, } from "expo";
import { FontAwesome , Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

StatusBar.setHidden(false);
StatusBar.setBarStyle("light-content");

export default class Profile extends React.Component {
    state = {
      cardList: [],
      profileImage: null,
      username: "",
      Sede: "",
      email:"",
      numero:"",
      logged: null,
    }

    _loadProfileInfo = () => {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log(user.uid);
        var uid = user.uid;
      
        this.setState({imageLoading: true})
        let dati = firebase.database().ref("App/Organizzatori/" + uid);
          dati.on("value", snap => {
            console.log(snap.val())
            this.setState({ profileImage: snap.val().ProfileImage });
            this.setState({ username: snap.val().Username });
            this.setState({ Sede: snap.val().Sede });
            this.setState({ numero: snap.val().Numero });
            this.setState({ email: snap.val().Email });

          });

        this.setState({imageLoading: false})
      }
    }

    //Carimecameno foto nello storage e nel DB
    _uploadImage = async localURI => {
      const uid = firebase.auth().currentUser.uid;
      const response = await fetch(localURI);
      const blob = await response.blob();
     
      const ref = firebase
        .storage()
        .ref("Users/" + uid +"/UserImages/"+ this.state.username )
      const uploadStatus = await ref.put(blob);
      const downloadURL = await uploadStatus.ref.getDownloadURL();
     
      firebase
      .database()
      .ref("App/Organizzatori/" + uid)
      .update({ProfileImage: downloadURL})

      this.setState({profileImage : downloadURL});
    };

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
        this._uploadImage(manipResult.uri);
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
      else{
        Alert.alert(
          'Seleziona immagine',
          'Seleziona un immagine da utilizzare come immagine profilo',
          [
            {text: 'Apri galleria', onPress: () => this._openPhotoGallery()},
            {text: 'Cancella', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            
          ],
          { cancelable: false }
        )
      }
    };

    _loadDatabase  = async => {
      let eventList = firebase.database().ref("App/Events");
      eventList.on("value", snap => {
        var eventi = [];
        snap.forEach(child => {
          if (child.val().IDorganizzatore === firebase.auth().currentUser.uid) {
            eventi.push({
              //IDevento: child.val().IDevento,
              agenzia: child.val().Agenzia,
              nomeEvento: child.val().NomeEvento,
              IDorganizzatore: child.val().IDorganizzatore,
              citta: child.val().Localita.Citta,
              provincia: child.val().Localita.Provincia,
              regione: child.val().Localita.Regione,
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
          this.props.navigation.navigate("Login")

        }
      })

    }

    renderCard = ({ item }) => {
      
      {console.log(item);}
      return (
        <EventCard data={item} onRemove={() => this._onRemove(item)} onEventPress={() => this.props.navigation.navigate("EventPage", {eventInfo: item}) }/> // LA PROP DATA DOVREBBE PASSARE I PARAMETRI DELLA LIST IN QUESTOFILE
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
          if (child.val().NomeEvento == item.nomeEvento && child.val().IDorganizzatore == firebase.auth().currentUser.uid) {
            console.log("Rimosso")
            child.ref.remove();
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
        <ScrollView style={{ paddingTop: 50, marginBottom: 0}}>
          <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:10, borderRadius: 10}}>
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
                {/* Bottone inserisci nuovo evento */}
                <CardItem style={{flexDirection: 'column', alignItems: 'center'}} >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.newEventButton} onPress={() => this.props.navigation.navigate("NewEventPage", {profileImage: this.state.profileImage,
                                                                                                                                   username: this.state.username,
                                                                                                                                   sede: this.state.Sede,
                                                                                                                                   email: this.state.email,
                                                                                                                                   numero: this.state.numero,
                                                                                                                                   idOrganizzatore: firebase.auth().currentUser.uid})}>
                      <Text style={{textAlign:'center', color: 'white' }}> Inserisci nuovo evento </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>          
                
                {/* Bottone LOGOUT */}
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
          this.state.logged ? (this.renderLog()) : this.renderNotLog()                  
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {

  return {
      title: "Profilo",
      headerStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0
      },

      headerLeft: null,

      headerRight: null
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
    newEventButton: {
      marginLeft: '10%',
      marginRight: '10%',
      width: 250,
      //height: 30,
      padding: 10,
      backgroundColor: TINT_COLOR,
      borderRadius: 25,
      
      borderWidth: 0.5,
      borderColor:"yellow"
    }
});
