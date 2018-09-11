import React from 'react';

import {
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

import { Permissions, Notifications } from 'expo';

import { Button, FormLabel, FormInput } from "react-native-elements";
import { Text, Form, Item, Label, Input, Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import * as firebase from "firebase";


const TINT_COLOR = "rgb(4, 159, 239)";
const BACKGROUND_COLOR = "#d7e4e5";
const TINT_COLOR2 = "#39b9c3";


export default class Login extends React.Component {

  state = {
    isLoading: false,
    email: "nuovo@gmail.com",
    password: "pippo1234",
    error: ""
  };

  registerForPushNotificationsAsync = async () => {
    const userUid = firebase.auth().currentUser.uid;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // verranno richiesti solo se non sono già stati concessi,
    // ios non li chiederà necessariamente una seconda volta
    if (existingStatus !== 'granted') {
      // i permessi di notifica sono garantiti durante l'installazione dell'app
      // questo messaggio sarà visualizzato solo su ios
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // fermati qui se l'utente non ha concesso i permessi 
    if (finalStatus !== 'granted') {
      return;
    }
    // prendi il token che identifica univocamente il device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)

    console.log(userUid)
    firebase.database().ref("App/Users").child(userUid).update({ExpoToken: token})

  } 

  _login = () => {
    this.setState({isLoading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)

      .then(user => {
        this.setState({ isLoading: false });
        console.log(user);
        this.registerForPushNotificationsAsync();
        {this.props.navigation.navigate("Profile")}
      })
      .catch(error=> {
        this.setState({error: error.message, isLoading: false})
      });
  }

  render() {
    return (

      <Container style={{padding:25, backgroundColor: BACKGROUND_COLOR}}>
        
          <Card style={{padding:30, borderRadius: 10}}>
                
                  <Form>
                    <Item floatingLabel>
                      <Label style={{}} >E-mail</Label>
                      <Input  onChangeText={text => this.setState({ email: text })}
                               //value={this.state.email} 
                      />
                    </Item>
                    <Item floatingLabel last style={{marginTop:25}} >
                      <Label>Password</Label>
                      <Input  onChangeText={text => this.setState({ password: text })}
                               //value={this.state.password} 
                      />
                    </Item>
                  </Form>
                
                      <Button rounded
                          backgroundColor = {TINT_COLOR2}
                          loading = {this.state.isLoading}
                          raised
                          title="Login"
                          onPress={this._login}
                          containerViewStyle={styles.buttonContainer}
                          activeOpacity={0.5}
                      />
                  
                      <Button rounded
                          backgroundColor = {TINT_COLOR2}
                          raised
                          title="Registrati"
                          onPress={() => this.props.navigation.navigate("RegisterPage")}
                          containerViewStyle={styles.buttonContainer}
                          activeOpacity={0.5}
                      />
                 
                  <View>
                    <Text>{this.state.error}</Text>
                  </View>
    
             </Card> 
    </Container>
    );
  }
  
}

Login.navigationOptions = ({ navigation }) => {
  return {
    title: "Login",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
    headerLeft: null
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 35,
    justifyContent: "center",
    borderRadius: 30,
  },

  searchButton: { 
    padding: 10,
    backgroundColor: TINT_COLOR2,
    borderRadius: 30,
  },
});
