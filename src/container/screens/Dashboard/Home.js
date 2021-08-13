import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {getData,getProd} from '../../../redux/action';
import {useSelector} from 'react-redux';
import Sliderbox from '../../../components/Sliderbox';
import {SearchBar} from 'react-native-elements';
import {create} from '../../../utilities/normalize';
import SplashScreen from 'react-native-splash-screen';
import CardView from 'react-native-cardview';
import {Rating} from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';


/**
 *
 * @returns jsx of Dashboard screen
 * @author Hrishikesh Kedar
 * @description A functional component which returns dashboard of the app with drawer, searchbar, image slider, and top 5 products
 * @param  navigation used to navigate to different screens
 */

const Home = ({navigation}) => {
  const imgData = [{"url":require('../../../assets/images/sofa.png'),"cat":"Sofa"},
  {"url":require('../../../assets/images/bed.png'),"cat":"Bed"},
  {"url":require('../../../assets/images/dining.png'),"cat":"Dining"},
  {"url":require('../../../assets/images/chair.png'),"cat":"Chair"},
  {"url":require('../../../assets/images/cupboard.png'),"cat":"Cupboard"},
  {"url":require('../../../assets/images/table.png'),"cat":"Table"},
  ];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const prod = useSelector((state) => state.prod);
  const loading = useSelector((state) => state.loading);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
    
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
   
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.name}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    navigation.navigate('ProductDetail', {item});
  };

  const onSubmit = (item) => {
    console.log('kk');
    navigation.navigate('ProductDetail', {item});
  };
  const sendNotify=()=>{
    // PushNotification.createChannel(
    //   {
    //     channelId: "12345678", // (required)
    //     channelName: "My channel", // (required)
    //     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    //     importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //   },
    //   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    // );
    // PushNotification.localNotification({
    //   /* Android Only Properties */
    //   channelId: "12345678", // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //   ticker: "My Notification Ticker", // (optional)
    //   showWhen: true, // (optional) default: true
    //   autoCancel: true, // (optional) default: true
    //   largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    //   largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    //   bigText: "Welcome to NeoStore! We provide different range of Products", // (optional) default: "message" prop
    //   //subText: "This is a subText", // (optional) default: none
    //   bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //   bigLargeIcon: "ic_launcher", // (optional) default: undefined
    //   bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    //   color: "blue", // (optional) default: system default
    //   vibrate: true, // (optional) default: true
    //   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //   tag: "some_tag", // (optional) add tag to message
    //   group: "group", // (optional) add group to message
    //   groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    //   ongoing: false, // (optional) set whether this is an "ongoing" notification
    //   priority: "high", // (optional) set notification priority, default: high
    //   visibility: "private", // (optional) set notification visibility, default: private
    //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    //   shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    //   onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      
    //   when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    //   usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    //   timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
    //   messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
    
    //   //actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    //   invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    
    //   /* iOS only properties */
    //   category: "", // (optional) default: empty string
    //   subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
    
    //   /* iOS and Android properties */
    //   id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //   title: "Welcome To NeoStore", // (optional)
    //   message: "My Notification Message", // (required)
    //  // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //   playSound: true, // (optional) default: true
    //   soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //  // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //  // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // });
    PushNotificationIOS.addNotificationRequest({
      id: 'notificationWithSound',
      title: 'Sample Title',
      subtitle: 'Sample Subtitle',
      body: 'Sample local notification with custom sound',
      sound: 'customSound.wav',
      badge: 1,
    });
  }
  useEffect(() => {
    dispatch(getData());
    dispatch(getProd());
    setFilteredDataSource(prod);
    setMasterDataSource(prod);
    SplashScreen.hide();
   
    requestUserPermission()
    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      (data) => {
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      (data) => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );
    sendNotify()
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },
    
    //   // (required) Called when a remote is received or opened, or local notification is opened
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    
    //     // process the notification
    //     //alert('loding')
    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    
    //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //   onAction: function (notification) {
    //     console.log("ACTION:", notification.action);
    //     console.log("NOTIFICATION:", notification);
    
    //     // process the action
    //   },
    
    //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //   onRegistrationError: function(err) {
    //     console.error(err.message, err);
    //   },
    
    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    
    //   // Should the initial notification be popped automatically
    //   // default: true
    //   popInitialNotification: true,
    
    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    * - if you are not using remote notification or do not have Firebase installed, use this:
    //    *     requestPermissions: Platform.OS === 'ios'
    //    */
    //   requestPermissions: true,
    // });
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const FCM_TOKEN = await messaging().getToken()
      console.log(FCM_TOKEN)
    }
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        numColumns={1}
        ListHeaderComponent={
          <View style={styles.container2}>
            <SearchBar
              round
              searchIcon={{size: 24}}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction('')}
              placeholder="Search for products"
              value={search}
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              lightTheme
            />
            {search.length >= 1 ? (
              <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
            ) : (
              <View>
                <Sliderbox data={imgData} />
                <Text style={styles.title1}>Top products for you</Text>
              </View>
            )}
            {/* <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#D3A550" /> */}
          </View>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            
            <View style={styles.container1}>
              {search.length >=1 ?null :
              <CardView cardElevation={5} cardMaxElevation={2}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  onSubmit(item);
                }}>
                <View style={styles.cardView}>
                  {item.mainImage ? (
                    <Image
                      style={styles.img}
                      resizeMode="stretch"
                      source={{uri: item.mainImage}}
                    />
                  ) : (
                    <Image
                      style={styles.img1}
                      resizeMode="contain"
                      source={require('../../../assets/images/sofa.png')}
                    />
                  )}

                  <View style={styles.content}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.description}</Text>
                    <Text style={styles.pricee}>₹ {item.price}</Text>
                    <Rating
                      style={styles.rating}
                      imageSize={16}
                      readonly
                      startingValue={item.avgRating}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </CardView>
              }
              
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  container2: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  container1: {
    padding: 1,
    margin: 2,
  },
  containerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 5,
    borderTopWidth: 0,
  },
  title1: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
  searchBar: {
    color: 'red',
    backgroundColor: '#F5F5F5',
  },
  itemStyle: {
    padding: 8,
    fontSize: 16,
  },
  img: {
    borderRadius: 12,
    flex: 0.4,
    height: 120,
  },
  img1: {
    borderRadius: 12,
    flex: 0.4,
    height: 120,
  },
  rating: {
    alignSelf: 'flex-start',
    
  },

  cardView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
  },
  content: {
    padding: 4,
    paddingLeft: 8,
    flex: 0.7,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
  pricee: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default Home;
