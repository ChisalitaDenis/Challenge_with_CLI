import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Images from '../Theme/Images';
import Strings from '../Theme/Strings';
import Colors from '../Theme/Colors';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.mainView}>
      <View style={styles.logoView}>
        <Image style={styles.logoImage} source={Images.logInLogo} />
      </View>
      <View style={styles.functionalView}>
        <View style={styles.greetingsView}>
          <Text style={styles.greetingsText}>
            {Strings.signIn.labels.welcome}
          </Text>
          <Text style={styles.signInMessage}>
            {Strings.signIn.labels.logInMessage}
          </Text>
        </View>
        <View style={styles.inputView}>
          <View style={styles.textInputView}>
            <Image style={styles.inputIcons} source={Images.profileIcon} />
            <TextInput
              autoCorrect={false}
              placeholder={Strings.signIn.labels.emailPlaceHolder}
              style={styles.inputText}
              onChangeText={setEmail}
              value={email}></TextInput>
          </View>
          <View style={styles.textInputView}>
            <Image style={styles.inputIcons} source={Images.keyIcon} />
            <TextInput
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={Strings.signIn.labels.passwordPlaceHolder}
              style={styles.inputText}
              onChangeText={setPassword}
              value={password}></TextInput>
          </View>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.authentificationButtons}>
            <Text style={styles.buttonText}>
              {Strings.signIn.buttons.continue}
            </Text>
            <Text style={styles.greaterText}>
              {Strings.signIn.labels.greater}
            </Text>
          </TouchableOpacity>
          <View style={styles.orView}>
            <Image style={styles.lineImage} source={Images.line} />
            <Text style={styles.textOr}>{Strings.signIn.labels.or}</Text>
            <Image style={styles.lineImage} source={Images.line} />
          </View>
          <TouchableOpacity style={styles.authentificationButtons}>
            <Text style={styles.buttonText}>
              {Strings.signIn.buttons.register}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  mainView: {
    flex: 8,
    alignContent: 'center',
    marginTop: '20@vs',
  },
  logoView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: '100%',
    resizeMode: 'contain',
  },
  functionalView: {
    flex: 6,
  },
  greetingsView: {
    flex: 1,
    alignItems: 'center',
  },
  greetingsText: {
    fontSize: '12@s',
    color: Colors.darkGrey,
  },
  signInMessage: {
    fontSize: '30@s',
    color: Colors.darkGrey,
  },
  inputView: {
    flex: 2,
    justifyContent: 'space-between',
  },
  buttonsView: {
    flex: 2,
  },
  textInputView: {
    flex: 1,
    marginVertical: '14@vs',
    marginHorizontal: '16@s',
    borderRadius: '28@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  inputIcons: {
    flex: 1,
    marginLeft: '6@s',
    height: '30%',
    resizeMode: 'contain',
  },
  inputText: {
    marginLeft: '10@s',
    height: '60%',
    fontSize: '16@s',
    flex: 6,
  },
  authentificationButtons: {
    flex: 1,
    marginVertical: '10@vs',
    marginHorizontal: '16@s',
    borderRadius: '28@s',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
  },
  orView: {
    flex: 0.5,
    flexDirection: 'row',
    marginVertical: '2@vs',
    marginHorizontal: '16@s',
    alignContent: 'center',
  },
  textOr: {
    flex: 1,
    marginTop: '4@vs',
    marginHorizontal: '2@s',
    textAlign: 'center',
  },
  lineImage: {
    flex: 3,
    resizeMode: 'cover',
    height: '100%',
    borderRadius: '8@s',
  },
  buttonText: {
    fontSize: '14@s',
    color: Colors.white,
  },
  greaterText: {
    fontSize: '20@s',
    color:Colors.white,
    marginLeft:'8@s'
  },
});

export default SignInScreen;
