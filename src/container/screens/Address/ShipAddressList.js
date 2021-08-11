import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { delAddress, saveShipAddress ,delShipAddress} from '../../../redux/action'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { create } from '../../../utilities/normalize';

/**
 * 
 * @returns FlatList of addresses
 * @author Hrishikesh Kedar
 * @description A functional component which returns FlatList of addresses
 * @param  data 
 */

const ShipAddressList = ({ data }) => {
    const navigation = useNavigation()
    const [confirm, setConfirm] = useState(false)
    const [main, setMain] = useState('')
    const [sub, setSub] = useState('')
    const [additem, setAdditem] = useState('')
    const token = useSelector((state) => state.user.token)
    const shipAddress = useSelector((state) => state.shipAddress)
    console.log(shipAddress)
    const dispatch = useDispatch()
    const removeAdd = (id) => {
        
        if(shipAddress._id==id){
           dispatch(delShipAddress())

        }
        dispatch(delAddress({ token: token, productId: id }))
    }
    const onSubmit = (item) => {
        navigation.navigate('Edit Address', { item })
    }
    const confirmShip = (item) => {
        setConfirm(true)
        setAdditem(item)
        setMain(item.addressLine)
        setSub(item.city + ' - ' + item.pincode + ', ' + item.state + ', ' + item.country)
    }
    const setShipAddress = async () => {

        dispatch(saveShipAddress(additem))
        navigation.goBack()
    }
    return (
        <View>
            {confirm ? <View style={styles.cnfView}>
                <Text style={styles.title1}>Ship to this Address</Text>
                <Text style={styles.subtitle}>{main}</Text>
                <Text style={styles.subtitle}>{sub}</Text>
                <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { setShipAddress() }}
                    style={styles.btn}>
                    <Text style={{ color: 'black', fontSize: 16, }}>Submit</Text>
                </TouchableOpacity>
            </View> : null}
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {


                    return (
                        <View style={styles.container}>
                            <CardView
                                cardElevation={5}
                                cardMaxElevation={2}>
                                <TouchableOpacity onPress={() => { confirmShip(item) }}>
                                    <View style={styles.cardView}>

                                        <Text style={styles.title}>{item.addressLine},</Text>
                                        <Text style={styles.title}>{item.city} - {item.pincode}, {item.state}, {item.country}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <View style={styles.rateView3}>
                                            <Icon color="#000" name="edit" size={20} />
                                            <TouchableOpacity onPress={() => { onSubmit(item) }}>
                                                <Text style={styles.cartTitle2}> EDIT </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.rateView3}>
                                            <Icon color="#000" name="delete" size={20} />
                                            <TouchableOpacity onPress={() => { removeAdd(item._id) }}>
                                                <Text style={styles.cartTitle2}> REMOVE </Text>
                                            </TouchableOpacity>
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
        padding: 2,
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 12
    }, cnfView: {
        padding: 4,
        margin: 4,
        borderBottomWidth: 0.5
    },
    cardView: {
        padding: 8,
        borderBottomWidth: 0.5
    }, btn: {
        borderRadius: 20,
        padding: 10,
        margin: 16,
        alignItems: 'center',
        backgroundColor: '#1E90FF'
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
        padding: 4,
    },
    content: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
        padding: 4,
        textAlign: 'center'
    },
    title1: {
        fontSize: 14,
        padding: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        padding: 4,
        textAlign: 'center'

    },
    pricee: {
        fontSize: 14,
        fontWeight: 'bold'
    },

})
export default ShipAddressList
