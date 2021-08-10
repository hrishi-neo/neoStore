import React, { useEffect } from 'react'
import {  View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getOrder } from '../../redux/action'
import { useSelector } from 'react-redux'
import MyOrderList from './MyOrderList'
import { create } from '../../utilities/normalize';

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
            
        </View>
    )
}
const styles = create({

    main: {
        flex: 1,

    },
})
export default MyOrders
