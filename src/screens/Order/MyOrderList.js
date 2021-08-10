import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import { useNavigation } from '@react-navigation/native'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Order List 
 * @author Hrishikesh Kedar
 * @description A functional component which returns orders list
 * @param  navigation 
 */

const MyOrderList = ({ data }) => {
    const navigation = useNavigation()
    const onSubmit = (item)=>{
        navigation.navigate('Order Details',{item})
    }
    return (
        <View >
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {

                    const dat = String(item.createdAt).slice(0, 10)
                    return (
                        <View style={styles.container}>
                            <CardView
                                cardElevation={5}
                                cornerRadius={8}
                                cardMaxElevation={1}>
                                    <TouchableOpacity onPress={()=>{onSubmit(item)}}>
                                <View style={styles.cardView}>
                                    <Text style={styles.iD}>Order Id : {item._id}</Text>
                                    <View style={styles.line}>
                                        <FlatList data={item.items}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item }) => {

                                                return (
                                                    <View style={styles.prodView} >
                                                        <Text style={styles.title}>{item.productId.name} ({item.quantity})</Text>
                                                        <Text style={styles.pricee}>{item.productId.price} </Text>
                                                    </View>
                                                )
                                            }} />
                                    </View>
                                    <Text style={styles.datee}>Ordered on {dat}</Text>
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
        paddingLeft: 8,
        paddingRight: 8,
        margin: 6,
        backgroundColor:'#fff',
        borderRadius:12
    },
    cardView: {
        padding: 6,

    }, line: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 4,
    },
    prodView: {

        padding: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        flex: 0.7,
        paddingLeft: 4,
        padding: 4,
    },
    iD: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 8,
    },
    datee: {
        fontSize: 12,
        alignSelf: 'center',
        padding: 8,
    },
    pricee: {
        fontSize: 12,
        textAlign: 'right',
        flex: 0.2
    },

})
export default MyOrderList
