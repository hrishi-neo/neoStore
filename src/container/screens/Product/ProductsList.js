import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import { create } from '../../../utilities/normalize';
/**
 * 
 * @returns Flatlist with all products
 * @author Hrishikesh Kedar
 * @description A functional component which returns Flatlist with all products 
 * @param  data for flatlist 
 * @param numofColumn specifices no of columns in flatlist
 */

const ProductsList = ({ data, numofColumn }) => {
    const navigation = useNavigation()

    const onSubmit = (item) => {
        console.log('kk')
        navigation.navigate('ProductDetail', { item })
    }

    return (
        <View>
            <FlatList data={data} numColumns={numofColumn}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {

                    return (
                        <View style={styles.container}>
                            <CardView
                                cardElevation={5}
                                cardMaxElevation={2}>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => { onSubmit(item) }}>
                                    <View style={styles.cardView}>

                                        {item.mainImage ? <Image style={styles.img} resizeMode="stretch" source={{ uri: item.mainImage }} /> :
                                            <Image style={styles.img1} resizeMode="contain" source={require('../../../assets/images/sofa.png')} />}

                                        <View style={styles.content}>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.subtitle}>{item.description}</Text>

                                            <Text style={styles.pricee}>₹ {item.price}</Text>
                                            <Rating style={styles.rating} imageSize={18} readonly startingValue={item.avgRating} />

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </CardView>
                        </View>
                    )
                }} />
        </View>
    )
}
const styles = create({
    container: {
        padding: 1,
        margin:2,
       
    },
    img: {
        borderRadius: 12,
        flex: 0.4,
        height: 120

    },
    img1: {
        borderRadius: 12,
        flex: 0.4,
        height: 120
    },
    rating: {
        alignSelf: 'flex-start',

    },

    cardView: {
        backgroundColor:'#fff',
        borderRadius:12,
        padding: 4,
        flexDirection: 'row'
    },
    content: {
        padding: 4,
        paddingLeft:8,
        flex: 0.7,
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,

    },
    pricee: {
        fontSize: 13,
        fontWeight: 'bold'
    },

})

export default ProductsList
