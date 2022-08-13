/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';

const Card = () =>{
  return(
    <TouchableOpacity style = {styles.card}></TouchableOpacity>
  );
}

const App = () => {
  const numberofCards = [1,2,3,4,5,6,7,8,9,10]
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <FlatList
          data={numberofCards}
          renderItem={(item) =><Card/>}
          keyExtractor={(item, i) => i}
          numColumns = {5}
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
    transform: [{translateY: 40}]
  },
  card: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
    width: 130,
    height: 130,
    margin: 5,
  },
});

export default App;
