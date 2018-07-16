import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const TINT_COLOR = "rgb(4, 159, 239)";

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
        <View style={{alignItems: "flex-end"}}>
          <TouchableOpacity style={styles.selectionButtonAccept} onPress={() => this.select("ACCETTATA")}>
              <Text style={{textAlign:'center', color: "green" }}> accetta </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectionButtonDeny} onPress={() => this.select("RIFIUTATA")}>
            <Text style={{textAlign:'center', color: "red" }}> Rifiuta </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if(this.state.stato == "ACCETTATA") {
      <View style={styles.selectionDone}>
        <Text style={{textAlign:'center', color: "grey" }}>ACCETTATA</Text>
      </View>
    }
    else if(this.state.stato == "RIFIUTATA") {
      <View style={styles.selectionDone}>
        <Text style={{textAlign:'center', color: "grey" }}>RIFIUTATA</Text>
      </View>
    }
  }

  render() {
    return (
      <View style={styles.row}>
        <View>
          <Text> Evento: {this.props.data.nomeEvento}</Text>
          <Text> Utente richiedente: {this.props.data.username}</Text>
          <Text> nome: {this.props.data.nome}   cognome:{this.props.data.cognome}</Text>
          <Text> Email: {this.props.data.email}</Text>
        </View>

        {this.renderBookingComponentState()}

        {/* {this.state.stato == "ATTESA" ? 
        (
          <View style={styles.selectionDone}>
              <Text style={{textAlign:'center', color: "grey" }}> Confermato </Text>
          </View>
        )
        :
        (
          <View style={{alignItems: "flex-end"}}>
          <TouchableOpacity style={styles.selectionButtonAccept} onPress={() => this.props.onSelect("ACCETTATA")}>
              <Text style={{textAlign:'center', color: "green" }}> accetta </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectionButtonDeny} onPress={() => this.props.onSelect("RIFIUTATA")}>
            <Text style={{textAlign:'center', color: "red" }}> Rifiuta </Text>
          </TouchableOpacity>
        </View>
        )
      } */}
    </View>
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
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"green"
  },
  selectionButtonDeny: {
    marginLeft: '5%',
    marginRight: '5%',
    width: 100,
    marginTop: 5,
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
