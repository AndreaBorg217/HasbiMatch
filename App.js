/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image, Modal, Dimensions, Text, Vibration} from 'react-native';
import Sound from 'react-native-sound';  
import {getImages} from './services/images'
import {chuckle} from './services/sounds'
 
const url = 'https://lh3.googleusercontent.com/uz-60YFsWh_Z9TwTBrmRd99qYNOKSNWr5oTe3G1r2_6RM_Xxdlpp8T9uWA1g0BD6Op-bKKCxacvB5OBdT46Jmlqw3dCVyMDeVy6vGIq1c0X0VqI_YXBVnRp4xKRoxq3xBiV6pjylkLTkYrlxPFYdWfEBsg-BMHoee3sNo9WlzgNqlxMRQC5IzOTuyuQgOIhHKTjUa-jbxho2HUtiMvhLt1QdB0__s-IIWpeWg-Etwn5QKzZ4LsHB7QsYWgj9p_dGPn1zz2VzlMpKQtkiOXyCZTmPnj_CSIO_tBV9UeWtJDrDTBcvayIw1bNk5oiG-o0gp0QWYLXLmZEURd7RDgOakm5BUxLwivc_3xTZRWAI9Hv21a7ieMrgWXL2JHGgAz-2qYNwniPIoNYIMtf22RfO6VqgetLvwQGU21tzRnqO2md9DYM-syMCNcSNq3y_DVGhwMTHiS5snFqCk5vEwjNaJiR51nVaP8PbTS5RNcUN-MLRJU7c7jVcipKmg3sgL26fs0dhOjC_WU026jg0ORUoS0LKJ8gHL77957R-FaQKShxIvrHtPuduUPjnEozq_U4EMbV5n3gs0MeEadu3D-AsZRh9iqeRRhAMI6wlOLUFq8eesxlh7er4Eche--sKquFIYu4AQ83WMj_HLXwtHjURmxGtFN8jMeQowhl7iPagfgRCWA0d59iFRrcev322l0bUWCEcdrHYxCCiVyLOosB9rtUcXPI1dbGs--Aj7p2UbboSeJ3GI765dGEvSgIDBQ=w704-h355-no?authuser=0'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const App = () => {
  const [cards, setCards] = useState(Array(8).fill(url))
  const [toMatch, setMatches] = useState()
  const [modalVisible, setModal] = useState(false)
  var active = useRef(null);
  var matched = useRef([])
  var sound = useRef(chuckle)

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
      sound.current.setSpeed(1).play()
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
            
            <Image style={styles.winImage} source={require('./assets/winImage.png')}/>
          
          <TouchableOpacity style ={styles.modalButton}  onPress={() => restart()}>
            <Text style = {styles.modalText}>New Game</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.modalButton}>
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
    transform: [{translateX: 150},{translateY: -150}],
    margin: 10
  },
  modalText:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default App;
