import React from 'react'
import { View, } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { useNavigation } from '@react-navigation/native';
import { create } from '../utilities/normalize';

/**
 * 
 * @returns Imageslider with product images
 * @author Hrishikesh Kedar
 * @description A functional component which returns Imageslider with product images
 * @param  data list of images
 * 
 */

const Sliderbox = ({ data }) => {
    var imgData = [];
    for (var i=0;i<data.length;i++){
        imgData.push(data[i].url)
    }
    const navigation = useNavigation();

    const onSubmit = (cat) => {
        
         navigation.navigate('Product List',{cat})
    }
    return (

        <View style={styles.container}>
            
                <SliderBox images={imgData} autoplay
                    circleLoop
                    resizeMode='contain'
                    activeOpacity={0.8}
                    onCurrentImagePressed={index =>
                        onSubmit(data[index].cat)
                      }
                    dotStyle={{
                        width: 0, height: 0
                    }} />
           
        </View>

    )
}
const styles = create({
    container: {
        backgroundColor: '#F5F5F5',
        height: 160,

    }
})

export default Sliderbox
