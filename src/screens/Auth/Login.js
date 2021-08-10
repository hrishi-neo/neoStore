import React, { useState, useEffect } from 'react'
import { View, Text,Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import CustomTextInput from '../../components/CustomTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action';
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
 * @returns Login screen
 * @author Hrishikesh Kedar
 * @description A functional component for login screen
 * @param  navigation 
 */

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState();
    const [Perr, setPErr] = useState();
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.loggedIn)
    const loading = useSelector((state) => state.loading)
    const onSubmit = () => {
        const user = {

            "email": email,
            "password": password,

        }
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!pattern.test(String(email).toLowerCase())) {
            alert("Invalid email")
        }
        else if (password.length < 8) {
            alert("Password must be atleast 8 chars")
        }
        else {
            dispatch(login(user));
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
    const onForgot = () => {
        navigation.navigate('Forgot Password');
    }
    useEffect(() => {
        if (loggedIn == true) {
            navigation.navigate('Home')
        }
    }, [loggedIn])

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                {/* <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#1E90FF" /> */}

                <Text style={styles.img}>NeoStore</Text>

                <CustomTextInput
                    label="Username"
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
                <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { onSubmit() }}
                    style={styles.btn}>
                    <Text style={{ color: '#fff', fontSize: 16, }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 8 }}
                    onPress={() => { onForgot() }}
                    activeOpacity={0.5}>
                    <Text style={styles.link}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5} style={{ marginTop: 16 }}
                    onPress={() => { navigation.navigate('Signup') }}>
                    <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
        padding: 8,
        backgroundColor: '#fff'
    },
    rowView: {
        flexDirection: 'row',
        padding: 10,
        alignItems:'center',
        justifyContent:'center',      
        paddingBottom:50
    },
    logo: {
        width: 30,
        height: 30,
        paddingLeft: 40,
    },
    title1:{
        fontSize:12,
        
    },
    img: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 36,
        padding: 24,
        color: '#8B0000'
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
        fontSize: 12,
        alignSelf: 'center',
        padding: 4
    },
    title: {
        fontSize: 24,
        padding: 8,
        alignSelf: 'center',
        marginBottom: 24,
        fontWeight: 'bold'
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
export default Login
