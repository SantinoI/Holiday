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


export default class Profile extends React.Component {
    state = {
      cardList: [],
      idFavorites:[],
      logged: false
    }

    render() {
      return(
        <View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex: 1}}>
          <ScrollView style={{backgroundColor:BACKGROUND_COLOR}}>
            {/* Visualizza FlatList solo se cardList[] > 0 */}

            {this.state.logged == true ? (
              this.state.cardList.length ? (
                <FlatList
                  data={this.state.cardList}
                  renderItem={this.renderCard}
                  keyExtractor={this._keyExtractor}
                />) :
                (<Text style={styles.noResultText}>Nessun Evento tra i preferiti :( </Text>)
            ) :
             (<Text style={styles.noResultText}> Non sei loggato </Text>)}

            
          </ScrollView>
        </View>
        
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
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
