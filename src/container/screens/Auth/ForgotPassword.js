import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import {useDispatch} from 'react-redux';
import {forgotPassword} from '../../../redux/action';
import {create} from '../../../utilities/normalize';
/**
 *
 * @returns Forgot password screen
 * @author Hrishikesh Kedar
 * @description A functional component for forgot password screen
 * @param  navigation
 */

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState();
  const dispatch = useDispatch();

  const onSubmit = () => {
    //dispatch(forgotPassword(email))
   navigation.navigate('Set Password');
    
  };
 

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password ?</Text>
      <CustomTextInput
        label="Email"
        hint="test@gmail.com"
        value={email}
        err={err}
        onChangeText={(email) => {
          const check = email;
          let pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          setEmail(email);
          if (!check) {
            setErr('email is a required field');
          } else if (!pattern.test(String(check).toLowerCase())) {
            setErr('email is not valid');
          } else {
            setErr(null);
          }
        }}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          onSubmit();
        }}
        style={styles.btn}>
        <Text style={{color: '#fff', fontSize: 16}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    borderRadius: 20,
    padding: 10,
    marginTop: 24,
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  title: {
    fontSize: 18,
    padding: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
export default ForgotPassword;
