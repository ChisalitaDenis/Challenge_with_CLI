import React, { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Images from "../screens/Theme/Images";
import Strings from "../screens/Theme/Strings";

const HeaderComponent = () => {
  const [text, onChangeText] = useState("");
  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity style={styles.filterSearch}>
        <Image
          style={styles.filterSearch}
           source={Images.filterIcon}
        />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <Image style={styles.searchIcon} source={Images.searchIcon} />
        <TextInput
          autoCorrect={false}
          placeholder={Strings.head.labels.searchPlaceholder}
          style={styles.textStyle}
          onChangeText={onChangeText}
          value={text}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  parentContainer: {
    paddingRight:"48@s",
    height: "84@vs",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterSearch: {
    width: "40@s",
    height: "40@vs",
    paddingLeft:"20@s"
  },
  searchBar: {
    width: "270@s",
    height: "40@vs",
    backgroundColor: "rgba(228, 228, 231, 0.4)",
    marginLeft:"14@s",
    paddingRight:"24@s",
    alignItems: "center",
    flexDirection: "row",
    borderRadius:"48@s"
  },
  textStyle: {
    flex: 1,
    paddingHorizontal: "10@s",
    color: "black",
  },
  searchIcon: {
    width: "16@s",
    height: "16@vs",
    marginLeft:"16@s"
  },
});

export default HeaderComponent;
