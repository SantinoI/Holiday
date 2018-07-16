import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Content, Card, CardItem, Thumbnail, Center ,Left, Body, Right, Container, Button } from 'native-base';

import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "../node_modules/react-native-gesture-handler";

const TINT_COLOR = "rgb(4, 159, 239)";
const BACKGROUND_COLOR = "#d7e4e5";


export default class BookingComponent extends React.Component {
  state={
    stato: this.props.data.stato,
  }

  async componentWillMount() {
    //console.log(this.state.stato)
  }

  select = (selection) => {
    this.props.onSelect(selection);
    this.setState({stato: selection})
  }

  renderBookingComponentState = () => {
    if (this.state.stato == "ATTESA") {
      return (
        <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10,flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.selectionButtonAccept} onPress={() => this.select("ACCETTATA")}>
              <Text style={{textAlign:'center', color: "green" }}> Accetta </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectionButtonDeny} onPress={() => this.select("RIFIUTATA")}>
            <Text style={{textAlign:'center', color: "red" }}> Rifiuta </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if(this.state.stato == "ACCETTATA") {
      return (
      <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10,flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{textAlign:'center', color: "green" }}>ACCETTATA</Text>
      </View>
      )
    }
    else if(this.state.stato == "RIFIUTATA") {
      return (
      <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10,flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{textAlign:'center', color: "red" }}>RIFIUTATA</Text>
      </View>
      )
    }
  }

  renderEventName = () => {
    return (
      <CardItem style={{marginTop: 10, flexDirection: 'column', justifyContent: 'center', borderRadius: 25}}>
        <Text style={{fontSize: 12, color: 'gray'}}>Evento</Text>
        <Text style={{fontSize: 18, textAlign: 'center'}}>{this.props.data.nomeEvento}</Text>
      </CardItem>
    );
  }

  renderDataEPrice = () => {
    return (
      <CardItem style={{marginTop:-10 }}>
            <Left style={{ flexDirection: 'column'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>Data</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{this.props.data.data}</Text>
            </Left>
            <Left style={{ flexDirection: 'column'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>Prezzo</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{this.props.data.prezzo}</Text>
            </Left>
      </CardItem>
    );
  }

  renderUserInfo = () => {
    return (
      <CardItem style={{marginTop:-10 }}>
            <Left style={{ flexDirection: 'column'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>Utente Richiedente</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{this.props.data.nome} {this.props.data.cognome}</Text>
            </Left>
            <Left style={{ flexDirection: 'column'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>Username</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>@{this.props.data.username}</Text>
            </Left>
      </CardItem>
    );
  }

  renderUserEmail = () => {
    return (
      <CardItem style={{marginTop:-10, flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={{fontSize: 12, color: 'gray'}}>Email</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{this.props.data.email}</Text>
      </CardItem>
    );
  }

  render() {
    return (
        <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 25 }}> 
          {this.renderEventName()}
          {this.renderDataEPrice()}
          {this.renderUserInfo()}
          {this.renderUserEmail()}
          {this.renderBookingComponentState()}
        </Card>
    
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginLeft: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginRight: 10,
    padding: 10
  },
  selectionButtonAccept: {
    marginLeft: '5%',
    marginRight: '5%',
    width: 100,
    //height: 30,
    padding: 10,
    //marginTop: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"green"
  },
  selectionButtonDeny: {
    marginLeft: '5%',
    marginRight: '5%',
    width: 100,
    //marginTop: 5,
    //height: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"red"
  },
  selectionDone: {
    marginLeft: '5%',
    marginRight: '5%',
    width: 100,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    //height: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"grey"
  },

  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10
  }
});
