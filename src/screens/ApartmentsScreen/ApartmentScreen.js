import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Strings from '../Theme/Strings';
import Images from '../Theme/Images';
import {getRentById} from '../../Api/Yelp';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const height = (width * 100) / 60;
const change = ({nativeEvent}, setCurrentDot) => {
  const slide = Math.ceil(
    nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
  );
  setCurrentDot(prevState => {
    return slide;
  });
};
const ApartmentScreen = ({route}) => {
  const navigation = useNavigation();
  const navigateToHolder = id => {
    navigation.navigate('HolderProfile', {id});
  };
  const [currentDot, setCurrentDot] = useState(2);
  const apartmentID = route.params.id;
  const [apartment, setApartment] = useState(null);
  const fetchApartment = useCallback(
    async apartmentID => {
      const data = await getRentById(apartmentID);
      setApartment(data);
    },
    [route.params.id],
  );

  useEffect(() => {
    fetchApartment(route.params.id);
    setCurrentDot(0);
  }, [route.params.id]);

  const renderSpecs = items =>
    items.specifications.map(item => {
      return (
        <TouchableOpacity style={styles.specsButtonsStyle}>
          <Text style={styles.specsTextStyle}>{item}</Text>
        </TouchableOpacity>
      );
    });
  const renderImages = items =>
    items.map(item => {
      return <Image style={styles.imageStyle} source={{uri: item}} />;
    });
  const renderStars = item =>
    new Array(item.stars).fill(0).map(() => {
      return <Image style={styles.starsIcons} source={Images.starIcon}></Image>;
    });
  const renderData = useCallback(
    (item, setCurrentDot) => {
      return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            style={styles.mainView}>
            <View>
              <ScrollView
                scrollEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={nativeEvent => {
                  change(nativeEvent, setCurrentDot);
                }}
                pagingEnabled={true}
                numRows={1}
                style={styles.imageScrollView}>
                {renderImages(item.images)}
              </ScrollView>
              <View style={styles.dotsStyle}>
                {new Array(item.images.length).fill(0).map((i, k) => {
                  return (
                    <Text
                      key={k}
                      style={
                        k === currentDot
                          ? styles.dotsActiveTextStyle
                          : styles.dotsTextStyle
                      }>
                      {Strings.apartmentScreen.labels.dot}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.summaryView}>
              <View style={styles.summaryViewInfo}>
                <Text style={styles.summaryText}>
                  {item.summaryDescription}
                </Text>

                <View style={{flexDirection: 'row'}}>{renderStars(item)}</View>
              </View>
              <TouchableOpacity
                style={styles.profilePicture}
                onPress={() => {
                  navigateToHolder(item.host.id);
                }}>
                <Image
                  style={styles.profilePic}
                  source={{uri: item.host.profilePicture}}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.descriptionTitle}>
              {Strings.apartmentScreen.labels.specification}
            </Text>
            <ScrollView
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              numRows={1}
              style={styles.specsBar}>
              {renderSpecs(item)}
            </ScrollView>
            <Text style={styles.descriptionTitle}>
              {Strings.apartmentScreen.labels.description}
            </Text>
            <Text style={styles.descriptionTextStyle}>{item.description}</Text>
            <Text style={styles.aboutTextStyle}>
              {Strings.apartmentScreen.labels.about}
            </Text>
          </ScrollView>
          <View style={styles.bottomMenu}>
            <View style={styles.priceView}>
              <Text style={styles.priceTextSyle}>
                {item.price}
                {Strings.cardsComponent.labels.currency}
              </Text>
              <Text style={styles.perNightTextStyle}>
                {Strings.apartmentScreen.labels.perNight}
              </Text>
            </View>
            <TouchableOpacity style={styles.bookingButton}>
              <Text style={styles.bookingButtonTextStyle}>
                {Strings.apartmentScreen.buttons.booking}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [route.params.id],
  );
  return (
    <SafeAreaView style={styles.mainView}>
      {apartment && renderData(apartment, setCurrentDot)}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  mainView: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  imageScrollView: {
    width,
    height: '346@vs',
    flexDirection: 'row',
    flex: 1,
  },
  imageStyle: {
    width,
    height: '346@vs',
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  dotsStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0@vs',
    alignSelf: 'center',
  },
  dotsTextStyle: {
    color: '#888',
    margin: '4@s',
  },
  dotsActiveTextStyle: {
    color: '#fff',
    margin: '4@s',
  },
  summaryView: {
    height: '56@vs',
    marginTop: '24@vs',
    marginRight: '24@vs',
    flexDirection: 'row',
  },
  summaryViewInfo: {
    width: '80%',
    height: '56@vs',
    marginLeft: '24@vs',
    justifyContent: 'space-between',
  },
  summaryText: {
    height: '30@vs',
    fontSize: '22@s',
    fontWeight: 'bold',
    color: 'rgba(46, 48, 52, 1)',
  },
  profilePic: {
    height: '40@vs',
    width: '40@s',
    borderRadius: '20@s',
    marginTop: '10@vs',
    alignSelf: 'flex-end',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  starsIcons: {
    height: '18@vs',
    width: '18@s',
    marginTop: '8@vs',
  },
  descriptionTitle: {
    fontSize: '22@s',
    color: 'rgba(46, 48, 52, 1)',
    fontWeight: 'bold',
    marginTop: '24@vs',
    marginLeft: '24@s',
  },
  specsBar: {
    paddingRight: '26@s',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: '4@s',
    marginLeft: '20@s',
    flexDirection: 'row',
    flex: 1,
  },
  specsButtonsStyle: {
    height: '24@s',
    marginLeft: '8@s',
    borderRadius: '4@s',
    backgroundColor: 'rgba(228, 228, 231, 0.4)',
    alignItems: 'center',
  },
  specsTextStyle: {
    paddingVertical: '2@vs',
    paddingHorizontal: '12@vs',
    fontSize: '12@vs',
    color: 'rgba(143, 146, 161, 1)',
  },
  descriptionTextStyle: {
    fontSize: '12@s',
    color: 'rgba(143, 146, 161, 0.6)',
    fontWeight: '400',
    marginTop: '8@vs',
    marginLeft: '24@s',
    marginRight: '52@s',
  },

  aboutTextStyle: {
    fontSize: '16@s',
    color: 'rgba(46, 48, 52, 1)',
    fontWeight: '700',
    marginTop: '16@vs',
    marginLeft: '24@s',
  },
  bottomMenu: {
    height: '106@vs',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceView: {
    height: '30@vs',
    marginLeft: '24@s',
    flexDirection: 'row',
  },
  priceTextSyle: {
    fontSize: '22@s',
    fontWeight: '700',
  },
  perNightTextStyle: {
    fontSize: '12@s',
    fontWeight: '400',
    marginLeft: '2@s',
    marginTop: '10@vs',
  },
  bookingButton: {
    height: '48@vs',
    width: '152@s',
    borderRadius: '60@s',
    backgroundColor: 'rgba(4, 159, 255, 1)',
    marginRight: '24@s',
    alignItems: 'center',
  },
  bookingButtonTextStyle: {
    fontSize: '14@s',
    fontWeight: '700',
    marginTop: '14@vs',
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default ApartmentScreen;
