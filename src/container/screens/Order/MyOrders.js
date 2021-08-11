import React, { useEffect } from 'react'
import {  View ,ActivityIndicator} from 'react-native'
import { useDispatch } from 'react-redux'
import { getOrder } from '../../../redux/action'
import { useSelector } from 'react-redux'
import MyOrderList from './MyOrderList'
import { create } from '../../../utilities/normalize';

/**
 * 
 * @returns Order List 
 * @author Hrishikesh Kedar
 * @description A functional component which returns orders list
 * @param  navigation 
 */

const MyOrders = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const loading = useSelector((state) => state.loading)
    const order = useSelector((state) => state.order)
   

    useEffect(() => {
        dispatch(getOrder({ token: token }))
    }, [])
    
    return (
        <View style={styles.main}>
           
            <MyOrderList data={order} />
            <ActivityIndicator
        style={styles.loading}
        animating={loading}
        size="large"
        color="#1E90FF"
      />
        </View>
    )
}
const styles = create({

    main: {
        flex: 1,

    }, loading: {
        position: 'absolute',
        alignSelf: 'center',
      },
})
export default MyOrders
