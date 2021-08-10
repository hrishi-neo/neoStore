import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Place Order List 
 * @author Hrishikesh Kedar
 * @description A functional component which returns flatlist which shows products in the cart list
 * @param  data for flatlist 
 */


const PlaceOrderList = ({ data }) => {
    return (
        <View>
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {


                    return (
                        <View style={styles.container}>
                            <CardView
                                cardElevation={5}
                                cardMaxElevation={2}>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => { }}>
                                    <View style={styles.cardView}>
                                        <Image style={styles.img} resizeMode="stretch" source={{ uri: item.productId.mainImage }} />
                                        <View style={styles.content}>
                                            <Text style={styles.title}>{item.productId.name}</Text>

                                            <View style={styles.qtyView2}>
                                                {item.totalAmount == undefined ?
                                                    <Text style={styles.pricee}>₹ {item.productId.price}</Text>
                                                    : <Text style={styles.pricee}>₹ {item.totalAmount}</Text>
                                                }
                                                <Text style={styles.pricee}> Qty - {item.quantity}</Text>
                                            </View>

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
        margin: 4

    }, qtyView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    qtyView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 4,
    },
    img: {
        borderRadius: 12,
        flex: 0.4,
        height: 100

    },
    img1: {
        borderRadius: 12,
        flex: 0.4,
        height: 100
    },
    rating: {
        alignSelf: 'flex-start',

    },

    cardView: {
        backgroundColor:'#fff',
        borderRadius:12,
        padding: 6,
        flexDirection: 'row'
    },
    content: {
        padding: 8,
        flex: 0.7,
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,

    },
    pricee: {
        fontSize: 13,
        fontWeight: 'bold'
    },

})
export default PlaceOrderList
