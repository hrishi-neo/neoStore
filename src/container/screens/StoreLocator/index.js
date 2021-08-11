import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Icons from 'react-native-vector-icons/MaterialIcons';

/**
 * 
 * @returns Map with Neostore location
 * @author Hrishikesh Kedar
 * @description A functional component which returns Map with Neostore location
 * @param  
 */

const StoreLocator = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 19.090795877445505,
                    longitude: 72.82963201677117,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}>

                <Marker coordinate={{ latitude: 19.090795877445505, longitude: 72.82963201677117 }}
                    title="NeoSTORE, Mumbai " style={styles.marker}>

                    <Icons color='red' name="location-pin" size={32} />

                </Marker>

                <Marker coordinate={{ latitude: 18.613445197389776, longitude: 73.73731460548694 }}
                    title="NeoSTORE, Pune " style={styles.marker}>
                    <Icons color='red' name="location-pin" size={32} />

                </Marker>



            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    marker: {
        height: 30,
        width: 30
    }
})
export default StoreLocator
