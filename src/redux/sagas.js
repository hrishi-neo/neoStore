import { call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {GET_PRODUCT, RESET_PASSWORD, UPDATE_ADDRESS, GET_ORDER, GET_DATA, GET_ADDRESS, ADD_ADDRESS, LOGIN, REGISTER, FORGOT_PASSWORD, DEL_ADDRESS, ADD_TO_CART, GET_CART, REMOVE_FROM_CART, UPDATE_CART, PLACE_ORDER } from "./actionTypes";
import { saveData,saveProd, registerStatus, saveOrder, getUser, getAddress, saveCart, getCart, saveAddress } from './action';


function* fetchData() {
    try {
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/product?limit=5&sortby=rating&orderby=desc'
            return await axios.get(url)
        })
        const data = response.data.data.docs
        yield put(saveData(data))

    } catch (error) {
        alert(error)
        console.log(error)
    }
}

function* fetchProd() {
    try {
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/product?limit=16&page=1'
            return await axios.get(url)
        })
        const prod = response.data.data.docs
        yield put(saveProd(prod))

    } catch (error) {
        alert(error)
        console.log(error)
    }
}

function* registerUser(user) {

    try {
        console.log(user.payload)
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/auth/register'
            return await axios.post(url, user.payload)

        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            yield put(registerStatus())
        } else {
            alert(response.data.message)
        }

    } catch (error) {
       alert('Account already exists! try logging in')

    }
}

function* loginUser(user) {
    try {

        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/auth/login'
            return await axios.post(url, user.payload)

        })

        const success = response.data.success
        if (success === true) {


            yield put(getUser(response.data.data))
        } else {
            alert(response.data.message)
        }

    } catch (error) {
        alert("Please check your email and password")

    }
}

function* forgotPass(email) {
    try {
        console.log(email.payload)
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/auth/forgot-password'
            return await axios.post(url, { "email": email.payload })

        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            alert(response.data.message)

        } else {
            alert(response.data.message)
        }

    } catch (error) {


    }
}

function* addCart(cart) {

    try {

        const { productId, quantity, token } = cart.payload
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/cart'
            return await axios.post(url, { productId, quantity }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            alert("Product successfully added to cart")
            yield put(getCart({ token: token }))
        } else {
            alert("Something went wrong! Please try again!")
        }

    } catch (error) {
        alert("Product already in the cart")

    }
}

function* getIt(tok) {
    try {
        const { token } = tok.payload

        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/cart'
            return await axios.get(url, {
                headers: {
                    'Authorization': token
                }
            })
        })


        const success = response.data.success
        console.log('test')
        if (success === true) {
            const cart = response.data.data.products
            yield put(saveCart(cart))

        } else {

        }



    } catch (error) {
        console.log(error)

    }
}

function* deleteIt(prod) {
    try {
        const { token, productId } = prod.payload
        const response = yield call(async () => {
            const url = `https://neostore-api.herokuapp.com/api/cart/${productId}`
            return await axios.delete(url, {
                headers: {
                    'Authorization': token
                }
            })
        })


        const success = response.data.success
        if (success === true) {
            yield put(getCart({ token: token }))

        } else {

        }



    } catch (error) {
        console.log(error)

    }
}

function* updateIt(prod) {
    const { token, productId, quantity } = prod.payload

    console.log(prod.payload)

    try {

        const response = yield call(async () => {
            const url = `https://neostore-api.herokuapp.com/api/cart/${productId}`
            return await axios.put(url, { quantity: quantity }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)


        const success = response.data.success
        if (success === true) {
            yield put(getCart({ token: token }))

        } else {

        }

    } catch (error) {
        console.log(error)

    }
}

function* addIt(address) {

    try {
        const { token,
            addressLine,
            pincode,
            city,
            state,
            country } = address.payload
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/user/address'
            return await axios.post(url, {
                addressLine: addressLine,
                pincode: pincode,
                city: city,
                state: state,
                country: country
            }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            yield put(getAddress({ token: token }))
        } else {
            alert(response.data.message)
        }

    } catch (error) {
        console.log(error)

    }
}

function* getADD(tok) {
    try {
        const { token } = tok.payload

        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/user/address'
            return await axios.get(url, {
                headers: {
                    'Authorization': token
                }
            })
        })


        const success = response.data.success

        if (success === true) {
            const add = response.data.data.address
            yield put(saveAddress(add))

        } else {

        }



    } catch (error) {
        console.log(error)

    }
}

