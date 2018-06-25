import React from 'react';

import {
  StyleSheet,
  Platform,
  
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import { Text, Form, Item, Label, Input, Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import * as firebase from "firebase";


const TINT_COLOR = "rgb(4, 159, 239)";
const BACKGROUND_COLOR = "#d7e4e5";
const TINT_COLOR2 = "#39b9c3";


export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  state = {
    isLoading: false,
    email: "nuovo@gmail.com",
    password: "pippo1234",
    error: ""
  };

  _login = () => {
    this.setState({isLoading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)

      .then(user => {
        this.setState({ isLoading: false });
        console.log(user);
        this.props.navigation.navigate("Home");
      })
      .catch(error=> {
        this.setState({error: error.message, isLoading: false})
      });
  }

  _singUp = () => {
    this.setState({isLoading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)

      .then(user => {
        this.setState({ isLoading: false });
        console.log(user);
        this.props.navigation.navigate("Home");
      })
      .catch(error=> {
        this.setState({error: error.message, isLoading: false})
      });
  }

  

  renderLoginOrSpinner() {
    return (
      <View style={{ backgroundColor: BACKGROUND_COLOR, justifyContent: "space-between", height: "40%"}}>
        <Button style={{marginTop: 50}}
          loading = {this.state.isLoading}
          raised
          backgroundColor = {TINT_COLOR}
          title="Login"
          onPress={this._login}
        />

        <Button style={{marginTop: 40}}
          loading = {this.state.isLoading}
          raised
          backgroundColor = {TINT_COLOR}
          title="Register"
          onPress={this._singUp}
        />

      </View>
    );
  }

  render() {
    return (
      
      <Container style={{padding:25, backgroundColor : BACKGROUND_COLOR}}>
        
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
                
                  
                  <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          loading = {this.state.isLoading}
                          raised
                          title="Login"
                          onPress={this._login}
                          style={styles.searchButton}
                          activeOpacity={0.5}
                      >
                        <Text style={{textAlign:'center', color: "white" }}> Login </Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          loading = {this.state.isLoading}
                          raised
                          title="Register"
                          onPress={this._singUp}
                          style={styles.searchButton}
                          activeOpacity={0.5}
                      >
                        <Text style={{textAlign:'center', color: "white" }}> Registrati </Text>
                      </TouchableOpacity>
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
    
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 35,
    justifyContent: "center"
  },

  searchButton: {
    
    padding: 10,
    backgroundColor: TINT_COLOR2,
    borderRadius: 30,
  },
});

{/* <View >
        
            <FormLabel>E-mail</FormLabel>
            <FormInput
              label="E-mail"
              placeholder="Inserisci la tua email"
              onChangeText={text => this.setState({ email: text })}
              //value={this.state.email}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              label="password"
              placeholder="Inserisci password"
              onChangeText={text => this.setState({ password: text })}
              //value={this.state.password}
            />
          
          {this.renderLoginOrSpinner()}
          <Text>{this.state.error}</Text>
          
        
      </View> */}


