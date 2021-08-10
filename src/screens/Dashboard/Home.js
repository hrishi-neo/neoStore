import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    FlatList
} from 'react-native'
import { useDispatch } from 'react-redux'
import { getData } from '../../redux/action'
import { useSelector } from 'react-redux'
import Sliderbox from '../../components/Sliderbox'
import ProductsList from '../Product/ProductsList'
import { SearchBar } from 'react-native-elements';
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Dashboard
 * @author Hrishikesh Kedar
 * @description A functional component which returns dashboard of the app with drawer, searchbar, image slider, and top 5 products 
 * @param  navigation 
 */

const Home = ({ navigation }) => {

    const imgData = [require('../../assets/images/sofa.png'),
    require('../../assets/images/bed.png'),
    require('../../assets/images/dining.png'),
    require('../../assets/images/chair.png'),
    require('../../assets/images/cupboard.png'),
    require('../../assets/images/table.png')]

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data)
    const prod = useSelector((state) => state.prod)
    const loading = useSelector((state) => state.loading)
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
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

    const ItemView = ({ item }) => {
        console.log(item.length)
        return (
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
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
        navigation.navigate('ProductDetail', { item })
    };

    useEffect(() => {
        dispatch(getData())
        setFilteredDataSource(prod);
        setMasterDataSource(prod);

    }, [])

    return (
        <View style={{ flex: 1 }} >
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.container}>
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={(text) => searchFilterFunction(text)}
                        onClear={(text) => searchFilterFunction('')}
                        placeholder="Search for products"
                        value={search}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.containerStyle}
                        lightTheme

                    />
                    {search.length >= 1 ? <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                    /> : <>
                        <Sliderbox data={imgData} />
                        <Text style={styles.title}>Top products for you</Text>
                        <ProductsList data={data} numofColumn={1} /></>}
                    {/* <ActivityIndicator style={styles.indicator} animating={loading} size="large" color="#D3A550" /> */}
                </View>

            </ScrollView>
        </View>
    )
}

const styles = create({
    container: {
        flex: 1,
        paddingBottom:20,
        backgroundColor: '#F5F5F5'
    },

    containerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderTopWidth: 0
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        padding: 10,
        
    },
    indicator: {
        position: 'absolute',
        alignSelf: 'center'
    },
    searchBar: {

        color: 'red',
        backgroundColor: '#F5F5F5'
    },
    itemStyle: {
        padding: 8,
        fontSize: 16
    }
})

export default Home
