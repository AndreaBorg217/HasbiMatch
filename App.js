/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {getImages} from './services/images'



const App = () => {
  const [toMatch, setMatches] = useState()
  const [cards, setCards] = useState(Array(8).fill('https://lh3.googleusercontent.com/23ko8z8g61O_ruzsFSKs-MFlnqPYAyRSZRHcWHiqu6cGazO1fnnmk_LevFsBCJ96d16SOz_0X57tAuiV64nyjSlI5tPDuPSTWEBXh-n8nhOfRFhJ_tE9m54rgcY1fJk6NiJJZySxT02ZihUkRB9HUmPYmJxgZ2r47fdZzjaVnHUp7YK6CMHNr3ZFspjywaqS5_ZFYg4KbNfBCSZT1zjcg3j9wJkka9n16hwGxWUEmUK1xlQe1kR_XZRqQenaXWmWBHNhOHfyxZjdJ_AkkvZlcFuLSifVPaTHa9Cs1iSqqmJpjS3M3RdVKd9kI7frALzLy_ZJ2Jx2sio0ox2hXExz-QkCz4BuIWPMZpUeIAxsJjR-R_siOwsbQBh8h5HoXfCnHHSZ7BB34ho1sSAmXoE0eWZmRiijXrdcYTIpJ_5SIPNFyZq_3BXBaNQe3tLZ15mZLSgm4jKZxU9nsqUZ3uL886Lc_f_C1O1Y-rLDkK2iCFKjE4hAbrB61-PV20WqlGQPcOl_ttdsCjThgBKDeuYVXonjpr2sGDyKoumgcdH5RuQY-n-MuNhPFvTpQTPHprL8kuKz8_57p7LHx_lhNThu6ItDF9GD4PYLg4-_q0I_wd3ajRWXS5YolYiV2N3sP_QOa6fc9rH04kwTUKfSVAPz23PR6r28Zeupn132wfpPwLzTp8odeROLGQgheE6LDB978bsIWcSQvImkZeu_Hss_swAtNwUWFWXh0_571uYjV-JsK8H-HMXT3PwfC2rzNw=w704-h355-no?authuser=0'))
  
  useEffect(() => {
    setMatches(getImages())
  }, [])
  
  

  const Card = ({image, index}) =>{
    return(
      <TouchableOpacity style = {styles.card} onPress = {() => handleClick(index)}>
      <Image style={styles.image} source={{uri: (image)}}/>
      </TouchableOpacity>
    );
  }

  const handleClick = (index) => {
    let toSwap = toMatch[index];
    let temp = [...cards];
    temp[index] = toSwap;
    setCards([...temp])
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <FlatList
          data={cards}
          renderItem={({item, index}) =><Card image = {item} index = {index}/>}
          keyExtractor={(item, index) => index}
          numColumns = {4}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#123',
  },
  cards:{
    transform: [{translateY: 10}]
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 165,
    height: 165,
  },
  image:{
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 15,
    width: 165,
    height: 165,
  }
});

export default App;
