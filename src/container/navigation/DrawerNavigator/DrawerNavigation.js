import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import Home from '../../screens/Dashboard/Home'
import IconBadge from 'react-native-icon-badge';
import { useSelector } from 'react-redux'

const Drawer = createDrawerNavigator();

const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'NeoSTORE';

    }
}
const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    };

    return (
        <TouchableOpacity onPress={() => toggleDrawer()}>
            <Icons color="#1E90FF" name="menu" size={28} style={{ paddingLeft: 10 }} />
        </TouchableOpacity>

    );
};

const DrawerNavigation = ({ navigation }) => {
    const cart = useSelector((state) => state.cart)
    const total = cart.length
    return (
        <Drawer.Navigator
            drawerStyle={{
                borderBottomRightRadius: 16,
                borderTopRightRadius: 16,
                backgroundColor: 'white'
            }}
            drawerContent={props => <DrawerContent {...props} />}
            drawerContentOptions={{

                itemStyle: { marginVertical: 4 },
            }}

            screenOptions={({ navigation }) => ({
                headerTitleAlign: 'center',
                headerShown: true,
                headerLeft: () => <NavigationDrawerStructure navigation={navigation} />,
                headerRight: () =>
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
                    Hidden={total==undefined || total == 0}
                    />


            })}>
            <Drawer.Screen name="Home" component={Home} options={({ route }) => ({
                title: 'Home',
                headerTitleStyle: {
                    color: 'black',
                    textAlign: 'left'

                },
                headerStyle: {
                    backgroundColor: '#fff',

                },
                headerTitle: getHeaderTitle(route),
                drawerIcon: ({ focused }) => (
                    <Icons
                        name="home"
                        size={32}
                        color={focused ? "#F8EA8C" : "gray"}
                    />
                ),
            })} />

        </Drawer.Navigator>
    )
}

export default DrawerNavigation
