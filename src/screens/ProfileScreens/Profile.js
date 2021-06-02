import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Strings from '../Theme/Strings';
import Images from '../Theme/Images';
import Colors from '../Theme/Colors';
import Cards from '../../Components/Cards';
import {getRentById, getRenterProfile} from '../../Api/Yelp';
import roots from '../../Navigator/roots';
const {width} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [myProfile, setMyProfile] = useState(null);
  const [rents, setRents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = useCallback(async () => {
    const data = await getRenterProfile();
    setMyProfile(data.data);
    getAllRents(data.data);
  }, []);
  const getAllRents = data => {
    const tempArray = [];
    data.rentHistory.map(async item => {
      tempArray.push(await getRentById(item));
    });
    setRents(tempArray);
    setLoading(false);
  };
  const navigateToApartment = id => {
    navigation.navigate(roots.Apartment, {id});
  };
  const renderData = useCallback(
    (item, apartments) => {
      return (
        <View style={styles.mainView}>
          <ImageBackground
            style={styles.backgroundPictureStyle}
            source={{uri: item.coverImage}}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Image source={Images.editProfileButtonIcon} />
            </TouchableOpacity>
            <View style={styles.profilePictureView}>
              <Image
                style={styles.profilePictureStyle}
                source={{uri: item.profileImage}}></Image>
              {item.isVerified == true ? (
                <Image
                  style={styles.isVerifiedPin}
                  source={Images.verifiedIcon}
                />
              ) : null}
              <Text style={styles.userNameTextStyle}>{item.name}</Text>
            </View>
          </ImageBackground>
          <ScrollView style={styles.locationContainer}>
            <View style={styles.locationView}>
              <Image
                style={styles.locationIcon}
                source={Images.locationIcon}></Image>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <Text style={styles.lineText}>{Strings.profile.labels.line}</Text>
            <Text style={styles.aboutMeText}>{item.description}</Text>
            <View style={styles.historySettingsView}>
              <TouchableOpacity style={styles.historySettingsButton}>
                <Text style={styles.historySettingsText}>
                  {Strings.profile.buttons.rentHistory}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.historySettingsButton}>
                <Text style={styles.historySettingsText}>
                  {Strings.profile.buttons.settings}
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.cardList}
              contentContainerStyle={styles.cardListContainer}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={apartments => apartments.id}
              data={apartments}
              renderItem={({item}) => {
                return (
                  <Cards
                    item={item}
                    navigateToApartment={navigateToApartment}
                  />
                );
              }}></FlatList>
          </ScrollView>
        </View>
      );
    },
    [isLoading],
  );
  return (
    <SafeAreaView style={styles.mainView}>
      {myProfile && rents && !isLoading && renderData(myProfile, rents)}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  mainView: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: '10@vs',
  },
  backgroundPictureStyle: {
    width,
    height: '200@vs',
    resizeMode: 'contain',
  },
  profilePictureView: {
    borderRadius: '40@s',
    flexDirection: 'row',
  },
  profilePictureStyle: {
    height: '78@vs',
    width: '78@s',
    borderRadius: '80@s',
    marginLeft: '26@s',
    marginTop: '64@vs',
    resizeMode: 'cover',
  },
  editProfileButton: {
    height: '40@vs',
    width: '40@s',
    marginTop: '28@vs',
    marginLeft: '24@s',
    alignItems: 'center',
  },
  isVerifiedPin: {
    height: '21@vs',
    width: '21@s',
    borderRadius: '18@s',
    marginLeft: '84@s',
    marginTop: '64@vs',
    position: 'absolute',
  },
  userNameTextStyle: {
    height: '30@vs',
    fontSize: '22@s',
    fontWeight: '700',
    color: Colors.darkGrey,
    marginLeft: '10@vs',
    marginTop: '110@vs',
  },
  locationContainer: {marginTop: 10},
  locationView: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '26@s',
    marginTop: '43@vs',
  },
  locationIcon: {
    width: '8@s',
    height: '8@vs',
    marginBottom: '4@vs',
  },
  locationText: {
    height: '20@vs',
    fontWeight: '400',
    paddingLeft: '4@s',
    fontSize: '12@s',
    color: Colors.grey,
  },
  lineText: {
    fontWeight: '400',
    fontSize: '20@s',
    color: Colors.grey,
    marginLeft: '24@s',
  },
  aboutMeText: {
    fontWeight: '400',
    fontSize: '12@s',
    color: Colors.grey,
    marginLeft: '24@s',
    marginTop: '8@vs',
  },
  historySettingsView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '24@vs',
  },
  historySettingsButton: {
    height: '28@vs',
    paddingLeft: '24@s',
    alignItems: 'center',
  },
  historySettingsText: {
    fontWeight: '700',
    fontSize: '14@s',
    color: Colors.darkGrey,
  },
  cardList: {
    width: '100%',
  },
  cardListContainer: {
    paddingHorizontal: '20@s',
  },
  cardPhoto: {
    height: '194@vs',
    width: '100%',
    borderRadius: '16@s',
    marginTop: '16@vs',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  heartButton: {
    width: '16@s',
    height: '16@vs',
    marginLeft: '85%',
    marginTop: '16@vs',
  },
  milesButton: {
    width: '88@s',
    height: '24@vs',
    marginLeft: '24@s',
    marginTop: '-16@vs',
    backgroundColor: Colors.lightRed,
    alignItems: 'center',
    borderRadius: '4@s',
  },
  milesText: {
    fontSize: '14@s',
    color: Colors.white,
    paddingVertical: '2@vs',
  },
  detailsView: {
    height: '20@vs',
    marginTop: '12@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    width: '150@s',
    height: '22@vs',
    fontSize: '16@s',
    fontWeight: '700',
    flex: 7,
  },
  perDayText: {
    width: '42@s',
    height: '20@vs',
    fontSize: '12@s',
    color: Colors.grey,
    marginTop: '4@s',
    flex: 1,
    alignSelf: 'center',
  },
  priceText: {
    width: '36@s',
    height: '20@vs',
    fontSize: '14@s',
    color: Colors.lightBlue,
    flex: 1,
  },
  cardLocationView: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Profile;
