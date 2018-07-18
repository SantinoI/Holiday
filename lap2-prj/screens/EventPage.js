import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { Card, CardItem, Left, Body, Right, Container } from "native-base";
import BookingButton from "../components/BookingButton";

import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

export default class EventPage extends React.Component {
  state = {
    booked: false,
    bookingState: "",
    destToken: "",
    logged: false
  };

  checkBooking = async => {
    uid = firebase.auth().currentUser.uid;

    idEvento = this.props.navigation.state.params.eventInfo.IDevento;
    firebase
      .database()
      .ref("App/Prenotazioni")
      .on("value", snap => {
        snap.forEach(child => {
          if (
            child.val().IDcliente == uid &&
            child.val().IDevento == idEvento
          ) {
            this.setState(
              { booked: true, bookingState: child.val().Stato },
              this.forceUpdate()
            );
          }
        });
      });
  };

  _loadUserData = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({logged: true})
      var uid = user.uid;
      firebase
        .database()
        .ref("App/Users/" + uid)
        .on("value", snap => {
          userData = {};
          this.setState({
            username: snap.val().Username,
            nome: snap.val().Nome,
            cognome: snap.val().Cognome,
            email: snap.val().Email
          });
        });
      this.setState;
    }
  };

  componentWillMount() {
    const user = firebase.auth().currentUser;
    if(user){
      this.checkBooking();
      this._loadUserData();
    }
}

  _sendNotification = (destToken, payload) => {
    fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: destToken,
        title: payload.title,
        body: payload.message,
        data: { payload },
        sound: "default"
      })
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  newBooking = async () => {
    const userData = {
      username: "",
      nome: "",
      cognome: "",
      email: ""
    };

    const ManagerData = {
      Agenzia: this.props.navigation.state.params.eventInfo.agenzia,
      ImmagineAgenzia: this.props.navigation.state.params.eventInfo
        .immagineAgenzia,
      Numero: this.props.navigation.state.params.eventInfo.numero
    };

    const Localita = {
      Citta: this.props.navigation.state.params.eventInfo.citta,
      Provincia: this.props.navigation.state.params.eventInfo.provincia
    };
    const eventData = {
      NomeEvento: this.props.navigation.state.params.eventInfo.nomeEvento,
      Agenzia: this.props.navigation.state.params.eventInfo.agenzia,
      Data: this.props.navigation.state.params.eventInfo.data,
      Orario: this.props.navigation.state.params.eventInfo.orario,
      DescrizioneBreve: this.props.navigation.state.params.eventInfo
        .descrizioneBreve,
      DescrizioneCompleta: this.props.navigation.state.params.eventInfo
        .descrizioneCompleta,
      Email: this.props.navigation.state.params.eventInfo.email,
      ImmagineEvento: this.props.navigation.state.params.eventInfo
        .immagineEvento,
      Prezzo: this.props.navigation.state.params.eventInfo.prezzo,
      localita: Localita
    };
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("App/Users/" + userId)
      .on("value", snap => {
        //console.log(snap.val())
        userData.username = snap.val().Username;
        userData.nome = snap.val().Nome;
        userData.cognome = snap.val().Cognome;
        userData.email = snap.val().Email;
        // console.log("userData")
        // console.log(userData)

        const booking = {
          IDorganizzatore: this.props.navigation.state.params.eventInfo
            .IDorganizzatore,
          IDcliente: userId,
          IDevento: this.props.navigation.state.params.eventInfo.IDevento,
          DatiUtente: userData,
          DatiEvento: eventData,
          DatiOrganizzatore: ManagerData,
          Stato: "ATTESA"
        };

        firebase
          .database()
          .ref("App/Prenotazioni/")
          .push(booking);
      });

    let payload = {
      message:
        this.state.username +
        " ha aggiunto una prenotazione al tuo evento" +
        this.props.navigation.state.params.eventInfo.nomeEvento,
      title: "Nuova Prenotazione"
    };
    var destToken, operazione;
    var destinatario = firebase
      .database()
      .ref(
        "App/Organizzatori/" +
          this.props.navigation.state.params.eventInfo.IDorganizzatore
      )
      .on("value", snap => {
        destToken = snap.val().ExpoToken;
        this.setState({ destToken: destToken }, () =>
          this._sendNotification(this.state.destToken, payload)
        );
      });
  };

  removeBooking() {
    const uid = firebase.auth().currentUser.uid;
    idevento = this.props.navigation.state.params.eventInfo.IDevento;

    var eventContactsRef = firebase.database().ref("App/Prenotazioni");
    var query = eventContactsRef.orderByChild("IDcliente").equalTo(uid);
    query.on("child_added", function(snapshot) {
      var selection = snapshot.val();
      if (selection.IDevento == idevento) {
        console.log(selection);
        snapshot.ref.remove();
        idevento = null;
      }
    });
    this.setState({ booked: false });

    let payload = {
      message:
        this.state.username +
        " ha rimosso una prenotazione al tuo evento" +
        this.props.navigation.state.params.eventInfo.nomeEvento,
      title: "Prenotazione rimossa"
    };

    var destToken, operazione;
    var destinatario = firebase
      .database()
      .ref(
        "App/Organizzatori/" +
          this.props.navigation.state.params.eventInfo.IDorganizzatore
      )
      .on("value", snap => {
        destToken = snap.val().ExpoToken;
        this.setState({ destToken: destToken }, () =>
          this._sendNotification(this.state.destToken, payload)
        );
      });
  }

  render() {
    return (
      <Container style={{ backgroundColor: BACKGROUND_COLOR }}>
        <ScrollView>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
            {/* IMMAGINE EVENTO */}
            <CardItem cardBody style={{ borderRadius: 10 }}>
              <Image
                style={{ borderRadius: 10, height: 200, width: null, flex: 1 }}
                source={{
                  uri: this.props.navigation.state.params.eventInfo
                    .immagineEvento
                }}
              />
            </CardItem>

            {/* LOCALITA' E ID_EVENTO*/}
            <CardItem>
              <Left
                style={{
                  flex: 0.8,
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ fontSize: 10, fontStyle: "italic" }}>
                  {this.props.navigation.state.params.eventInfo.citta},{" "}
                  {this.props.navigation.state.params.eventInfo.provincia}
                </Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 10, fontStyle: "italic" }}>
                  Codice di riferimento:{" "}
                  {this.props.navigation.state.params.eventInfo.IDevento}
                </Text>
              </Right>
            </CardItem>

            <CardItem style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                {this.props.navigation.state.params.eventInfo.nomeEvento}
              </Text>
            </CardItem>

            {/* BOTTONE PRENOTA ORA */}
            {this.state.logged ? 
            (
            <CardItem>
              <View style={styles.buttonContainer}>
                {this.state.booked ? ( // Verifico se è stata effettuata la richiesta
                  <View>
                    <BookingButton
                      bookState={this.state.bookingState}
                      onRemoveBooking={() => this.removeBooking()}
                    />
                  </View>
                ) : (
                  // Se non è stata fatta visualizzo il pulsante di prenotazione
                  <TouchableOpacity
                    style={styles.searchButton}
                    activeOpacity={0.5}
                    onPress={() => this.newBooking()}
                    title="Prenota"
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      {" "}
                      Prenota adesso{" "}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </CardItem>
            ) :
            (
            <CardItem>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.searchButton}
                  activeOpacity={0.5}
                  title="Prenota"
                  //onPress={() => {this.props.navigation.navigate("Login"); this.forceUpdate()}}
                  onPress={() => {this.props.navigation.navigate("Login"); this.forceUpdate()}}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>{" "}Accedi per prenotare{" "}</Text>
                </TouchableOpacity>

            </View>
          </CardItem>
            )
            }
            {/* Location */}
            <CardItem
              style={{
                marginLeft: 10,
                marginRight: 5,
                marginBottom: 5,
                borderRadius: 10
              }}
            >
              <Left
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: 10,
                  marginRight: 5,
                  marginBottom: 5,
                  borderRadius: 10
                }}
              >
                <Text style={{ fontSize: 12, color: "gray" }}>Regione</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.regione}
                </Text>
              </Left>
              <Left
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: 10,
                  marginRight: 5,
                  marginBottom: 5,
                  borderRadius: 10
                }}
              >
                <Text style={{ fontSize: 12, color: "gray" }}>Provincia</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.provincia}
                </Text>
              </Left>
              <Left
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: 10,
                  marginRight: 5,
                  marginBottom: 5,
                  borderRadius: 10
                }}
              >
                <Text style={{ fontSize: 12, color: "gray" }}>Città</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.citta}
                </Text>
              </Left>
            </CardItem>

            {/* GIORNO ORARIO PREZZO EVENTO */}
            <CardItem
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 10
              }}
            >
              {/* Orario */}
              <Left style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: 20, height: 20, marginRight: 0 }}
                  source={require("../assets/clock.png")}
                />
                <Text style={{ fontSize: 13, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.orario}
                </Text>
              </Left>

              {/* Giorno */}
              <Left style={{ marginRight: 5 }}>
                <Image
                  style={{ width: 20, height: 20, marginRight: 0 }}
                  source={require("../assets/calendar.png")}
                />
                <Text style={{ fontSize: 13, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.data}
                </Text>
              </Left>

              {/* Prezzo */}
              <Left style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: 20, height: 20, marginRight: 0 }}
                  source={require("../assets/money.png")}
                />
                <Text style={{ fontSize: 13, textAlign: "center" }}>
                  {this.props.navigation.state.params.eventInfo.prezzo}
                </Text>
              </Left>
            </CardItem>

            {/* <CardItem  style={{marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                COUNTER PER PACCHETTI DI PIU' GIORNI, TO DO NEXT
                <Left style={{flexDirection: 'row'}}>
                    <Image style={{width:20, height: 20, marginRight:0}} source={require('../assets/stopwatch.png')}/>
                      <Button transparent
                              onPress={() => this.setState({ days: this.state.days>0 ? this.state.days - 1 : 0 })}
                              style={{marginLeft:10,width:50, height:50}}
                      ><Icon style={{}} size={25} color={TINT_COLOR} name='minus-circle'/></Button>
                      <Text style={{marginLeft: -13,marginRight:10}}>{this.state.days}</Text>
                      <Button transparent
                              onPress={() => this.setState({ days: this.state.days + 1 })}
                              style={{width:50, height:50}}
                      ><Icon style={{}} size={25} color={TINT_COLOR} name='plus-circle'/></Button>
                </Left>  */}

            {/* DESCRIZIONE BREVE*/}
            <CardItem
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
                borderRadius: 10
              }}
            >
              <Image
                style={{ width: 20, height: 20, marginRight: 10 }}
                source={require("../assets/description.png")}
              />
              <Text>
                {this.props.navigation.state.params.eventInfo.descrizioneBreve}
              </Text>
            </CardItem>

            {/* DESCRIZIONE LUNGA*/}
            <CardItem
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
                borderRadius: 10
              }}
            >
              <Image
                style={{ width: 20, height: 20, marginRight: 10 }}
                source={require("../assets/description.png")}
              />
              <Text>
                {
                  this.props.navigation.state.params.eventInfo
                    .descrizioneCompleta
                }
              </Text>
            </CardItem>

            {/* AGENZIA E EMAIL */}
            <CardItem
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                borderColor: BACKGROUND_COLOR,
                borderWidth: 1,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                borderRadius: 10
              }}
            >
              <Body style={{ flexDirection: "row", margin: 5 }}>
                <SimpleLineIcons name="user" size={16} />
                <Text style={{ marginLeft: 10 }}>
                  {this.props.navigation.state.params.eventInfo.agenzia}
                </Text>
              </Body>

              <Body style={{ flexDirection: "row", margin: 5 }}>
                <MaterialCommunityIcons name="email-outline" size={16} />
                <Text style={{ marginLeft: 10 }}>
                  {this.props.navigation.state.params.eventInfo.email}
                </Text>
              </Body>

              <Body style={{ flexDirection: "row", margin: 5 }}>
                <Feather name="phone" size={16} />
                <Text style={{ marginLeft: 10 }}>
                  {this.props.navigation.state.params.eventInfo.numero}
                </Text>
              </Body>

              <Body style={{ flexDirection: "row", margin: 5 }}>
                <MaterialCommunityIcons name="facebook" size={16} />
                <Text style={{ marginLeft: 10 }}>
                  {this.props.navigation.state.params.eventInfo.facebook}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}

EventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Evento",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    }
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center"
  },

  searchButton: {
    marginLeft: "10%",
    marginRight: "10%",
    padding: 10,
    backgroundColor: TINT_COLOR,
    borderRadius: 30
  }
});

// newBooking = () => {
//   const userData = {
//     username: "",
//     nome: "",
//     cognome: "",
//     email: "",
//   }
//   const userId = firebase.auth().currentUser.uid;
//   firebase.database().ref("App/Users/" + userId).on("value", snap => {
//     console.log(snap.val())
//     userData.username = snap.val().Username;
//     userData.nome = snap.val().Nome;
//     userData.cognome = snap.val().Cognome
//     userData.email = snap.val().Email
//     console.log("userData")
//     console.log(userData)

//     const booking = {
//       IDcliente: userId,
//       DatiUtente: userData,
//       Stato: "ATTESA"
//     };

//     firebase.database()
//     .ref("App/Events/"+this.props.navigation.state.params.eventInfo.IDevento+"/Prenotazioni/"+userId)
//     .update(booking)

//   });
//     /* IMPORTANTISSIMA NELL'APP AMMINISTRATORE -- NON CANCELLARE
//     var id = firebase
//       .database()
//       .ref("App/" + "Users/" + userId + "/" + "favorites/")
//       .push(newFavorite).key;