function* delADD(tok) {
    try {
        const { token, productId } = tok.payload
        const response = yield call(async () => {
            const url = `https://neostore-api.herokuapp.com/api/user/address/${productId}`
            return await axios.delete(url, {
                headers: {
                    'Authorization': token
                }
            })
        })


        const success = response.data.success
        if (success === true) {
            yield put(getAddress({ token: token }))

        } else {

        }



    } catch (error) {
        console.log(error)

    }
}

function* updateADD(address) {
    try {
        const { token,
            addressLine,
            pincode,
            city,
            state,
            country,
            productId
        } = address.payload

        const response = yield call(async () => {
            const url = `https://neostore-api.herokuapp.com/api/user/address/${productId}`
            return await axios.put(url, {
                addressLine: addressLine,
                pincode: pincode,
                city: city,
                state: state,
                country: country
            }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            yield put(getAddress({ token: token }))
        } else {
            alert(response.data.message)
        }

    } catch (error) {
        console.log(error)

    }
}

function* placeOrd(address) {

    try {
        const { token,
            addressId,
        } = address.payload
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/order/place'
            return await axios.post(url, {
                addressId: addressId,

            }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {

            yield put(getCart({ token: token }))
        } else {
            alert(response.data.message)
        }

    } catch (error) {
        console.log(error)

    }
}

function* getORD(tok) {
    try {
        const { token } = tok.payload

        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/order'
            return await axios.get(url, {
                headers: {
                    'Authorization': token
                }
            })
        })


        const success = response.data.success
        // console.log(response.data.data.orders)
        if (success === true) {
            const ord = response.data.data.orders
            yield put(saveOrder(ord))

        } else {

        }



    } catch (error) {
        console.log(error)

    }
}

function* resetPass(tok) {

    try {
        const { token,
            password,
            newPassword
        } = tok.payload
        const response = yield call(async () => {
            const url = 'https://neostore-api.herokuapp.com/api/user/change-password'
            return await axios.post(url, {
                password: password,
                newPassword: newPassword
            }, {
                headers: {
                    'Authorization': token
                }
            })
        })
        console.log(response.data)
        const success = response.data.success
        if (success === true) {
            alert(' Password changed successfully!')
            
        } else {
            alert(response.data.message)
        }

    } catch (error) {
       alert('Current Password doesnt exist!')

    }
}


function* sagas() {
    yield takeLatest(GET_DATA, fetchData)
    yield takeLatest(GET_PRODUCT, fetchProd)
    yield takeLatest(REGISTER, registerUser)
    yield takeLatest(LOGIN, loginUser)
    yield takeLatest(FORGOT_PASSWORD, forgotPass)
    yield takeLatest(ADD_TO_CART, addCart)
    yield takeLatest(GET_CART, getIt)
    yield takeLatest(REMOVE_FROM_CART, deleteIt)
    yield takeLatest(UPDATE_CART, updateIt)
    yield takeLatest(ADD_ADDRESS, addIt)
    yield takeLatest(GET_ADDRESS, getADD)
    yield takeLatest(DEL_ADDRESS, delADD)
    yield takeLatest(UPDATE_ADDRESS, updateADD)
    yield takeLatest(PLACE_ORDER, placeOrd)
    yield takeLatest(GET_ORDER, getORD)
    yield takeLatest(RESET_PASSWORD, resetPass)
}

export default sagas;