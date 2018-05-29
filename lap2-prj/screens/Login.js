import React from 'react';

import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class LoginForm extends React.Component {
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
      <View style={{ justifyContent: "space-between", height: "40%"}}>
        <Button style={{marginTop: 50}}
          loading = {this.state.isLoading}
          raised
          backgroundColor = {TINT_COLOR}
          title="Login"
          onPress={this._login}
        />

        <Button style={{marginTop: 50}}
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
      <View>
        <Card>
          <FormLabel>E-mail</FormLabel>
            <FormInput
              label="E-mail"
              placeholder="enter a valid e-mail"
              onChangeText={text => this.setState({ email: text })}
              //value={this.state.email}
            />
          <FormLabel>Password</FormLabel>
            <FormInput
              label="password"
              placeholder="enter password"
              onChangeText={text => this.setState({ password: text })}
              //value={this.state.password}
            />
          
          {this.renderLoginOrSpinner()}
          <Text>{this.state.error}</Text>
        </Card>
      </View>
    );
  }
}
