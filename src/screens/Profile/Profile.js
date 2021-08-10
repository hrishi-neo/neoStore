import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns User Profile
 * @author Hrishikesh Kedar
 * @description A functional component which returns User Profile with options like order history, cart, shipping address, edit profile, reset password
 * @param  navigation
 */

const Profile = ({ navigation }) => {
    const user = useSelector((state) => state.user)
    const img = useSelector((state) => state.img)

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.rowView}>
                    {img == null ?
                        <Image style={styles.img} resizeMode='contain' source={require('../../assets/images/avatar.png')} />
                        :
                        <Image style={styles.img} resizeMode='contain' source={{ uri: img }} />}
                    <View style={styles.leftpad}>
                        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                        <Text style={styles.subname}>{user.mobile} </Text>
                        <Text style={styles.subname}>{user.email} </Text>
                    </View>
                </View>
                <View style={styles.cardView}>
                    <CardView
                        cardElevation={5}
                        cornerRadius={8}
                        cardMaxElevation={1}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Order History') }}>
                            <View style={styles.rowView1}>
                                <View style={styles.rowView}>
                                    <Icon
                                        name='receipt'
                                        color='#000'
                                        size={24}
                                    />
                                    <Text>  Order History</Text>
                                </View>
                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardView>
                </View>
                <View style={styles.cardView}>
                    <CardView
                        cardElevation={5}
                        cornerRadius={8}
                        cardMaxElevation={1}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
                            <View style={styles.rowView1}>
                                <View style={styles.rowView}>
                                    <Icon
                                        name='shopping-cart'
                                        color='#000'
                                        size={24}
                                    />
                                    <Text>  Cart</Text>
                                </View>

                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardView>
                </View>
                <View style={styles.cardView}>
                    <CardView
                        cardElevation={5}
                        cornerRadius={8}
                        cardMaxElevation={1}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Shipping Address') }}>
                            <View style={styles.rowView1}>
                                <View style={styles.rowView}>
                                    <Icon
                                        name='location-pin'
                                        color='#000'
                                        size={24}
                                    />
                                    <Text>  Shipping Address</Text>
                                </View>

                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardView>
                </View>
                <View style={styles.cardView}>
                    <CardView
                        cardElevation={5}
                        cornerRadius={8}
                        cardMaxElevation={1}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Edit Profile') }}>
                            <View style={styles.rowView1}>
                                <View style={styles.rowView}>
                                    <Icon
                                        name='edit'
                                        color='#000'
                                        size={24}
                                    />
                                    <Text>  Edit Profile</Text>
                                </View>

                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardView>
                </View>
                <View style={styles.cardView}>
                    <CardView
                        cardElevation={5}
                        cornerRadius={8}
                        cardMaxElevation={1}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Reset Password') }}>
                            <View style={styles.rowView1}>
                                <View style={styles.rowView}>
                                    <Icon
                                        name='lock'
                                        color='#000'
                                        size={24}
                                    />
                                    <Text>  Reset Password</Text>
                                </View>

                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardView>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = create({
    main: {
        flex: 1
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 50,

    },
    leftpad: {
        paddingLeft: 20
    },
    rowView: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    rowView1: {
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingBottom: 8,
        textAlign: 'center'
    },
    subname: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    cardView: {
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 12
    }
})

export default Profile
