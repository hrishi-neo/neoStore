import React, { useEffect } from 'react'
import { ScrollView, View, Image, Text, ActivityIndicator ,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { getCart } from '../../redux/action'
import { useSelector } from 'react-redux'
import CartList from './CartList'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Cart 
 * @author Hrishikesh Kedar
 * @description A functional component which returns products in cart and allows to update quantity and remove product
 * @param  navigation 
 */

const Cart = ({navigation}) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const loading = useSelector((state) => state.loading)
    const cart = useSelector((state) => state.cart)
    var total = 0
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].totalAmount
    }
   
    useEffect(() => {
        dispatch(getCart({ token: token }))
    }, [])
    const orderNow = () =>{
            navigation.navigate('Place Order')
    }
    return (
        <View style={styles.main}>
            {cart.length == 0 ? <View style={styles.emptyView} >
                <Image style={styles.img} resizeMode='contain' source={require('../../assets/images/cartempty.png')} />
            </View> :
                <View style={styles.main }>
                    <ScrollView>
                        <CartList data={cart} />
                    </ScrollView>
                    <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#000" />
                    <View style={styles.filterView}>
                        <View style={styles.rateView3}>
                            <Text style={styles.cartTitle2}> ₹ {total} </Text>
                        </View>
                        <View style={styles.rateView2}>
                        <TouchableOpacity onPress={() => { orderNow() }}>
                            <Text style={styles.cartTitle}> ORDER NOW </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}

        </View>
    )
}
const styles = create({
    emptyView: {
        flex: 1,
        justifyContent:'center'
    },
    main: {
        flex: 1,
        
    }, indicator: {
        position: 'absolute',
       alignSelf:'center'
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
        padding: 8,
        borderBottomWidth: 0.5,
        margin: 8
    },
    title: {
        alignSelf: 'center'
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
export default Cart
