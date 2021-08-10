import React, { useEffect } from 'react'
import { View, Text, PermissionsAndroid, Platform, ScrollView, TouchableOpacity } from 'react-native'
import PlaceOrderList from './PlaceOrderList'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNFetchBlob from 'rn-fetch-blob'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useSelector } from 'react-redux'
import { create } from '../../utilities/normalize';

/**
 * 
 * @returns Order Details 
 * @author Hrishikesh Kedar
 * @description A functional component which returns orders details and option to download invoice
 * @param  route 
 */

const OS = Platform.OS

const OrderDetail = ({ route }) => {

    const { item } = route.params
    const user = useSelector((state) => state.user)
    console.log(item.items)
    var total = 0
    for (var i = 0; i < item.items.length; i++) {
        total += item.items[i].productId.price
    }
    var test = ''
    const html = '<head>' +
        '<meta charset="utf-8" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
        '<title>A simple, clean, and responsive HTML invoice template</title>' +
        '<link rel="icon" href="./images/favicon.png" type="image/x-icon" />' +
        '<style>body {font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif;text-align: center;color: #777;}' +
        ' body h1 {font-weight: 300;margin-bottom: 0px;padding-bottom: 0px;color: #000;}' +
        'body h3 {font-weight: 300;margin-top: 10px;margin-bottom: 20px;font-style: italic;color: #555;}' +
        '  body a { color: #06f;}' +
        '.invoice-box {max-width: 800px; margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);font-size: 16px;line-height: 24px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif;color: #555;}' +
        ' .invoice-box table { width: 100%;line-height: inherit;  text-align: left; border-collapse: collapse; }' +
        '.invoice-box table td {padding: 5px; vertical-align: top;}' +
        ' .invoice-box table tr td:nth-child(2) {text-align: right;}' +
        ' .invoice-box table tr.top table td {} padding-bottom: 20px; }' +
        '.invoice-box table tr.top table td.title { font-size: 45px;line-height: 45px;color: #333;}' +
        '.invoice-box table tr.information table td {padding-bottom: 40px;}' +
        '.invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd;font-weight: bold; }' +
        ' .invoice-box table tr.details td {padding-bottom: 20px; }' +
        ' .invoice-box table tr.item td { border-bottom: 1px solid #eee;}' +
        '.invoice-box table tr.item.last td {border-bottom: none;}' +
        '.invoice-box table tr.total td:nth-child(2) {border-top: 2px solid #eee;font-weight: bold;}' +
        ' @media only screen and (max-width: 600px) {.invoice-box table tr.top table td {width: 100%;display: block;text-align: center;}' +
        ' .invoice-box table tr.information table td {width: 100%;display: block;text-align: center;}}</style></head>' +
        '<body>' +
        '<div class="invoice-box">' +
        '<table>' +
        '<tr class="top">' +
        ' <td colspan="2">' +
        ' <table>' +
        ' <tr><td class="title"><h1>NeoSTORE</h1></td>' +
        `<td>Invoice #: 123<br />Created at ${new Date()}</td></tr></table></td></tr>` +
        ` <tr class="information"><td colspan="2"><table><tr><td>${user.firstName} ${user.lastName}<br />${user.address[0].addressLine}<br />${user.address[0].city}, ${user.address[0].state} </td></tr>` +
        ' <tr class="heading"><td>Item</td><td>Price</td></tr>'

    for (var i = 0; i < item.items.length; i++) {

        test += `<tr class="item"> <td>${item.items[i].productId.name} (${item.items[i].quantity})</td> <td>${item.items[i].productId.price}</td></tr> }`

    }

    var totalAmt = `<tr class="total"><td></td><td>Total: Rs. ${total}</td></tr></table></div></body>`
    const downloadBill = async () => {

        try {
            const dir= OS == 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir
            let options = {
                html: html + test + totalAmt,
                fileName: 'test',
                directory: dir,
            };
            let file = await RNHTMLtoPDF.convert(options)
            // console.log(file.filePath);
            pdfPath = file.filePath

            if (OS == 'android') {
                const android = RNFetchBlob.android;
                android.actionViewIntent(pdfPath, 'application/pdf')
            } else {
                RNFetchBlob.ios.openDocument(pdfPath);
            }


        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        if (OS == 'android') {
            requestReadPermission()
        }
    }, [])
    const requestReadPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                { 'title': 'hi', 'message': 'hi', buttonNeutral: 'ok', buttonNegative: 'no', buttonPositive: 'yes', })
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            }
            else {
            }
        } catch (err) { Toast.message(err.toString()); }
    }
    return (
        <View style={styles.main}>
            <ScrollView>
                <Text style={styles.title}>Order ID: {item._id}</Text>
                <Text style={styles.subtitle}>Product Details</Text>
                <PlaceOrderList data={item.items} />
            </ScrollView>
            <View style={styles.invoice}>
                <Icon
                    name='receipt'
                    color='#fff'
                    size={24}

                />
                <TouchableOpacity onPress={() => { downloadBill() }}>
                    <Text style={styles.invoiceText}>Download Invoice</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = create({
    main: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 8,
    },
    subtitle: {
        fontSize: 14,
        padding: 8,
    },
    invoice: {
        height: 50,
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    invoiceText: {
        color: '#fff',
        alignSelf: 'center',
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default OrderDetail
