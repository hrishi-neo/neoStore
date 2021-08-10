import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { create } from '../utilities/normalize';

/**
 * 
 * @returns Custom Text Input
 * @author Hrishikesh Kedar
 * @description A functional component which returns Text input with title, icon and error message
 * @param label label for Text Input
 * @param hint hint for Text Input
 * @param secureTextEntry 
 * @param icon icon for Text Input
 * @param value value for Text Input
 * @param onChangeText  function to handle change in value 
 * @param err error messgae for Text Input
 */

const CustomTextInput = ({ label, hint, secureTextEntry, icon, value, onChangeText, err }) => {

    const [iconn, setIconn] = useState(icon)
    const [secure, setSecure] = useState(secureTextEntry)
    
    const onIconPressed = () => {
        if (iconn == "visibility-off") {
            setIconn("visibility")
            setSecure(false)
        } else if (iconn == "visibility") {
            setIconn("visibility-off")
            setSecure(true)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    placeholder={hint}
                    placeholderTextColor="gray"
                    secureTextEntry={secure}
                    value={value}
                    onChangeText={onChangeText}

                />
                <Icon
                    name={iconn}
                    color='#000'
                    size={20}
                    onPress={onIconPressed}
                />
            </View>
            {err ? <Text style={styles.invalid}>{err}</Text> : null}

        </View>
    )
}
const styles = create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        color: 'black'
    },
    input: {
        flex: 1,
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        height: 35,
        alignItems: 'center'
    },
    invalid: {
        color: 'red',
        fontSize: 10
    }
})

export default CustomTextInput