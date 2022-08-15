/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {getImages} from './services/images'

const url = 'https://lh3.googleusercontent.com/uz-60YFsWh_Z9TwTBrmRd99qYNOKSNWr5oTe3G1r2_6RM_Xxdlpp8T9uWA1g0BD6Op-bKKCxacvB5OBdT46Jmlqw3dCVyMDeVy6vGIq1c0X0VqI_YXBVnRp4xKRoxq3xBiV6pjylkLTkYrlxPFYdWfEBsg-BMHoee3sNo9WlzgNqlxMRQC5IzOTuyuQgOIhHKTjUa-jbxho2HUtiMvhLt1QdB0__s-IIWpeWg-Etwn5QKzZ4LsHB7QsYWgj9p_dGPn1zz2VzlMpKQtkiOXyCZTmPnj_CSIO_tBV9UeWtJDrDTBcvayIw1bNk5oiG-o0gp0QWYLXLmZEURd7RDgOakm5BUxLwivc_3xTZRWAI9Hv21a7ieMrgWXL2JHGgAz-2qYNwniPIoNYIMtf22RfO6VqgetLvwQGU21tzRnqO2md9DYM-syMCNcSNq3y_DVGhwMTHiS5snFqCk5vEwjNaJiR51nVaP8PbTS5RNcUN-MLRJU7c7jVcipKmg3sgL26fs0dhOjC_WU026jg0ORUoS0LKJ8gHL77957R-FaQKShxIvrHtPuduUPjnEozq_U4EMbV5n3gs0MeEadu3D-AsZRh9iqeRRhAMI6wlOLUFq8eesxlh7er4Eche--sKquFIYu4AQ83WMj_HLXwtHjURmxGtFN8jMeQowhl7iPagfgRCWA0d59iFRrcev322l0bUWCEcdrHYxCCiVyLOosB9rtUcXPI1dbGs--Aj7p2UbboSeJ3GI765dGEvSgIDBQ=w704-h355-no?authuser=0'


const App = () => {
  const [cards, setCards] = useState(Array(8).fill(url))
  const [toMatch, setMatches] = useState()
 
  var active = useRef(null);
  var matched = useRef([])
  var current = 0;


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
      console.log('WINNER')
    }
  }


      const handleClick =  (index) => {
        let temp, timeout = 0
        if(active.current == null){ //first card picked
          let toSwap = toMatch[index]; // flip card
          temp = [...cards];
          temp[index] = toSwap;

          active.current = Array(2)
          active.current[0] = index;
          active.current[1] = toSwap
        }
        else{ //second card picked
          if(index != active.current[0]){ //different cards picked
            let toSwap = toMatch[index]; // flip card
            temp = [...cards];
            temp[index] = toSwap; 
            
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
            }
          }
        }
        setTimeout(() => {
          setCards([...temp])
        });
         
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
