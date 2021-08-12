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
  useEffect(() => {
    dispatch(getData());
    dispatch(getProd());
    setFilteredDataSource(prod);
    setMasterDataSource(prod);
    SplashScreen.hide();
  }, []);

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
