/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {getImages} from './services/images'

const Card = ({image}) =>{
  return(
    <TouchableOpacity style = {styles.card}>
    <Image style={styles.image} source={{uri: (image)}}/>
    </TouchableOpacity>
  );
}

const App = () => {
  const numberofCards = getImages()
  
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <FlatList
          data={numberofCards}
          renderItem={({item}) =><Card image = {item}/>}
          keyExtractor={(item, i) => i}
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
