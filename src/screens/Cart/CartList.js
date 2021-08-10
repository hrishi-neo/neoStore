import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCart } from '../../redux/action'
import { useSelector } from 'react-redux'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Cart List
 * @author Hrishikesh Kedar
 * @description A functional component which returns flatlist returning products in cart and allows to update quantity and remove product
 * @param  navigation 
 */

const CartList = ({ data }) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)

    const removeIt = (id) => {
        dispatch(removeFromCart({ token: token, productId: id }))
    }
    const updateIt = (id, quantity) => {
        dispatch(updateCart({ token: token, productId: id, quantity: quantity }))
    }
   
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
                                <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                                    <View style={styles.cardView}>
                                        <Image style={styles.img} resizeMode="stretch" source={{ uri: item.productId.mainImage }} />
                                        <View style={styles.content}>
                                            <Text style={styles.title}>{item.productId.name}</Text>
                                            <View style={styles.qtyView}>
                                                <Icons style={{ paddingRight: 8 }} color="black" name="remove-circle" size={26} onPress={() => {
                                                    if (item.quantity > 1) {
                                                        updateIt(item.id, item.quantity - 1)
                                                    }
                                                }} />
                                                <Text>{item.quantity}</Text>
                                                <Icons style={{ paddingLeft: 8 }} color="black" name="add-circle" size={26} onPress={() => {
                                                    updateIt(item.id, item.quantity + 1)
                                                }} />
                                            </View>
                                            <View style={styles.qtyView2}>
                                                <Text style={styles.pricee}>₹ {item.totalAmount}</Text>
                                                <Icons style={{ paddingLeft: 8 }} color="black" name="delete" size={26} onPress={() => { removeIt(item.id) }} />
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
        margin:4

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

export default CartList
