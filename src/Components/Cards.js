import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Strings from "../screens/Theme/Strings";
import Images from "../screens/Theme/Images";

const Cards = ({item,navigateToApartment}) => {
  const renderCards = (item) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
        onPress={()=>{navigateToApartment(item.id)}}
        >
          <ImageBackground
            style={styles.cardPhoto}
            source={{ uri: item.thumbnail }}
          >
            <TouchableOpacity>
              <ImageBackground
                style={styles.heartButton}
                source={Images.heartIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.milesButton}>
              <Text style={styles.milesText}>
                {item.miles}
                {Strings.cardsComponent.labels.miles}
              </Text>
            </TouchableOpacity>
            <View style={styles.roomsView}>
              <View style={styles.imagesView}>
                <Image style={styles.bedRooms} source={Images.bedRoomsIcon} />
                <Text style={styles.roomsText}>{item.rooms.bedrooms}</Text>
              </View>
              <View style={styles.imagesView}>
                <Image style={styles.bedRooms} source={Images.bathRoomIcon} />
                <Text style={styles.roomsText}>{item.rooms.bathrooms}</Text>
              </View>
              <View style={styles.imagesView}>
                <Image style={styles.bedRooms} source={Images.parkingIcon} />
                <Text style={styles.roomsText}>{item.rooms.bathrooms}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.detailsView}>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.priceText}>
            {Strings.cardsComponent.labels.currency}
            {item.price}
          </Text>
          <Text>{Strings.cardsComponent.labels.perDay}</Text>
        </View>
        <View style={styles.locationView}>
          <Image
            style={styles.locationIcon}
            source={Images.locationIcon}
          ></Image>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    );
  };

  return (item && renderCards(item));
};

const styles = ScaledSheet.create({
  cardPhoto: {
    height: "194@vs",
    width: "100%",
    borderRadius: "16@s",
    marginTop: "16@vs",
    overflow: "hidden",
    resizeMode: "contain",
  },
  heartButton: {
    width: "16@s",
    height: "16@vs",
    marginLeft: "85%",
    marginTop: "16@vs",
  },
  milesButton: {
    width: "88@s",
    height: "24@vs",
    marginLeft: "24@s",
    marginTop: "-16@vs",
    backgroundColor: "rgba(236, 107, 108, 1)",
    alignItems: "center",
    borderRadius: "4@s",
  },
  milesText: {
    fontSize: "14@s",
    color: "rgba(255, 255, 255, 1)",
    paddingVertical: "2@vs",
  },
  roomsView: {
    marginLeft: "70%",
    marginTop: "120@vs",
    marginRight: "10@vs",
    height: "20@vs",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "4@s",
    alignItems: "center",
  },
  imagesView: {
    height: "100%",
    borderBottomLeftRadius: "2@vs",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  bedRooms: {
    height: "70%",
    flex: 1,
    resizeMode: "contain",
    marginHorizontal: "4@s",
  },
  roomsText: {
    height: "100%",
    flex: 1,
    fontSize: "12@s",
    marginTop: "6@vs",
    color: "black",
  },
  detailsView: {
    height: "20@vs",
    marginTop: "12@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionText: {
    height: "22@vs",
    fontSize: "16@s",
    fontWeight: "700",
    flex: 7,
  },
  perDayText: {
    width: "42@s",
    height: "20@vs",
    fontSize: "12@s",
    color: "rgba(143, 146, 161, 1)",
    marginTop: "4@s",
    flex: 1,
    alignSelf: "center",
  },
  priceText: {
    width: "36@s",
    height: "20@vs",
    fontSize: "14@s",
    color: "rgba(4, 159, 255, 1)",
    flex: 1,
  },
  locationView: {
    height: "20@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: "8@s",
    height: "10@vs",
    marginBottom: "5@vs",
  },
  locationText: {
    height: "20@vs",
    paddingLeft: "4@s",
    fontSize: "12@s",
    color: "rgba(143, 146, 161, 1)",
  },
});

export default Cards;
