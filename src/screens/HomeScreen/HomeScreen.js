import React, { useEffect, useCallback,useState } from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import HeadComp from "../../Components/HeadComp";
import ChipsComponents from "../../Components/ChipsComponents";
import CardsComponent from "../../Components/CardsComponent";
import BottomComponent from "../../Components/BottomComponent";
import { getAllRents } from "../../Api/Yelp";

const HomeScreen = () => {
  const [rents,setRents]=useState([]);
  const fetchRents = useCallback(async () => {
    const data = await getAllRents();
    setRents(data);
    
  }, []);
  useEffect(() => {
    fetchRents();
  
  }, []);
  return (
    <SafeAreaView style={styles.homeView}>
      <View style={styles.navigationHeader}>
        <HeadComp />
      </View>
      <View style={styles.chips}>
        <ChipsComponents />
      </View>
      <View style={styles.mainCards}>
        <CardsComponent data={rents} />
      </View>
      <View>
        <BottomComponent />
      </View>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  homeView: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  navigationHeader: {
    height: "86@vs",
  },
  chips: {
    height: "24@vs",
  },
  mainCards: {
    alignItems: "center",
    marginTop: "32@vs",
    flex: 1,
  },
  bottomNavigation: {
    height: "130@vs",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export default HomeScreen;
