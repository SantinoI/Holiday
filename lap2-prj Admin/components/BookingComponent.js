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
    selected: null,
  }

  async componentWillMount() {
  }

  render() {
    return (
      <View style={styles.row}>
        <View>
          <Text> Evento: {this.props.nomeEvento}</Text>
          <Text> Utente richiedente: {this.props.username}</Text>
          <Text> nome: {this.props.nomeUtente}   cognome:{this.props.cognomeUtente}</Text>
          <Text> Email: {this.props.emailUtente}</Text>
        </View>

        {this.state.selected == true ? 
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
      }
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
