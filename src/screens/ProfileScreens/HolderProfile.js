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
import {getRentById, getHostProfile} from '../../Api/Yelp';
import roots from '../../Navigator/roots';
const {width} = Dimensions.get('window');

const HolderProfile = ({navigation, route}) => {
  const [holderProfile, setHolderProfile] = useState(null);
  const [rents, setRents] = useState([]);
  useEffect(() => {
    fetchHolderProfile(route.params.id);
  }, [route.params.id]);
  const fetchHolderProfile = useCallback(
    async hostProfileID => {
      const data = await getHostProfile(hostProfileID);
      setHolderProfile(data);
      getAllRents(data);
    },
    [route.params.id],
  );
  const getAllRents = data => {
    const tempArray = [];
    data.rents.map(async item => tempArray.push(await getRentById(item)));
    setRents(tempArray);
  };
  const navigateToApartment = id => {
    navigation.navigate(roots.Apartment, {id});
  };
  const renderStars = item => {
    return new Array(item.stars).fill(0).map(() => {
      return <Image style={styles.starsIcons} source={Images.starIcon}></Image>;
    });
  };
  const renderData = useCallback(
    item => {
      return (
        <View style={styles.mainView}>
          <ImageBackground
            style={styles.backgroundPictureStyle}
            source={{uri: item.coverImage}}>
            <TouchableOpacity style={styles.backButton}>
              <Image source={Images.backButton} />
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
            </View>
          </ImageBackground>
          <ScrollView style={styles.mainScrollView}>
            <Text style={styles.userNameTextStyle}>{item.name}</Text>
            <View style={styles.locationView}>
              <Image
                style={styles.locationIcon}
                source={Images.locationIcon}></Image>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            {/* <View style={styles.reviewView}>
            { reviews for holder to do }
            {renderStars(item.review)}
            <Text style={styles.reviewsText}>
              {item.review.noOfReviews}
              {Strings.holderprofile.labels.review}
            </Text>
          </View> */}
            {/* <View style={styles.languagesView}>
            <Image source={Images.languageIcon} />
            <Text style={styles.languagesText}>
              {Strings.holderprofile.labels.speaks}
              {item.speakerOf.join(", ")}
            </Text>
          </View>
          to do languages */}
            <View style={styles.contactView}>
              <TouchableOpacity>
                <Image source={Images.messageIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton}>
                <Image source={Images.callIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.lineText}>{Strings.profile.labels.line}</Text>
            <Text style={styles.aboutMeText}>{item.description}</Text>
            <Text style={styles.forRent}>
              {Strings.holderprofile.labels.myApartments}
            </Text>
            <FlatList
              style={styles.cardList}
              contentContainerStyle={styles.cardListContainer}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={rents}
              renderItem={({item}) => {
                <Cards item={item} navigateToApartment={navigateToApartment} />;
              }}></FlatList>
          </ScrollView>
        </View>
      );
    },
    [route.params.id, rents],
  );
  return (
    <SafeAreaView style={styles.mainView}>
      {holderProfile && rents && renderData(holderProfile)}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  mainView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  backgroundPictureStyle: {
    width,
    height: '200@vs',
    resizeMode: 'contain',
  },
  profilePictureView: {
    borderRadius: '40@s',
  },
  profilePictureStyle: {
    height: '80@vs',
    width: '80@s',
    borderRadius: '40@s',
    marginLeft: '24@s',
    marginTop: '64@vs',
    resizeMode: 'cover',
  },
  backButton: {
    height: '40@vs',
    width: '40@s',
    marginTop: '28@vs',
    marginLeft: '24@s',
    alignItems: 'center',
  },
  isVerifiedPin: {
    height: '21@vs',
    width: '21@s',
    borderRadius: '16@s',
    marginLeft: '82@s',
    marginTop: '64@vs',
    position: 'absolute',
  },
  mainScrollView: {marginTop: '16@vs'},
  userNameTextStyle: {
    height: '30@vs',
    fontSize: '22@s',
    fontWeight: '700',
    color: Colors.darkGrey,
    marginLeft: '24@vs',
    marginTop: '16@vs',
  },
  locationView: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '24@s',
  },
  locationIcon: {
    width: '8@s',
    height: '10@vs',
    marginBottom: '4@vs',
  },
  locationText: {
    height: '20@vs',
    fontWeight: '400',
    paddingLeft: '4@s',
    fontSize: '12@s',
    color: Colors.grey,
  },
  reviewView: {
    flexDirection: 'row',
    marginLeft: '24@s',
    marginTop: '8@vs',
  },
  reviewsText: {
    height: '20@vs',
    fontSize: '12@s',
    fontWeight: '400',
    marginLeft: '8@s',
    color: Colors.grey,
  },
  languagesView: {
    height: '20@vs',
    marginTop: '10@vs',
    marginLeft: '24@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  languagesText: {
    marginLeft: '14@s',
    color: Colors.grey,
  },
  contactView: {
    marginLeft: '24@s',
    marginTop: '24@vs',
    flexDirection: 'row',
  },
  callButton: {
    marginLeft: '16@s',
  },
  lineText: {
    marginLeft: '24@s',
    fontWeight: '400',
    fontSize: '20@s',
    color: Colors.lightGrey,
    marginLeft: '24@s',
  },
  aboutMeText: {
    fontWeight: '400',
    fontSize: '12@s',
    color: Colors.grey,
    marginLeft: '24@s',
    marginTop: '8@vs',
    paddingRight: '80@s',
  },
  forRent: {
    fontSize: '16@s',
    color: Colors.darkGrey,
    fontWeight: '700',
    marginTop: '24@vs',
    marginLeft: '24@s',
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
  locationCard: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationCardIcon: {
    width: '8@s',
    height: '10@vs',
    marginBottom: '5@vs',
  },
  locationCardText: {
    height: '20@vs',
    paddingLeft: '4@s',
    fontSize: '12@s',
    color: Colors.grey,
  },
});

export default HolderProfile;
