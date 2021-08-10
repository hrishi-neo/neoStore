import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { create } from '../../utilities/normalize';

const ProdNameList = ({ data }) => {
    return (
        <View style={styles.borderView}>
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {


                    return (
                        <View style={styles.container}>
                            <View style={styles.cardView}>
                                <Text style={styles.title}>{item.productId.name}</Text>
                                <Text style={styles.pricee}>₹ {item.totalAmount}</Text>
                            </View>
                        </View>
                    )
                }} />
        </View>
    )
}
const styles = create({
    borderView: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5
    },
    container: {
        padding: 4,
    },
    cardView: {
        padding: 6,
        flexDirection: 'row'
    },
    title: {
        fontSize: 13,
        flex: 0.7,
        paddingLeft:4
    },
    pricee: {
        fontSize: 13,
        textAlign: 'right',
        flex: 0.2
    },

})
export default ProdNameList
