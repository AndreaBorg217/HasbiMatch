/* eslint-disable prettier/prettier */
 // eslint-disable-next-line prettier/prettier

import Sound from 'react-native-sound';  
Sound.setCategory('playback');  

export var chuckle = new Sound('laugh.mp3', Sound.MAIN_BUNDLE, error => {
 if (error) {
   console.log('Failed to load laugh', error);
   return;
 }
 console.log('Success');
});


export var hello = new Sound('hello.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load hello', error);
      return;
    }
    console.log('Success');
   });