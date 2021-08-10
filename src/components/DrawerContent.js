import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import {
    Title,
    Drawer,
} from 'react-native-paper'
import Icons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/action';
import IconBadge from 'react-native-icon-badge';
import { create } from '../utilities/normalize';

/**
 * 
 * @returns Custom Drawer Content
 * @author Hrishikesh Kedar
 * @description A functional component which returns content of the drawer and allows user to navigate to various screens
 * @param props props used to handle navigation
 * 
 */

const DrawerContent = (props) => {
    const [show, setShow] = useState(false)
    const loggedIn = useSelector((state) => state.loggedIn)
    const user = useSelector((state) => state.user)
    const cart = useSelector((state) => state.cart)
    const total = cart.length
    const img = useSelector((state) => state.img)
    console.log(img)
    const dispatch = useDispatch()
    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    {loggedIn ?
                        <View style={styles.userInfoSection}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { props.navigation.navigate('My Account') }}>
                                <View style={{ padding: 4, justifyContent: 'center' }}>
                                    {img == null ?
                                        <Image style={styles.img} resizeMode='contain' source={require('../assets/images/avatar.png')} />
                                        :
                                        <Image style={styles.img} resizeMode='contain' source={{ uri: img }} />}
                                    <Title style={styles.title1}>{user.firstName} {user.lastName}</Title>

                                </View>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.userInfoSection}>
                            <View style={{ padding: 8, justifyContent: 'center' }}>
                                <Title style={styles.title}> NeoStore</Title>
                            </View>
                        </View>
                    }



                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialIcons color='#1E90FF' name="home" size={size} />)}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }} />
                        {loggedIn ? null : <DrawerItem
                            icon={({ size }) => (
                                <Icons color='#1E90FF' name="login" size={size} />)}
                            label="Login"
                            onPress={() => { props.navigation.navigate('Login') }} />}
                        {loggedIn ? null : <DrawerItem
                            icon={({ size }) => (
                                <Icons color='#1E90FF' name="person-add-alt" size={size} />)}
                            label="Signup"
                            onPress={() => { props.navigation.navigate('Signup') }} />}

                        {loggedIn ? <DrawerItem
                            icon={({ size }) => (
                                <Icons color='#1E90FF' name="person" size={size} />)}
                            label="My Account"
                            onPress={() => { props.navigation.navigate('My Account') }} /> : null}

                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialIcons color='#1E90FF' name="sofa" size={size} />)}
                            label="All Products"
                            onPress={() => { props.navigation.navigate('Product List') }} />
                        {loggedIn ? <DrawerItem
                            icon={({ size }) => (
                                <IconBadge
                                    MainElement={
                                        <Icons color="#1E90FF" name="shopping-cart" size={28} style={{ marginRight: 10, paddingTop: 10 }} onPress={() => { navigation.navigate('Cart') }} />
                                    }
                                    BadgeElement={
                                        <Text style={{ color: '#FFFFFF' }}>{total}</Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            right: 1,
                                            minWidth: 20,
                                            height: 20,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#FF0000'
                                        }
                                    }
                                    Hidden={total == undefined || total == 0}
                                />
                            )}
                            label="Cart"
                            onPress={() => { props.navigation.navigate('Cart') }} /> : null}
                        {loggedIn ? <DrawerItem
                            icon={({ size }) => (
                                <Icons color='#1E90FF' name="list" size={size} />)}
                            label="My Orders"
                            onPress={() => { props.navigation.navigate('Order History') }} /> : null}
                        <DrawerItem
                            icon={({ size }) => (
                                <Icons color='#1E90FF' name="location-pin" size={size} />)}
                            label="Store Locator"
                            onPress={() => { props.navigation.navigate('Store Locator') }} />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            {loggedIn ? <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem onPress={() => {
                    dispatch(logout())

                }
                } icon={({ size }) => (<Icons color='#1E90FF'
                    name="exit-to-app" size={size} />)} label="Sign Out" />
            </Drawer.Section> : null}

        </View>
    )
}
const styles = create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        padding: 12,
        color: '#8B0000'
    },
    title1: {
        fontSize: 14,
        marginTop: 4,
        color: 'black',
        fontWeight: 'bold',
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 50,

    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
});
export default DrawerContent
