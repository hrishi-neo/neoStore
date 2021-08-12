import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  Modal,
} from 'react-native';
import ProductsList from './ProductsList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {getProd} from '../../../redux/action';
import {useSelector} from 'react-redux';

/**
 *
 * @returns jsx of Products List which shows various products available
 * @author Hrishikesh Kedar
 * @description A functional component which returns all products available and provide option to filter content on the basis of category, price, color, rating
 *
 */

const ProductList = ({route}) => {
  const cat =route.params
  console.log(cat)
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.prod);
  const [data, setData] = useState(prod);
  const loading = useSelector((state) => state.loading);
  const [category, setCategory] = useState('');
  const [showmodal, setShowmodal] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    dispatch(getProd());
    updateProds(cat.cat)
  }, []);

  const showModal = (cat) => {
    setShowmodal(true);
    setCategory(cat);
  };

  const updateProdsbyPrice = (bool) => {
    if (bool == true) {
      data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setReset(true);
    } else {
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setReset(true);
    }
    setShowmodal(false);
  };

  const updateProdsbyRating = (bool) => {
    if (bool == true) {
      data.sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating));
      setReset(true);
    } else {
      data.sort((a, b) => parseFloat(a.avgRating) - parseFloat(b.avgRating));
      setReset(true);
    }
    setShowmodal(false);
  };

  const updateProdsbyColor = async (color) => {
    try {
      const filtered = data.filter(function (entry) {
        return entry.color.name == color;
      });
      setData(filtered);
      setReset(true);
      setShowmodal(false);
    } catch (error) {
      setShowmodal(false);
    }
  };

  const updateProdsbyCat = async (cat) => {
    try {
      const filtered = data.filter(function (entry) {
        return entry.category.name == cat;
      });
      setData(filtered);
      setReset(true);
      setShowmodal(false);
    } catch (error) {
      setShowmodal(false);
    }
  };
  const removeFilter = () => {
    dispatch(getProd());
    setData(prod)
    setReset(false);
  };
  const updateProds = async (cat) => {
    try {
      const filtered = data.filter(function (entry) {
        return entry.category.name == cat;
      });
      setData(filtered);
     
      setShowmodal(false);
    } catch (error) {
      setShowmodal(false);
    }
  };
  
  return (
    <View style={{flex: 1}}>
      {reset == true ? (
          <TouchableOpacity
          onPress={() => {
            removeFilter();
          }}>
        <View style={styles.rateView}>
          <Icon color="#1E90FF" name="auto-delete" size={20} />
          
            <Text style={styles.cartTitle2}> Remove Filter </Text>

        </View>
        </TouchableOpacity>
      ) : null}
      {data.length > 1 ? (
        <View style={styles.main}>
          <ProductsList data={data} numofColumn={1} />
        </View>
      ) : null}
      <ActivityIndicator
        style={styles.loading}
        animating={loading}
        size="large"
        color="#1E90FF"
      />
      {data.length > 1 ? null : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>NO PRODUCTS AVAILABLE</Text>
        </View>
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showmodal}
        onRequestClose={() => {
          setShowmodal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mainView}>
              <Icon
                color="#000"
                name="cancel"
                onPress={() => {
                  setShowmodal(false);
                }}
                size={28}
              />
              <Text style={styles.selectStyle}>Sort by {category}</Text>
            </View>
            {category == 'Price' ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyPrice(true);
                  }}>
                  <Text style={styles.content}>High to Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyPrice(false);
                  }}>
                  <Text style={styles.content}>Low to High</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {category == 'Rating' ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyRating(true);
                  }}>
                  <Text style={styles.content}>High to Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyRating(false);
                  }}>
                  <Text style={styles.content}>Low to High</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {category == 'Color' ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyColor('Yellow');
                  }}>
                  <Text style={styles.content}>Yellow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyColor('red');
                  }}>
                  <Text style={styles.content}>Red</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyColor('black');
                  }}>
                  <Text style={styles.content}>Black</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyColor('white');
                  }}>
                  <Text style={styles.content}>White</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyColor('blue');
                  }}>
                  <Text style={styles.content}>Blue</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {category == 'Category' ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('Table');
                  }}>
                  <Text style={styles.content}>Table</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('chair');
                  }}>
                  <Text style={styles.content}>Chair</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('bed');
                  }}>
                  <Text style={styles.content}>Bed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('dining');
                  }}>
                  <Text style={styles.content}>Dining Table</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('cupboard');
                  }}>
                  <Text style={styles.content}>Cupboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateProdsbyCat('sofa');
                  }}>
                  <Text style={styles.content}>Sofa</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
      <View style={styles.filterView}>
        <View style={styles.rateView3}>
          <Icon color="#1E90FF" name="filter-alt" size={20} />
          <TouchableOpacity
            onPress={() => {
              showModal('Category');
            }}>
            <Text style={styles.cartTitle2}> Category </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rateView3}>
          <Icon color="#1E90FF" name="opacity" size={20} />
          <TouchableOpacity
            onPress={() => {
              showModal('Color');
            }}>
            <Text style={styles.cartTitle2}> Color </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rateView3}>
          <Icon color="#1E90FF" name="local-offer" size={20} />
          <TouchableOpacity
            onPress={() => {
              showModal('Price');
            }}>
            <Text style={styles.cartTitle2}> Price </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rateView3}>
          <Icon color="#1E90FF" name="trending-up" size={20} />
          <TouchableOpacity
            onPress={() => {
              showModal('Rating');
            }}>
            <Text style={styles.cartTitle2}> Rating </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  selectStyle: {
    paddingLeft: 20,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 0.5,
    margin: 8,
  },
  rateView3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 4,
    marginRight: 8,
    borderRadius: 8,
    margin: 4,
    padding: 6,
  },
  rateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 4,
    marginRight: 8,
    borderRadius: 8,
    margin: 4,
    padding: 8,
  },
  
  title: {
    alignSelf: 'center',
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
    width: 250,
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
    alignSelf: 'center',
  },
  filterView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    paddingBottom: 5,
  },
  textView: {
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 14,
    padding: 8,
    backgroundColor: '#fff',
  },
});

export default ProductList;
