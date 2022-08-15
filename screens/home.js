/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View,  Image, Text} from 'react-native';
import Sound from 'react-native-sound';  
 

const Home = ({navigation}) => {

  
  var hello = new Sound('hello.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load hello', error);
      return;
    }
    hello.setSpeed(1).setVolume(5).play();
   });
        
    return (
      <View style={styles.container}>
        <Image style={styles.name} source={require('../assets/name.png')}/>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Game')}> 
            <Text style = {styles.text}>Play</Text>
        </TouchableOpacity>
        <Image style={styles.banner} source={require('../assets/banner.png')}/>
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
    name:{
        width: 500,
        transform: [{translateY: -5}]
    },
    banner:{
        width: 750,
        height: 200,
        transform: [{translateY: 20}]
    },
    button:{
        backgroundColor:'#007B81',
        width: 120,
        height: 50,
        transform: [{translateX: -10}],
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize: 25,
    }
  });
  
  export default Home;
  