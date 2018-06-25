import React from 'react';

import {
  StyleSheet,
  Platform,
	Image,
	ActionSheetIOS,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
	Dimensions,
	Alert
} from "react-native";

import {
  ImagePicker,
  ImageManipulator,
  Permissions,
} from "expo";

import { Button, FormLabel, FormInput } from "react-native-elements";
import { Text, Form, Item, Label, Input, Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import * as firebase from "firebase";


const TINT_COLOR = "rgb(4, 159, 239)";
const BACKGROUND_COLOR = "#d7e4e5";
const TINT_COLOR2 = "#39b9c3";


export default class RegisterPage extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  state = {
		correct: false,
    isLoading: false,
    username:"",
    nome:"",
    cognome:"",
		email: "",
		confirmEmail:"",
    password: "",
    error: ""
  };


  _singUp = () => {
		if (this.state.email !== this.state.confirmEmail) {
			Alert.alert(
				'le email non coincidono',
				'',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
				{ cancelable: false }
			)
			return;
		}
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
      console.log(manipResult);
      this.setState({ image: manipResult.uri });
    }
  };

	_selectPhoto = () => {
    console.log("show actions sheet");
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ["Camera", "Photo Gallery", "Cancel"],
        cancelButtonIndex: 2,
        title: "Scegli immagine da:"
      },
      (buttonIndex) => {
        if (buttonIndex == 1) {
          this._openPhotoGallery();
        }
      });
    }
  }


  render() {
    return (
      
      <Container style={{padding:25, backgroundColor : BACKGROUND_COLOR}}>
        
          <Card style={{padding:30, borderRadius: 10}}>
                
                <ScrollView>
                  <Form>

											<TouchableOpacity style={{alignSelf: 'center'}} onPress={this._selectPhoto}>
												<Image
                          resizeMode="cover"
                          rounded
													style= {{borderRadius:60, width: 120, height: 120}}
													source = { this.state.image
													? { uri: this.state.image }
													: require("../assets/image.png")
													}
												/>
											</TouchableOpacity>

                  <Item floatingLabel>
                      <Label style={{}} >Username</Label>
                      <Input  onChangeText={text => this.setState({ username: text })}
                      />
                    </Item>           

                    <Item floatingLabel>
                      <Label style={{}} >Nome</Label>
                      <Input  onChangeText={text => this.setState({ nome: text })}
                      />
                    </Item>                    

                    <Item floatingLabel>
                      <Label style={{}} >Cognome</Label>
                      <Input  onChangeText={text => this.setState({ cognome: text })}
                      />
                    </Item>           
                      
                  <Item floatingLabel>
                      <Label style={{}} >E-mail</Label>
                      <Input  onChangeText={text => this.setState({ email: text })}
                      />
                    </Item>

									<Item floatingLabel>
                      <Label style={{}} >confirm E-mail</Label>
											<Input  onChangeText={text => this.setState({ confirmEmail: text })}

                      />
                  </Item>

                    <Item floatingLabel last style={{marginTop:25}} >
                      <Label>Password</Label>
                      <Input  onChangeText={text => this.setState({ password: text })} 
                      />
                    </Item>


                  </Form>
                
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
                

</ScrollView>

             </Card>
             
    </Container>
    );
  }
  
}

RegisterPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Inserisci le informazioni",
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



