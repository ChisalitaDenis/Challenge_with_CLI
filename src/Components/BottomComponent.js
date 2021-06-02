import React from 'react';
import {TouchableOpacity, View, ImageBackground} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Images from '../screens/Theme/Images';
import {useNavigation} from '@react-navigation/native';
import roots from '../Navigator/roots';

const BottomComponent = () => {
  const navigation = useNavigation();
  const navigateToProfile = id => {
    navigation.navigate(roots.MyProfile, {id});
  };
  return (
    <View style={styles.buttons}>
      <TouchableOpacity>
        <ImageBackground style={styles.button} source={Images.homeButtonIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <ImageBackground style={styles.button} source={Images.blackHeartIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <ImageBackground style={styles.button} source={Images.mailIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateToProfile(1);
        }}>
        <ImageBackground style={styles.button} source={Images.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  buttons: {
    paddingHorizontal: '38@s',
    marginHorizontal: '24@vs',
    height: '38@vs',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: '22@s',
    height: '20@vs',
    resizeMode: 'contain',
  },
});

export default BottomComponent;
