import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image, Modal, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { getCart, placeOrder } from '../../redux/action'
import { useSelector } from 'react-redux'
import CardView from 'react-native-cardview'
import PlaceOrderList from './PlaceOrderList'
import ProdNameList from './ProdNameList'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Place Order Screen 
 * @author Hrishikesh Kedar
 * @description A functional component which returns place order screen which allows to place order, see total amount, add shipping address
 * @param  navigation 
 */

const PlaceOrder = ({ navigation }) => {
    const [showmodal, setShowmodal] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const loading = useSelector((state) => state.loading)
    const cart = useSelector((state) => state.cart)
    const shipAddress = useSelector((state) => state.shipAddress)
    const user = useSelector((state) => state.user)
    var total = 0
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].totalAmount
    }
    useEffect(() => {
        dispatch(getCart({ token: token }))
    }, [])
    const onSubmit = () => {
        navigation.navigate('Shipping Address')
    }
    const orderCNF = () => {
        navigation.navigate('Home')
    }
    const confirmOrd = async () => {
        await dispatch(placeOrder({ token: token, addressId: shipAddress._id }))
        setShowmodal(true)
    }
    return (

        <View style={styles.main}>
            <ScrollView>
                {shipAddress.length == undefined ? <View style={styles.container}>
                    <CardView
                        cardElevation={5}
                        cardMaxElevation={2}>
                        <View style={styles.cardView}>
                            <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
                            <Text style={styles.subtitle}>{shipAddress.addressLine},</Text>
                            <Text style={styles.subtitle}>{shipAddress.city} - {shipAddress.pincode}, {shipAddress.state}, {shipAddress.country}</Text>
                            <Text style={styles.subtitle}>{user.mobile}</Text>
                            <TouchableOpacity
                                activeOpacity={0.5} onPress={() => { onSubmit() }}
                                style={styles.btn}>
                                <Text style={{ color: '#fff', fontSize: 16, }}>Change or Add Address</Text>
                            </TouchableOpacity>
                        </View>
                    </CardView>
                </View> : <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { onSubmit() }}
                    style={styles.btn}>
                    <Text style={{ color: '#fff', fontSize: 16, }}>Add Shipping Address</Text>
                </TouchableOpacity>}

                <PlaceOrderList data={cart} />
                <Text style={styles.price}>Price Details</Text>
                <ProdNameList data={cart} />
                <View style={styles.mainView}>
                    <Text style={styles.total}>Total Amount</Text>
                    <Text style={styles.total1}> ₹ {total} </Text>
                </View>

            </ScrollView>
            <Modal
                transparent={true}
                animationType="slide"
                visible={showmodal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <Text style={styles.selectStyle}>ORDER CONFIRMED </Text>

                        <View>
                            <Image style={styles.gifView} source={{ uri: 'https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif' }} />
                            <Text style={styles.subStyle} >Thanks for placing order with NeoSTORE !</Text>
                            <Text style={styles.subStyle} >Your Order has been confirmed</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5} onPress={() => { orderCNF() }}
                            style={styles.okbtn}>
                            <Text style={{ color: '#fff', fontSize: 16, }}>OK</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#000" />
            <View style={styles.filterView}>
                <View style={styles.rateView3}>
                    <Text style={styles.cartTitle2}> ₹ {total} </Text>
                </View>
                <View style={styles.rateView2}>
                    <TouchableOpacity onPress={() => { confirmOrd() }}>
                        <Text style={styles.cartTitle}> CONFIRM ORDER  </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = create({

    container: {
        padding: 4,
        
    }, emptyView: {
        flex: 1,
        justifyContent: 'center'
    },
    selectStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 8,
        alignSelf: 'center'

    }, subStyle: {

        fontSize: 14,
        padding: 8,
        alignSelf: 'center'

    },
    gifView: {
        height: 150,
        width: 150,
        paddingBottom: 50,
        paddingTop: 50,
        alignSelf: 'center',
        borderRadius: 30
    },
    main: {
        flex: 1,

    }, indicator: {
        position: 'absolute',
        alignSelf:'center'
    },
    price: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 20,
        marginTop: 8
    }, cardView: {
        padding: 4,

    },
    total: {
        padding: 12,
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 20,
        flex: 0.7,
        paddingBottom: 50
    },
    btn: {
        borderRadius: 20,
        padding: 10,
        margin: 16,
        alignItems: 'center',
        backgroundColor: '#1E90FF'

    },
    okbtn: {
        borderRadius: 20,
        padding: 10,
        width: 100,
        margin: 4,
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        alignSelf: 'center'

    },
    total1: {
        padding: 12,
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 20,
        flex: 0.3,
        paddingBottom: 50
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
    }, img: {
        width: '100%',
        height: 300
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    title: {
        padding: 4,
        fontSize: 14,
        fontWeight: 'bold'
    },
    subtitle: {
        paddingLeft: 4,
        padding: 2,
        fontSize: 13,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    content: {
        borderWidth: 0.5,
        borderRadius: 8,
        fontSize: 14,
        padding: 8,
        margin: 8,
        textAlign: 'center'

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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    filterView: {
        flexDirection: 'row',
        height: 60,
        padding: 4,
        alignItems:'baseline',
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
    textView: {

        borderWidth: 0.5,
        borderRadius: 8,
        fontSize: 14,
        padding: 8,
        backgroundColor: '#fff'


    }


})
export default PlaceOrder
