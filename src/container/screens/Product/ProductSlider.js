import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icons from 'react-native-vector-icons/MaterialIcons';

/**
 *
 * @returns Imageslider with product images
 * @author Hrishikesh Kedar
 * @description A functional component which returns Imageslider with product images also allows to zoom in
 * @param  data list of images
 *
 */

const ProductSlider = ({data}) => {
  const [visible, setVisible] = useState(false);
  var imgArray = [];
  for (var i = 0; i < data.length; i++) {
    imgArray.push({url: data[i]});
  }

  const onBack = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <SliderBox
        images={data}
        resizeMode="stretch"
        activeOpacity={0.8}
        sliderBoxHeight={400}
        onCurrentImagePressed={(index) => setVisible(true)}
        dotColor="#1E90FF"
        inactiveDotColor="#90A4AE"
        dotStyle={{
          width: 6,
          height: 6,
        }}
      />
      <Modal
        style={styles.modalView}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.bgColor}>
          <Icons
            style={styles.caancel}
            onPress={() => {
              onBack();
            }}
            color="white"
            name="cancel"
            size={36}
          />
        </View>

        <ImageViewer
          style={styles.modalView}
          enableImageZoom={true}
          imageUrls={imgArray}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  bgColor: {
    backgroundColor: '#000',
  },
  modalView: {
    flex: 1,
  },
  caancel: {
    paddingLeft: 10,
    paddingTop: 30,
  },
});
export default ProductSlider;
