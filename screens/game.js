/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image, Modal, Dimensions, Text, Vibration} from 'react-native';
import Sound from 'react-native-sound';  
import {getImages} from '../services/images'
 
const url = 'https://lh3.googleusercontent.com/A0m8RV8LUNo36fEpaAKDMuDEP-zUSPsU1cye95BI0TTu1MO2y_X_rM8nAJqfLSm4p664Vl6itYyoAs0G6oosJ4ITv0Ezx_Evnm0q53vTQeQaUBNDDdufJrSXzjVkwd1zHNcMOGQXJrqsEBqBvTHS4Q7Dygy2a-d3sZ_MbzBOR5q-pAMRzU1pbsWdtpyHlsP1Ygw1bfDoXEgW0UkTK_RyvWCsEG6YXvDhXSWNqrZ8knR4YaqE2oq6a20RzRhFZZWssKQEQoAxO6lMl7BpX5QhzOJmuJpVPcfHGKEBbnmLe9IKGhXJoj7_YkJmpSw9Z6NBuFuBNW7ch-5UQ988bQrDHqZDi4f0C1qNZb7MzCikygpo-5WB3TSefz0BpA4MV5thRZWDpacyrSzZIRZugsyHBD0gDLQ53vUVUe4kyXrLBX-r2TdjNnv1LeaAuAOjfmS3Kru388bZazNx0C-aZMjcIZ3xn-HS_CcPc2UhhfqwuIhoq3smEMd5oGMZ-qPxHi3izk_T-So1LIfejLey71Bc6VWC71pXVfMbiftw1DW78a1yLkX66Xu7DuW-GgNwmKDPGLTHLpUTvYd3jxikELB5tOnbGkKE_XnXKXs_eg98VU4dxy9cKzRtjwEoMljdbOyKNLIhS2v4rd--ZKBHTKTqY2DjgTXw1EgWo8kYPDdHIKvrVlQszVptsmESCD757NyQaDHZ7clkpopgdejf4iCO-Boery6auR0huvpJIJ_f76EuKdZO9UMOEJmx_sNBzA=w704-h355-no?authuser=0'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game = ({navigation}) => {
    const [cards, setCards] = useState(Array(8).fill(url))
    const [toMatch, setMatches] = useState()
    const [modalVisible, setModal] = useState(false)
    var active = useRef(null);
    var matched = useRef([])
  
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
  
    const checkWinner = () =>{
      if(matched.current.length == 8){
        setModal(true)
        var chuckle = new Sound('laugh.mp3', Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('Failed to load laugh', error);
            return;
          }
          chuckle.setSpeed(1).play()
         });
      }
    }
  
  
        const handleClick =  (index) => {
          let temp
          if(!matched.current.includes(index)){
            if(active.current == null){ //first card picked
            let toSwap = toMatch[index]; // flip card
            temp = [...cards];
            temp[index] = toSwap;
            setCards([...temp])
  
            active.current = Array(2)
            active.current[0] = index;
            active.current[1] = toSwap
          }
          else{ //second card picked
            if(index != active.current[0]){ //different cards picked
              let toSwap = toMatch[index]; // flip card
              temp = [...cards];
              temp[index] = toSwap; 
              setCards([...temp])
  
              if(toSwap == active.current[1]){ //cards match
                matched.current = [...matched.current, index, active.current[0]];
                console.log(matched.current)
                active.current = null;
                checkWinner()
              }
              else{ //cards do not match
                temp = [...cards];
                temp[index] = url;
                temp[active.current[0]] = url;
                active.current = null;
                Vibration.vibrate(400, false);
                setTimeout(() => {
                  setCards([...temp])
                }, 500);
              }
            }
          }
        }
      }
      
    
    const restart = () =>{
      setModal(false)
      setMatches(getImages());
      setCards(Array(8).fill(url))
      active.current = null;
      matched.current = []
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
  
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {console.log("Modal has been closed.");}}>
            <View style={styles.modal}>
              
              <Text style = {styles.header}>YOU HAVE MATCHED ALL THE CARDS!</Text>
              <Text style = {styles.subheader}>Hasbulla is giving you some strawberries, we don't have the chocolate ones because he ate them all</Text>
              
              <Image style={styles.winImage} source={require('../assets/winImage.png')}/>
            
            <TouchableOpacity style ={styles.modalButton}  onPress={() => restart()}>
              <Text style = {styles.modalText}>New Game</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style = {styles.modalButton} onPress={() => navigation.navigate('Home')}>
              <Text style = {styles.modalText}>Quit</Text>
            </TouchableOpacity>
            
            </View>
          </Modal>
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
    },
  
    modal:{
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#123',
    alignItems: 'center',
    justifyContent: 'center',
    },
    header:{
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      transform: [{translateY: 80}]
    },
    subheader:{
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: -15,
      transform: [{translateY: 80}],
      marginTop: 10
    },
    winImage:{
      width: 300,
      height: 300,
      transform: [{translateX: -240},{translateY: 60}]
    },
    modalButton:{
      backgroundColor: 'white',
      width: 150,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 15,
      transform: [{translateY: -150}],
      margin: 10,
    },
    modalText:{
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  
  export default Game;
  