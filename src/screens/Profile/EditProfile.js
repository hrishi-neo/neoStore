import React, { useState } from 'react'
import { View, ScrollView, Text, Image, StyleSheet ,TouchableOpacity} from 'react-native'
import CustomTextInput from '../../components/CustomTextInput'
import { useSelector } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux'
import { saveIMG } from '../../redux/action'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Edit Profile
 * @author Hrishikesh Kedar
 * @description A functional component which User data and allows to modify it 
 * @param  navigation
 */

const EditProfile = ({ navigation}) => {
    const user = useSelector((state) => state.user)
    const img = useSelector((state) => state.img)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.firstName)
    const [last, setLast] = useState(user.lastName)
    const dispatch = useDispatch()
    const [number, setNumber] = useState(String(user.mobile))
    const [date, setDate] = useState(new Date())
   
    const onSubmit =()=>{
        navigation.goBack()
    }

    const editImage =()=>{
        launchImageLibrary({ quality: 0.5 }, (response) => {
            const img = response.assets[0].uri
           dispatch(saveIMG(img))
            
        })
    }

    return (
        <ScrollView>
            <View style={styles.main}>
                <TouchableOpacity onPress={()=>editImage()}>

               {img==null?
                <Image style={styles.img} resizeMode='contain' source={require('../../assets/images/avatar.png')} />
               :
               <Image style={styles.img} resizeMode='contain' source={{uri:img}} />}
               
                </TouchableOpacity>
                <CustomTextInput
                    label="First Name"
                    hint="hrishikesh"
                    value={name}
                    onChangeText={(name) => {
                        setName(name)

                    }}
                />
                
                <CustomTextInput
                    label="Last Name"
                    hint="kedar"
                    value={last}
                    onChangeText={(last) => {
                        setLast(last)

                    }}
                />
                <CustomTextInput
                    label="Email"
                    hint="test@gmail.com"
                    value={email}
                    onChangeText={(email) => {
                        setEmail(email)

                    }}
                />
                <CustomTextInput
                    label="Phone number"
                    hint="0123456789"
                    value={number}
                    onChangeText={(number) => {
                        setNumber(number)

                    }}
                />
                <Text style={styles.title}>Enter Date of Birth</Text>
                <DatePicker
                    style={styles.dateView}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1990-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { setDate(date) }}
                />
                <TouchableOpacity
                    activeOpacity={0.5} onPress={() => { onSubmit() }}
                    style={styles.btn}>
                    <Text style={{ color: '#fff', fontSize: 16, }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = create({
    main: {
        flex: 1,
        padding: 10,
    }, dateView: {
        width:200,
        alignSelf:'center',
       
    },
    btn: {
        borderRadius: 20,
        padding: 10,
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#1E90FF'

    },
    title:{
        padding: 8,
        fontSize:14,
        alignSelf: 'center',
        marginTop:16
    },
    
    img: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center',

    },
    
})

export default EditProfile
