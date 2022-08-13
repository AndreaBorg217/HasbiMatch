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

const Card = () =>{
  return(
    <TouchableOpacity style = {styles.card}>
    <Image style={styles.image}
        source={{
          uri: 'https://lh3.googleusercontent.com/HgQ7TyQjtD_SdRKpttwxyQjGk38tUXG_k5OBF1k95-XjEH8sfg5XLMgyUfwsGIcHJO5nJpgykGb9zjKPWBD8FKHu9HRCg3hFZOrzjco=s250',
        }}/>
    </TouchableOpacity>
  );
}

const App = () => {
  const numberofCards = [1,2,3,4,5,6,7,8]
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <FlatList
          data={numberofCards}
          renderItem={(item) =><Card/>}
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
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
    width: 165,
    height: 165,
  }
});

export default App;
