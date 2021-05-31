import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const mockData = [
  { title: "3 Guests", key: 1 },
  { title: "Aparments", key: 2 },
  { title: "WiFi", key: 3 },
  { title: "Restaurant", key: 4 },
  { title: "Restaurant", key: 4 },
  { title: "Restaurant", key: 4 },
];
const ChipsComponents = () => {
  const renderButton = (item) => {
    return (
      <View key={item.key} style={{flex:1}}>
        <TouchableOpacity style={styles.buttonsStyle}>
          <Text style={styles.textStyle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      scrollEnabled={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      numRows={1}
      style={styles.criteriaBar}
    >
      {mockData.map((item, index) => {
        return renderButton(item);
      })}
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  criteriaBar: {
    paddingRight:"26@s",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "4@s",
    marginLeft: "20@s",
    flexDirection: "row",
    flex:1
  },
  buttonsStyle: {
    width: "80@s",
    height: "24@s",
    marginLeft: "8@s",
    borderRadius:"4@s",
    backgroundColor: "rgba(228, 228, 231, 0.4)",
    alignItems:"center"
  },
  textStyle: {
    paddingVertical:'2@vs',
    fontSize: "12@vs",
    color: "rgba(143, 146, 161, 1)",
  },
});

export default ChipsComponents;
