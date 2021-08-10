import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CustomTextInput from '../../components/CustomTextInput'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../redux/action'
import { useSelector } from 'react-redux'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns reset password screen
 * @author Hrishikesh Kedar
 * @description A functional component for reset password screen
 * @param  navigation 
 */

const ResetPassword = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [Perr, setPErr] = useState();
    const [newP, setNewP] = useState('')
    const dispatch = useDispatch()
    const [newerr, setNewErr] = useState();
    const [confirm, setConfirm] = useState('')
    const token = useSelector((state) => state.user.token)
    const [Cerr, setCErr] = useState();
    const onSubmit = async () => {
        await dispatch(resetPassword({ token: token, password: password, newPassword: newP }))
        navigation.navigate('Home')
    }
    return (
        <View style={styles.main}>
            <Text style={styles.img}>NeoStore</Text>
            <CustomTextInput
                label="Enter current Password"
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
                label="Enter New Password"
                hint="********"
                icon="visibility-off"
                value={newP}
                err={newerr}
                onChangeText={(pass) => {
                    const check = pass
                    setNewP(pass)
                    if (!check) {
                        setNewErr("password is a required field")
                    }
                    else if (String(check).length < 8) {
                        setNewErr("password should be atleast 8 chars")
                    }
                    else {
                        setNewErr(null)
                    }
                }}
                secureTextEntry />
            <CustomTextInput
                label="Confirm New Password"
                hint="********"
                icon="visibility-off"
                value={confirm}
                err={Cerr}
                onChangeText={(pass) => {
                    const check = pass
                    setConfirm(pass)
                    if (!check) {
                        setCErr("password is a required field")
                    }
                    else if (String(check) != newP) {
                        setCErr("password must match")
                    }
                    else {
                        setCErr(null)
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
    main: {
        flex: 1,
        padding: 10,
    }, dateView: {
        width: 200,
        alignSelf: 'center',

    },
    btn: {
        borderRadius: 20,
        padding: 10,
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#1E90FF'

    },
    title: {
        padding: 8,
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 16
    },

    img: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 36,
        padding: 24,
        color: '#8B0000'

    },

})
export default ResetPassword
