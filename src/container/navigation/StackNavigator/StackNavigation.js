import React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Auth/Login';
import Signup from '../../screens/Auth/Signup';
import DrawerNavigation from '../DrawerNavigator/DrawerNavigation';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import SetPassword from '../../screens/Auth/SetPassword';
import ProductList from '../../screens/Product/ProductList';
import ProductDetail from '../../screens/Product/ProductDetail';
import StoreLocator from '../../screens/StoreLocator/index'
import Profile from '../../screens/Profile/Profile';
import Cart from '../../screens/Cart/Cart'
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconBadge from 'react-native-icon-badge';
import { useSelector } from 'react-redux'
import PlaceOrder from '../../screens/Order/PlaceOrder';
import ShippingAddress from '../../screens/Address/ShippingAddress';
import AddAddress from '../../screens/Address/AddAddress';
import EditAddress from '../../screens/Address/EditAddress';
import MyOrders from '../../screens/Order/MyOrders';
import OrderDetail from '../../screens/Order/OrderDetail';
import EditProfile from '../../screens/Profile/EditProfile';
import ResetPassword from '../../screens/Auth/ResetPassword';

const Stack = createStackNavigator();
const StackNavigation = () => {
    const cart = useSelector((state) => state.cart)
    const total = cart.length
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                <Stack.Screen name="Set Password" component={SetPassword} />
                <Stack.Screen name="Product List" component={ProductList} />
                <Stack.Screen name="Store Locator" component={StoreLocator} />
                <Stack.Screen name="Place Order" component={PlaceOrder} />
                <Stack.Screen name="Shipping Address" component={ShippingAddress} />
                <Stack.Screen name="Add Address" component={AddAddress} />
                <Stack.Screen name="Edit Address" component={EditAddress} />
                <Stack.Screen name="Order History" component={MyOrders} />
                <Stack.Screen name="Order Details" component={OrderDetail} />
                <Stack.Screen name="Reset Password" component={ResetPassword} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={({ navigation, route }) => ({
                    headerTitle: route.params.item.name,
                    headerRight: () => <IconBadge
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
                                backgroundColor: '#FF0000',
                            }
                        }
                        Hidden={total == undefined || total == 0}
                    />
                })} />
                <Stack.Screen name="My Account" component={Profile} />
                <Stack.Screen name="Edit Profile" component={EditProfile} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation
