import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  Modal,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getCart, placeOrder} from '../../../redux/action';
import {useSelector} from 'react-redux';
import CardView from 'react-native-cardview';
import PlaceOrderList from './PlaceOrderList';
import ProdNameList from './ProdNameList';
import {create} from '../../../utilities/normalize';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import PushNotification from "react-native-push-notification";
/**
 *
 * @returns Place Order Screen
 * @author Hrishikesh Kedar
 * @description A functional component which returns place order screen which allows to place order, see total amount, add shipping address
 * @param  navigation
 */

const PlaceOrder = ({navigation}) => {
  const [showmodal, setShowmodal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.loading);
  const cart = useSelector((state) => state.cart);

  const shipAddress = useSelector((state) => state.shipAddress);
  console.log(shipAddress);
  const user = useSelector((state) => state.user);
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].totalAmount;
  }
  useEffect(() => {
    dispatch(getCart({token: token}));
  }, []);
  const onSubmit = () => {
    navigation.navigate('Shipping Address');
  };
  const orderCNF = () => {
    navigation.navigate('Home');
  };
  const sendNotify=()=>{
    PushNotification.createChannel(
      {
        channelId: "12345678", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "12345678", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ticker: "My Notification Ticker", // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: "Order Confirmed! Thanks for shopping from NeoStore", // (optional) default: "message" prop
      //subText: "This is a subText", // (optional) default: none
      bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      bigLargeIcon: "ic_launcher", // (optional) default: undefined
      bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
      color: "blue", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      
      when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
      messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
    
      //actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    
      /* iOS only properties */
      category: "", // (optional) default: empty string
      subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
    
      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "Order Confirmed", // (optional)
      message: "My Notification Message", // (required)
     // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
     // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
     // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  }

  const confirmOrd = async () => {
    if (shipAddress == undefined) {
      alert('Please add shipping address');
    } else {
      
      try {
        
        const url = 'https://api.razorpay.com/v1/orders';
        const response = await axios.post(
          url,
          {
            amount: total,
            currency: 'INR',
            receipt: 'Receipt no. 1',
            payment_capture: 1,
            notes: {
              notes_key_1: 'Tea, Earl Grey, Hot',
              notes_key_2: 'Tea, Earl Grey… decaf.',
            },
          },
          {
            headers: {
              Authorization:
                'Basic' +
                ' cnpwX3Rlc3RfTG1GRjVRNnpIdkJpY3g6Y3ZNakdJMmhkRE8xRHE2MDlVWVpmZDE2',
            },
          },
          {
            auth: {
              username: 'rzp_test_LmFF5Q6zHvBicx',
              password: 'cvMjGI2hdDO1Dq609UYZfd16',
            },
          },
        );

        if (response.status == 200) {
          const ORDER_ID = response.data.id;

          var options = {
            description: 'Neostore Pvt. Ltd.',
            image: 'https://neoscrum.000webhostapp.com/180.png',
            currency: 'INR',
            key: 'rzp_test_LmFF5Q6zHvBicx',
            amount: '5000',
            name: 'NeoSTORE',
            order_id: ORDER_ID, //Replace this with an order_id created using Orders API.
            prefill: {
              email: user.email,
              contact: user.mobile,
              name: user.firstName + ' ' + user.lastName,
            },
            theme: {color: '#1E90FF'},
          };
          RazorpayCheckout.open(options)
            .then(async (data) => {
              // handle success
              console.log(data)
              Toast.show("Payment Successful", Toast.LONG);
              sendNotify()
              await dispatch(placeOrder({token: token, addressId: shipAddress._id}));
             setShowmodal(true);
            })
            .catch((error) => {
              // handle failure
             console.log(error)
             Toast.show('Payment processing cancelled by user', Toast.LONG);
            });
        } else {
          alert('Something went wrong! Please try again !');
        }
      } catch (e) {
        Toast.show("Something went wrong! Please try again!", Toast.LONG);
      }
    }
  };
  return (
    <View style={styles.main}>
      <ScrollView>
        {shipAddress == undefined ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              onSubmit();
            }}
            style={styles.btn}>
            <Text style={{color: '#fff', fontSize: 16}}>
              Add Shipping Address
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.container}>
            <CardView cardElevation={5} cardMaxElevation={2}>
              <View style={styles.cardView}>
                <Text style={styles.title}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.subtitle}>{shipAddress.addressLine},</Text>
                <Text style={styles.subtitle}>
                  {shipAddress.city} - {shipAddress.pincode},{' '}
                  {shipAddress.state}, {shipAddress.country}
                </Text>
                <Text style={styles.subtitle}>{user.mobile}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    onSubmit();
                  }}
                  style={styles.btn}>
                  <Text style={{color: '#fff', fontSize: 16}}>
                    Change or Add Address
                  </Text>
                </TouchableOpacity>
              </View>
            </CardView>
          </View>
        )}

        <PlaceOrderList data={cart} />
        <Text style={styles.price}>Price Details</Text>
        <ProdNameList data={cart} />
        <View style={styles.mainView}>
          <Text style={styles.total}>Total Amount</Text>
          <Text style={styles.total1}> ₹ {total} </Text>
        </View>
      </ScrollView>
      <Modal transparent={false} animationType="slide" visible={showmodal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.selectStyle}>ORDER CONFIRMED </Text>

            <View>
              <Image
                style={styles.gifView}
                source={{
                  uri: 'https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif',
                }}
              />
              <Text style={styles.subStyle}>
                Thanks for placing order with NeoSTORE !
              </Text>
              <Text style={styles.subStyle}>Your Order has been confirmed</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                orderCNF();
              }}
              style={styles.okbtn}>
              <Text style={{color: '#fff', fontSize: 16}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ActivityIndicator
        style={styles.indicator}
        animating={loading}
        size="large"
        color="#000"
      />
      <View style={styles.filterView}>
        <View style={styles.rateView3}>
          <Text style={styles.cartTitle2}> ₹ {total} </Text>
        </View>
        <View style={styles.rateView2}>
          <TouchableOpacity
            onPress={() => {
              confirmOrd();
            }}>
            <Text style={styles.cartTitle}> CONFIRM ORDER </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = create({
  container: {
    padding: 4,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
  },
  selectStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
    alignSelf: 'center',
  },
  subStyle: {
    fontSize: 14,
    padding: 8,
    alignSelf: 'center',
  },
  gifView: {
    height: 150,
    width: 150,
    paddingBottom: 50,
    paddingTop: 50,
    alignSelf: 'center',
    borderRadius: 30,
  },
  main: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
  price: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 20,
    marginTop: 8,
  },
  cardView: {
    padding: 4,
  },
  total: {
    padding: 12,
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 20,
    flex: 0.7,
    paddingBottom: 50,
  },
  btn: {
    borderRadius: 20,
    padding: 10,
    margin: 16,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  okbtn: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    margin: 4,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    alignSelf: 'center',
  },
  total1: {
    padding: 12,
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 20,
    flex: 0.3,
    paddingBottom: 50,
  },
  rateView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7F7F',
    paddingLeft: 4,
    marginRight: 8,
    borderRadius: 8,
    flex: 0.4,
    margin: 4,
    padding: 8,
  },
  rateView3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    paddingLeft: 4,
    marginRight: 8,
    borderRadius: 8,
    flex: 0.4,
    margin: 4,
    padding: 8,
  },
  img: {
    width: '100%',
    height: 300,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    padding: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingLeft: 4,
    padding: 2,
    fontSize: 13,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  content: {
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 14,
    padding: 8,
    margin: 8,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterView: {
    flexDirection: 'row',
    height: 60,
    padding: 4,
    alignItems: 'baseline',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  cartTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
  cartTitle2: {
    fontWeight: 'bold',
    color: '#000',
  },
  textView: {
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 14,
    padding: 8,
    backgroundColor: '#fff',
  },
});
export default PlaceOrder;
