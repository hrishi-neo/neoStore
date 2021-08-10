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

    const navigation = useNavigation();

    const onSubmit = () => {
        
         navigation.navigate('Product List')
    }
    return (

        <View style={styles.container}>
            
                <SliderBox images={data} autoplay
                    circleLoop
                    resizeMode='contain'
                    activeOpacity={0.8}
                    onCurrentImagePressed={index =>
                        onSubmit()
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
