import React, { useEffect } from 'react'
import { View, ActivityIndicator} from 'react-native'
import { FAB } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { getAddress } from '../../redux/action'
import { useSelector } from 'react-redux'
import ShipAddressList from './ShipAddressList';
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns List of addresses
 * @author Hrishikesh Kedar
 * @description A functional component which returns List of addresses and also allows to add address
 * @param  navigation 
 */

const ShippingAddress = ({ navigation }) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const loading = useSelector((state) => state.loading)
    const address = useSelector((state) => state.address)
    console.log(address)

    useEffect(() => {
        dispatch(getAddress({ token: token }))
    }, [])


    const addAddress = () => {
        navigation.navigate('Add Address')
    }

    return (
        <View style={styles.main} >
            <ShipAddressList data={address} />
            <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#000" />
                    
            <FAB
                style={styles.fab}
                icon="plus"
                large
                color='#fff'
                onPress={() => { addAddress() }}
            />
        </View>
    )
}
const styles = create({
    main: {
        flex: 1,
    }, 
    fab: {
        margin: 16,
        right: 5,
        bottom: 50,
        position: 'absolute',
        backgroundColor: '#1E90FF',
    }, 
    indicator: {
        position: 'absolute',
        alignSelf:'center'
    },
})
export default ShippingAddress
