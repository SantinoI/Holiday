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
  Alert,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";

import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Container, Button } from 'native-base';

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar } from "react-native-elements";
import EventCard from "../components/EventCard";

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";



export default class Profile extends React.Component {
    state = {
      profileImage: null,
      logged: false
    }

    _loadDatabase = async => {
      const uid = firebase.auth().currentUser.uid;
      //console.log(uid);
      this.uid = uid;
      if (uid) {
        this.setState({imageLoading: true})
        firebase.database().ref("App/Users/" + uid + "/ProfileImage")
          .on("value", snap => {
            let imageURL = snap.val()
            console.log(snap.val())
            this.setState({ profileImage: imageURL });
          });
        this.setState({imageLoading: false})
      }
    }

    componentWillMount() {
      this._loadDatabase();

      firebase.auth().onAuthStateChanged( user => {
        this.setState({logged: !this.state.logged})
      })
    }

    renderNotLog() {
      return (
        <View style={{marginTop: -75, marginBottom: 20,alignSelf: 'center'}}>
          <Text style={styles.noResultText}> Non sei loggato </Text>
        </View>
      );
    }

    renderLog() {
      return (
        <ScrollView style={{ paddingTop: 50,marginBottom: -88}}>
          <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:60, borderRadius: 10}}>
                <TouchableOpacity style={{marginTop: -75 ,marginBottom: 0, alignSelf: 'center'}}>
                  <Image
                    resizeMode="cover"
                    rounded
                    style= {{borderRadius:80, width: 160, height: 160}}
                    source = {  this.state.profileImage ? { uri: this.state.profileImage } : require("../assets/image.png")}
                    />                    
                </TouchableOpacity>

                <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
                <Text style={{fontSize: 24, textAlign: 'center'}}> Nome Utente </Text>
                </CardItem>

                {/* AGENZIA E EMAIL */}
                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                  <Text>Informazioni personali</Text>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                  <SimpleLineIcons name='user' size={16}/>
                  <Text style={{marginLeft: 10}}>nome cognome</Text>
                  </Body>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='email-outline' size={16}/>
                    <Text style={{marginLeft: 10}}>email</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                    <Feather name='phone' size={16}/>
                    <Text style={{marginLeft: 10}}>numero</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                      <MaterialCommunityIcons name='facebook' size={16}/>
                      <Text style={{marginLeft: 10}}>facebook</Text>
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
             </Card>
          </ScrollView>
      );
    }

    render() {
      return(
        <View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex: 1}}>
            {this.state.logged ? (this.renderLog()) : (this.renderNotLog())}          
        </View>
        
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {

  _onAccountPress = () => {
    var uid = firebase.auth().currentUser;

    if (!uid) {
      // Alert.alert(
      //   'Accedi',
      //   '',
      //   [
      //     {text: 'Log-in', onPress: () => navigation.navigate("Login")},
      //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   ],
      //   { cancelable: false }
      // )
      navigation.navigate("Login")
    }
    else {
      Alert.alert(
        'Ciao ' + firebase.auth().currentUser.uid.displayName + '!',
        '',
        [
          {text: 'Log-out', onPress: () => firebase.auth().signOut()},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  };

  return {
      title: "Profile",
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableOpacity onPress={() => _onAccountPress()}>
          <SimpleLineIcons
            style={{ paddingHorizontal: 15 }}
            name="options-vertical"
            size={20}
            //color={TINT_COLOR}
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
