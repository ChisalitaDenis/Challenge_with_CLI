import React from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../screens/Theme/Colors';

const mockData = [
  {title: '3 Guests', key: 1},
  {title: 'Aparments', key: 2},
  {title: 'WiFi', key: 3},
  {title: 'Restaurant', key: 4},
  {title: 'Restaurant', key: 4},
  {title: 'Restaurant', key: 4},
];
const ChipsComponents = () => {
  const renderButton = items =>
    items.map(item => {
      return (
        <View key={item.key} style={styles.mainView}>
          <TouchableOpacity style={styles.buttonsStyle}>
            <Text style={styles.textStyle}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  return (
    <ScrollView
      scrollEnabled={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      numRows={1}
      style={styles.criteriaBar}>
      {renderButton(mockData)}
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  mainView: {flex: 1},
  criteriaBar: {
    paddingRight: '26@s',
    backgroundColor: Colors.white,
    borderRadius: '4@s',
    marginLeft: '20@s',
    flexDirection: 'row',
    flex: 1,
  },
  buttonsStyle: {
    width: '80@s',
    height: '24@s',
    marginLeft: '8@s',
    borderRadius: '4@s',
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
  },
  textStyle: {
    paddingVertical: '2@vs',
    fontSize: '12@vs',
    color: Colors.grey,
  },
});

export default ChipsComponents;