//       const setId ={
//         id: id
//       }
//       firebase
//       .database()
//       .ref("App/" + "Users/" + userId + "/" + "favorites/" + id)
//       .update(setId);*/
// }

/* <CardItem >
                  <View style={styles.buttonContainer}>
                    {this.state.booked ?              // Verifico se è stata effettuata la richiesta
                      ( <View>
                          <View style={{borderWidth: 1, borderRadius: 30, borderColor: TINT_COLOR,marginLeft: '10%',marginRight: '10%', padding: 10,}}>
                            <Text style={{textAlign:'center', color: TINT_COLOR }}> Prenotazione Inviata </Text>
                          </View>

                          <TouchableOpacity
                            style={{marginTop:5, borderWidth: 1, borderRadius: 30, borderColor: "red", marginLeft: '10%',marginRight: '10%', padding: 10}}
                            activeOpacity={0.5}
                            onPress={() => this.removeBooking()}
                            title="Prenota"
                          >
                            <Text style={{textAlign:'center', color: "red" }}> Rimuovi richiesta Prenotazione </Text>
                          </TouchableOpacity>
                      </View>

                      )
                      : // Se non è stata fatta visualizzo il pulsante di prenotazione
                      (
                        <TouchableOpacity
                            style={styles.searchButton}
                            activeOpacity={0.5}
                            onPress={() => this.newBooking()}
                            title="Prenota"
                        >
                          <Text style={{textAlign:'center', color: "white" }}> Prenota adesso </Text>
                        </TouchableOpacity>
                      )
                      
                    }
                  </View>
              </CardItem> */
