import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import CustomTextInput from '../../components/CustomTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButton } from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/action';
import { useSelector } from 'react-redux'
import { create } from '../../utilities/normalize';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Profile, AccessToken, LoginManager } from 'react-native-fbsdk-next';

/**
 * 
 * @returns Register screen
 * @author Hrishikesh Kedar
 * @description A functional component for user registration screen
 * @param  navigation 
 */

const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [last, setLast] = useState('')
    const [confirm, setConfirm] = useState('')
    const [number, setNumber] = useState('')
    const [err, setErr] = useState();
    const [Perr, setPErr] = useState();
    const [nameerr, setNameErr] = useState();
    const [lasterr, setLastErr] = useState();
    const [confirmerr, setConfirmErr] = useState();
    const [noerr, setNoErr] = useState();
    const [value, setValue] = useState('male');
    const loading = useSelector((state) => state.loading)
    const [isSelected, setSelection] = useState(false);
    const dispatch = useDispatch()

    const onSubmit = async () => {
        const user = {
            "firstName": name,
            "lastName": last,
            "email": email,
            "mobile": number,
            "gender": value,
            "password": password,
            "confirm_password": confirm
        }
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (name.length < 1) {
            alert("First name is required")
        } else if (last.length < 1) {
            alert("Last name is required")
        } else if (number.length < 10) {
            alert("Phone number is required")
        } else if (!value) {
            alert("Gender is required")
        }
        else if (!pattern.test(String(email).toLowerCase())) {
            alert("Invalid email")
        }
        else if (password.length < 8) {
            alert("Password must be atleast 8 chars")
        } else if (confirm != password) {
            alert("Password must match")
        } else if (isSelected == false) {
            alert("Please accept terms and conditions")
        }
        else {
            await dispatch(register(user));
            navigation.navigate('Login')
        }

    }

    const signIt = async () => {
        GoogleSignin.configure();
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    const onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        console.log(data)
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log(facebookCredential)
        const currentProfile = Profile.getCurrentProfile()
        console.log((await currentProfile).firstName)
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    return (
        <KeyboardAwareScrollView >
            <View style={styles.container}>
                {/* <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#1E90FF" /> */}
                <Text style={styles.img}>NeoStore</Text>
                <CustomTextInput
                    label="First Name"
                    hint="hrishikesh"
                    value={name}
                    err={nameerr}
                    onChangeText={(name) => {
                        const check = name
                        setName(name)
                        if (!check) {
                            setNameErr("name is a required field")
                        }

                        else {
                            setNameErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="Last Name"
                    hint="kedar"
                    value={last}
                    err={lasterr}
                    onChangeText={(last) => {
                        const check = last
                        setLast(last)
                        if (!check) {
                            setLastErr("last name is a required field")
                        }
                        else {
                            setLastErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="Email"
                    hint="test@gmail.com"
                    value={email}
                    err={err}
                    onChangeText={(email) => {
                        const check = email
                        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        setEmail(email)
                        if (!check) {
                            setErr("email is a required field")
                        }
                        else if (!pattern.test(String(check).toLowerCase())) {
                            setErr("email is not valid")
                        }
                        else {
                            setErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="Phone number"
                    hint="0123456789"
                    value={number}
                    err={noerr}
                    onChangeText={(number) => {
                        const check = number
                        setNumber(number)
                        if (!check) {
                            setNoErr("phone number is a required field")
                        }
                        else if (String(check).length < 10) {
                            setNoErr("phone number is not valid")
                        }
                        else {
                            setNoErr(null)
                        }
                    }}
                />
                <CustomTextInput
                    label="Password"
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
                    label="Confirm Password"
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
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={styles.radioView}>
                        <Text style={styles.title}>Select Gender</Text>
                        <View style={styles.radioView}>
                            <Text style={styles.title}>Male</Text>
                            <RadioButton color='#1E90FF' uncheckedColor="black" value="male" />
                        </View>
                        <View style={styles.radioView}>
                            <Text style={styles.title}>Female</Text>
                            <RadioButton color='#1E90FF' uncheckedColor="black" value="female" />
                        </View>
                    </View>
                </RadioButton.Group>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        tintColors={{ true: '#1E90FF', false: 'black' }}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>I agree the Terms and Conditions</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { onSubmit() }}
                    style={styles.btn}>
                    <Text style={{ color: '#fff', fontSize: 16, }}>Register</Text>
                </TouchableOpacity>
                <View style={styles.rowView}>
                    <Text style={styles.title1}>Or Continue using </Text>
                    <TouchableOpacity onPress={() => signIt()}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/google.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onFacebookButtonPress()}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/fb.png')} />
                    </TouchableOpacity>
                </View>

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
        padding: 8
    }, rowView: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    logo: {
        width: 30,
        height: 30,
        paddingLeft: 40,
    },
    title1: {
        fontSize: 12,
        padding: 8,
    },
    preview: {
        width: 200,
        height: 200,
        marginTop: 16,
        borderRadius: 16,
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        alignSelf: "center",



    },
    label: {
        margin: 8,
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
    link: {
        color: 'black',
        fontSize: 14,
        alignSelf: 'center',
        padding: 4
    },
    img: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 36,
        padding: 24,
        color: '#8B0000'
    },
    radioView: {
        flexDirection: 'row',
        padding: 6,
        paddingTop: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        padding: 4,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

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

export default Signup
