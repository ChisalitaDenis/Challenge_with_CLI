import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Strings from '../screens/Theme/Strings';
import Images from '../screens/Theme/Images';
import Colors from '../screens/Theme/Colors';
import Cards from './Cards';
import {useNavigation} from '@react-navigation/native';
import roots from '../Navigator/roots';

const otherData = [
  {
    miles: 2.3,
    description: 'Sunny apartment',
    price: 233,
    location: 'Los Angeles',
    noOfDays: 3,
    imageSource: Images.house1,
    key: 1,
  },
  {
    miles: 2.3,
    description: 'Sunny apartment',
    price: 233,
    location: 'Los Angeles',
    noOfDays: 3,
    imageSource: Images.house1,
    key: 2,
  },
];
const CardsComponent = ({data}) => {
  const navigation = useNavigation();
  const navigateToApartment = id => {
    navigation.navigate(roots.Apartment, {id});
  };
  const renderOffers = items =>
    items.map(item => {
      return (
        <View>
          <ImageBackground
            style={styles.otherOfferCard}
            source={item.imageSource}>
            <TouchableOpacity>
              <ImageBackground
                style={styles.heartButton}
                source={Images.heartIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.milesButton}>
              <Text style={styles.milesText}>
                {item.noOfDays}
                {Strings.cardsComponent.labels.disponibility}
              </Text>
            </TouchableOpacity>
            <Text style={styles.offerDescription}>{item.description}</Text>
            <View style={styles.offerLocationView}>
              <Image
                style={styles.locationIcon}
                source={Images.whiteLocationIcon}></Image>
              <Text style={styles.offerLocationText}>{item.location}</Text>
            </View>
          </ImageBackground>
        </View>
      );
    });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        style={styles.cardList}
        contentContainerStyle={styles.cardListContainer}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={data => data.id}
        data={data}
        renderItem={({item}) => {
          return (
            <Cards item={item} navigateToApartment={navigateToApartment} />
          );
        }}></FlatList>
      <Text style={styles.otherOffersText}>
        {Strings.cardsComponent.labels.otherOffers}
      </Text>
      <ScrollView
        scrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        numRows={1}
        style={styles.otherOffersScroll}>
        {renderOffers(otherData)}
      </ScrollView>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  cardList: {
    width: '100%',
    height: '100%',
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
  locationView: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: '8@s',
    height: '10@vs',
    marginBottom: '5@vs',
  },
  locationText: {
    height: '20@vs',
    paddingLeft: '4@s',
    fontSize: '12@s',
    color: Colors.grey,
  },
  otherOffersText: {
    height: '22@vs',
    marginLeft: '28@s',
    marginBottom: '16@vs',
    fontSize: '16@s',
    fontWeight: '700',
  },
  otherOffersScroll: {
    height: '194@vs',
    marginHorizontal: '10@s',
    marginBottom: '30@vs',
    flexDirection: 'row',
    flex: 1,
  },
  otherOfferCard: {
    marginLeft: '14@s',
    height: '166@vs',
    width: '288@s',
    borderRadius: '16@s',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  offerDescription: {
    height: '22@vs',
    fontSize: '16@s',
    marginLeft: '24@s',
    marginTop: '76@vs',
    alignItems: 'center',
    color: Colors.white,
  },
  offerLocationView: {
    height: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '24@s',
    marginBottom: '8@vs',
  },
  offerLocationText: {
    height: '20@vs',
    paddingLeft: '4@s',
    fontSize: '12@s',
    color: Colors.white,
  },
});

export default CardsComponent;
