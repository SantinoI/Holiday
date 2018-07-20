import React from "react";

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

import { ImagePicker, ImageManipulator } from "expo";

import { Button, FormLabel, FormInput } from "react-native-elements";
import {
  Text,
  Form,
  Item,
  Label,
  Input,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Container
} from "native-base";
import { Permissions, Notifications } from 'expo';
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
    profileImage:"",
    username: "",
    sede: "",
    numero: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  upload_data_user = () => {
    const userId = firebase.auth().currentUser.uid;
    const data = {
      ProfileImage: this.state.profileImage,
      Username: this.state.username,
      Sede: this.state.sede,
      Numero: this.state.numero,
      Email: this.state.email,
      Uid: userId
    };

    firebase
      .database()
      .ref("App/" + "Organizzatori/" + userId)
      .update(data);
    
    this._uploadImage(this.state.profileImage);
  };

  registerForPushNotificationsAsync = async () => {
    const userUid = firebase.auth().currentUser.uid;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
  
    // var updates = {}
    // updates['/expoToken'] = token;
    console.log(userUid)
    firebase.database().ref("App/Organizzatori").child(userUid).update({ExpoToken: token})
  
  } 

  _singUp = () => {
    //controlli sulla compilazione di tutti i campi, controllo coincidenza email e pass, controllo pass.lenght  >= 8
    if (
      !(
        this.state.username &&
        this.state.sede &&
        this.state.email &&
        this.state.confirmEmail &&
        this.state.password &&
        this.state.confirmPassword
      )
    ) {
      Alert.alert(
        "Riempi i campi vuoti per poterti registrare",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }

    if (!(this.state.email === this.state.confirmEmail)) {
      Alert.alert(
        "Le email non coincidono",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }

    if (!(this.state.password === this.state.confirmPassword)) {
      Alert.alert(
        "Le password non coincidono",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }

    if (this.state.password.length < 8) {
      Alert.alert(
        "La password deve essere di almeno 8 caratteri",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }

    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        this.upload_data_user();
        this.registerForPushNotificationsAsync();
        this.props.navigation.navigate("Profile");
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

   //Carimecameno foto nello storage e nel DB
   _uploadImage = async localURI => {
    const uid = firebase.auth().currentUser.uid;
    const response = await fetch(localURI);
    const blob = await response.blob();
   
    const ref = firebase
      .storage()
      .ref("Users/" + uid +"/UserImages/"+ this.state.username )
    const uploadStatus = await ref.put(blob);
    const downloadURL = await uploadStatus.ref.getDownloadURL();
   
    firebase
    .database()
    .ref("App/Organizzatori/" + uid)
    .update({ProfileImage: downloadURL})

    this.setState({profileImage : downloadURL});
  };

  //Apertura galleria per choosing foto profilo utente
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
      this.setState({ profileImage: manipResult.uri });
    }
  };

  _selectPhoto = () => {
    console.log("show actions sheet");
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Camera", "Photo Gallery", "Cancel"],
          cancelButtonIndex: 2,
          title: "Scegli immagine da:"
        },
        buttonIndex => {
          if (buttonIndex == 1) {
            this._openPhotoGallery();
          }
        }
      );
    }
  };

  render() {
    return (
      <Container style={{ padding: 25, backgroundColor: BACKGROUND_COLOR }}>
        <Card style={{ marginTop: 40, padding: 10, borderRadius: 10 }}>
          
          {/* Immagine utente che rimane fissa in top */}
          <TouchableOpacity
            style={{ marginTop: -50, marginBottom: 20, alignSelf: "center" }}
            onPress={this._selectPhoto}
          >
            <Image
              resizeMode="cover"
              rounded
              style={{ borderRadius: 60, width: 120, height: 120 }}
              source={
                this.state.profileImage
                  ? { uri: this.state.profileImage }
                  : require("../assets/imagep.png")
              }
            />
          </TouchableOpacity>
          {/* Form vero e proprio all'interno di un scroll */}
          <ScrollView>
            <Form style={{ marginTop: 0 }}>
              <Item floatingLabel style={{ marginTop: 0 }}>
                <Label style={{}}>Nome</Label>
                <Input
                  onChangeText={text => this.setState({ username: text })}
                />
              </Item>

              <Item floatingLabel>
                <Label style={{}}>Sede</Label>
                <Input onChangeText={text => this.setState({ sede: text })} />
              </Item>
              
              <Item floatingLabel>
                <Label style={{}}>numero</Label>
                <Input onChangeText={text => this.setState({ numero: text })} />
              </Item>

              <Item floatingLabel>
                <Label style={{}}>E-mail</Label>
                <Input onChangeText={text => this.setState({ email: text })} />
              </Item>

              <Item floatingLabel>
                <Label style={{}}>Conferma E-mail </Label>
                <Input
                  onChangeText={text => this.setState({ confirmEmail: text })}
                />
              </Item>

              <Item floatingLabel last style={{ marginTop: 25 }}>
                <Label>Password</Label>
                <Input
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>

              <Item floatingLabel last style={{ marginTop: 25 }}>
                <Label>Conferma Password</Label>
                <Input
                  onChangeText={text =>
                    this.setState({ confirmPassword: text })
                  }
                />
              </Item>
            </Form>
          </ScrollView>
          {/* Tasto registrati, quando si clicca si attivano i controlli */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              loading={this.state.isLoading}
              raised
              title="Register"
              onPress={this._singUp}
              style={styles.searchButton}
              activeOpacity={0.5}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                {" "}
                Registrati{" "}
              </Text>
            </TouchableOpacity>
          </View>
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
    }
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
    borderRadius: 30
  }
});
