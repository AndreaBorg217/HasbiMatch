/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View,  Image, Text, Dimensions} from 'react-native';
import Sound from 'react-native-sound';  
import {hello} from '../services/sounds'
 
const windowWidth = Dimensions.get('window').width;

const Home = ({navigation}) => {
    var sound = useRef(hello)
  
    useEffect(() => {
        sound.current.setSpeed(1).play()
    }, [])
        
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
        transform: [{translateY: -10}]
    },
    banner:{
        width: 750,
        height: 200,
        transform: [{translateY: 8}]
    },
    button:{
        backgroundColor:'#007B81',
        width: 120,
        height: 50,
        transform: [{translateX: -10},{translateY: -10}],
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
  