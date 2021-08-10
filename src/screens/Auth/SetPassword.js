import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CustomTextInput from '../../components/CustomTextInput';
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Set password screen
 * @author Hrishikesh Kedar
 * @description A functional component for Set password screen
 * @param  navigation 
 */

const SetPassword = ({ navigation }) => {
    const [otp, setOTP] = useState('')
    const [err, setErr] = useState();
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [Perr, setPErr] = useState();
    const [confirmerr, setConfirmErr] = useState();

    const onSubmit = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP sent to your mail</Text>
            <CustomTextInput
                label="OTP"
                hint="123456"
                value={otp}
                err={err}
                onChangeText={(otp) => {
                    const check = otp
                    setOTP(otp)
                    if (!check) {
                        setErr("otp is a required field")
                    }
                    else if (String(check).length < 6) {
                        setErr("otp is not valid")
                    }
                    else {
                        setErr(null)
                    }
                }}
            />
            <CustomTextInput
                label="Enter new password"
                hint="********"
                icon="visibility-off"
                value={password}
                err={Perr}
                onChangeText={(pass) => {
                    const check = pass
                    setPassword(pass)
                    if (!check) {
                        setPErr("password is a required field")
                    }
                    else if (String(check).length < 8) {
                        setPErr("password should be atleast 8 chars")
                    }
                    else {
                        setPErr(null)
                    }
                }}
                secureTextEntry />
            <CustomTextInput
                label="Enter password again"
                hint="********"
                icon="visibility-off"
                value={confirm}
                err={confirmerr}
                onChangeText={(pass) => {
                    const check = pass
                    setConfirm(pass)
                    if (!check) {
                        setConfirmErr("password is a required field")
                    }
                    else if (String(check) != password) {
                        setConfirmErr("password must match")
                    }
                    else {
                        setConfirmErr(null)
                    }
                }}
                secureTextEntry />
            <TouchableOpacity
                activeOpacity={0.5} onPress={() => { onSubmit() }}
                style={styles.btn}>
                <Text style={{ color: '#fff', fontSize: 16, }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = create({
    container: {
        flex: 1,
        padding: 8,
        margin: 8,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    btn: {
        borderRadius: 20,
        padding: 10,
        marginTop: 24,
        marginLeft: 8,
        marginRight: 8,
        alignItems: 'center',
        backgroundColor: '#1E90FF'
    },
    title: {
        fontSize: 18,
        padding: 8,
        alignSelf: 'center',
        marginBottom: 10,


    }
})
export default SetPassword
