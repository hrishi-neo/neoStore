import React, { useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, Share, Modal, Image } from 'react-native'
import ProductSlider from './ProductSlider'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addToCart, getCart } from '../../../redux/action';
import { useSelector } from 'react-redux'
import { Rating } from 'react-native-elements';
import { create } from '../../../utilities/normalize';

/**
 * 
 * @returns Product detail screen
 * @author Hrishikesh Kedar
 * @description A functional component which returns product details and allows to add product to cart , rate product, share product, buy product 
 * @param  navigation to navigate
 * @param route to receive params
 */

const ProductDetail = ({ navigation, route }) => {
    const token = useSelector((state) => state.user.token)
    const cart = useSelector((state) => state.cart)
    const loggedIn = useSelector((state) => state.loggedIn)
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1)
    const [showmodal, setShowmodal] = useState(false)
    const { item } = route.params
    var imgArray = []
    imgArray.push(item.mainImage)
    for (var i = 0; i < item.subImages.length; i++) {
        imgArray.push(item.subImages[i])
    }

    const updateQty = (opt) => {
        if (opt == 'add') {
            setQty(qty + 1)
        } else {
            if (qty > 1) {
                setQty(qty - 1)
            }
        }
    }

    useEffect(() => {
        dispatch(getCart({ token: token }))
    }, [])

    const onShare = async () => {
        try {
            const result = await Share.share({

                message:
                    'Checkout this product on NeoStore | ' + item.name + ' ' + item.description + '',

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            alert(error.message);
        }
    };

    const addCart = () => {
        if (loggedIn == true) {
            dispatch(addToCart({ productId: item._id, quantity: qty, token: token }))
        } else {
            Alert.alert(
                "NeoSTORE",
                "Login to buy!",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Login", onPress: () => navigation.navigate('Login') }
                ]
            );
        }

    }

    const buyNow = async () => {
        if (loggedIn == true) {
            await dispatch(addToCart({ productId: item._id, quantity: qty, token: token }))
            navigation.navigate('Cart')
        } else {
            Alert.alert(
                "NeoSTORE",
                "Login to buy!",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Login", onPress: () => navigation.navigate('Login') }
                ]
            );
        }

    }

    return (
        <View style={styles.main} >
            <ScrollView>
                <View>
                    <ProductSlider data={imgArray} />
                </View>
                <View style={styles.returnView}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.features}</Text>
                    <Text style={styles.subtitle}>{item.description}</Text>
                    <Text style={styles.subtitle}>Category - {item.category.name}</Text>

                    <Text style={styles.pricee}>₹ {item.price}</Text>
                    <Text style={styles.subtitle}>inclusive of all taxes</Text>
                    <View style={styles.qtyView}>
                        <Icons style={{ paddingRight: 8 }} color="black" name="remove-circle" size={26} onPress={() => { updateQty('minus') }} />
                        <Text>{qty}</Text>
                        <Icons style={{ paddingLeft: 8 }} color="black" name="add-circle" size={26} onPress={() => { updateQty('add') }} />
                    </View>
                </View>
                <View style={styles.returnView}>
                    <Text style={styles.title1}>Easy 30 days returns and exchanges</Text>
                    <Text style={styles.subtitle}>Choose to return or exchange for a different size(if available) within 30 days.</Text>
                </View>

                <View style={styles.rateView}>
                    <Text> {item.avgRating} </Text>
                    <Icons color="gold" name="star" size={22} />
                </View>

                <View style={styles.shareView}>
                    <TouchableOpacity onPress={() => onShare()}>
                        <View>
                            <Icons color="gray" name="share" size={22} />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Modal
                transparent={true}
                animationType="slide"
                visible={showmodal}
                onRequestClose={() => { setShowmodal(false) }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.mainView}>

                            <Text style={styles.selectStyle}>{item.name} </Text>
                        </View>
                        <Image resizeMode='contain' style={styles.img} source={{ uri: item.mainImage }} />
                        <Rating style={styles.rating} imageSize={24} startingValue={2} />
                        <View style={styles.rateView4}>

                            <TouchableOpacity onPress={() => { setShowmodal(false) }}>
                                <Text style={styles.cartTitle2}> RATE NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <FAB
                style={styles.fab}
                icon="cart"
                large
                color='#fff'
                onPress={() => { addCart() }}
            />
            <View style={styles.cartView}>
                <View style={styles.rateView3}>
                    <Icons color="gold" name="star" size={24} />
                    <TouchableOpacity onPress={() => { setShowmodal(true) }}>
                        <Text style={styles.cartTitle2}> RATE </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rateView2}>

                    <Icons color="#fff" name="shopping-bag" size={24} />
                    <TouchableOpacity onPress={() => { buyNow() }}>
                        <Text style={styles.cartTitle}> BUY NOW </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}
const styles = create({
    main: {
        flex: 1,
    },
    selectStyle: {
        fontSize: 14,
        padding: 4,
    },
    qtyView: {
        flexDirection: 'row',
        paddingLeft: 8,
        alignItems: 'center',
        padding: 4
    }, rating: {
        padding: 8,
        marginTop: 8
    },
    container: {
        padding: 4,
        marginLeft: 4,
        marginRight: 4
    }, fab: {
        margin: 16,
        right: 5,
        bottom: 50,
        position: 'absolute',
        backgroundColor: '#FF7F7F',
    },
    img: {
        borderRadius: 8,
        height: 250,
        padding: 4,
    },
    img1: {
        borderRadius: 8,
        flex: 0.3,
        height: 120,
        padding: 4,
    },
    cardView: {
        backgroundColor: '#F5F5F5',
        padding: 6,
        flexDirection: 'row'
    },
    content: {
        padding: 8,
        flex: 0.6,
    },
    title: {
        fontSize: 14,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: 'bold'
    },
    title1: {
        fontSize: 14,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        paddingLeft: 8,
        paddingTop:4
    },
    pricee: {
        fontSize: 14,
        paddingLeft: 8,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 4,
        alignItems: 'center',
    },
    returnView: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 8,

    },
    rateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        width: 50,
        position: 'absolute',
        top: 360,
        right: 10
    },
    shareView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginRight: 8,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 20,
        right: 10
    },

    rateView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F7F',
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        flex: 0.4,
        margin: 4,
        padding: 8,
    },
    rateView3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        flex: 0.4,
        margin: 4,
        padding: 8,
    },
    rateView4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        margin: 4,
        padding: 4,
    },
    cartView: {
        flexDirection: 'row',
        height: 50,
        padding: 4,
        alignItems: 'baseline',
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    cartTitle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    cartTitle2: {
        fontWeight: 'bold',
        color: '#000'
    },
    cartTitle2: {
        fontWeight: 'bold',
        color: '#000'
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 0.5,
        margin: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
export default ProductDetail
