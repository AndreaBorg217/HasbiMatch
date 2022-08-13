/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const Card = () =>{
  return(
    <TouchableOpacity style = {styles.card}></TouchableOpacity>
  );
}

const App = () => {
  const numberofCards = [1,2,3,4,5,6,7,8]
  return (
    <View style={styles.container}>

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
  card: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    width: 100,
    height: 100
  },
});

export default App;
