import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import CustomTextInput from '../../../components/CustomTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux';
import { addAddress } from '../../../redux/action';
import { useSelector } from 'react-redux'
import { create } from '../../../utilities/normalize';

/**
 * 
 * @returns Add Shipping Address
 * @author Hrishikesh Kedar
 * @description A functional component which allows to add shipping address
 * @param  navigation 
 */

const AddAddress = ({navigation}) => {

    const [add, setAdd] = useState('')
    const [adderr, setAddErr] = useState();
    const [city, setCity] = useState('')
    const [cityerr, setCityErr] = useState();
    const [pin, setPin] = useState('')
    const [pinerr, setPinErr] = useState();
    const [state, setState] = useState('')
    const [staterr, setStatErr] = useState();
    const [con, setCon] = useState('')
    const [conerr, setConErr] = useState();
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading)
    const token = useSelector((state) => state.user.token)

    const onSubmit = async () => {
        const address = {
            "addressLine": add,
            "pincode": pin,
            "city": city,
            "state": state,
            "country": con,
            token: token

        }
        if (add.length < 1) {
            alert("Address is required")
        } else if (pin.length < 1) {
            alert("PIN Code is required")
        } else if (city.length < 1) {
            alert("City is required")
        } else if (state.length < 1) {
            alert("State is required")
        }
        else if (con.length < 1) {
            alert("Country is required")
        }
        else {
            await dispatch(addAddress(address));
            navigation.navigate('Shipping Address')
        }

    }
    return (
        <KeyboardAwareScrollView >
            <View style={styles.container}>
                <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#1E90FF" />
                
                <CustomTextInput
                    label="Address"
                    hint="enter address"
                    value={add}
                    err={adderr}
                    onChangeText={(name) => {
                        const check = name
                        setAdd(name)
                        if (!check) {
                            setAddErr("address is a required field")
                        }

                        else {
                            setAddErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="City"
                    hint="enter city"
                    value={city}
                    err={cityerr}
                    onChangeText={(name) => {
                        const check = name
                        setCity(name)
                        if (!check) {
                            setCityErr("city is a required field")
                        }

                        else {
                            setCityErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="PIN Code"
                    hint="enter pin code"
                    value={pin}
                    err={pinerr}
                    onChangeText={(name) => {
                        const check = name
                        setPin(name)
                        if (!check) {
                            setPinErr("pin code is a required field")
                        }

                        else {
                            setPinErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="State"
                    hint="enter state"
                    value={state}
                    err={staterr}
                    onChangeText={(name) => {
                        const check = name
                        setState(name)
                        if (!check) {
                            setStatErr("state is a required field")
                        }

                        else {
                            setStatErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="Country"
                    hint="enter country"
                    value={con}
                    err={conerr}
                    onChangeText={(name) => {
                        const check = name
                        setCon(name)
                        if (!check) {
                            setConErr("name is a required field")
                        }

                        else {
                            setConErr(null)
                        }
                    }}
                />
                <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { onSubmit() }}
                    style={styles.btn}>
                    <Text style={{ color: '#fff', fontSize: 16, }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 30,
        padding: 12
    }, img: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 36,
        padding: 24,
        color: '#8B0000'
    }, btn: {
        borderRadius: 20,
        padding: 10,
        margin: 24,
        alignItems: 'center',
        backgroundColor: '#1E90FF'
    },
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default AddAddress
