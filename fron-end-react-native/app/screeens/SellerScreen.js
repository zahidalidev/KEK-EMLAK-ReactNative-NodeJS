import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "toastify-react-native";

// components
import AddProduct from "../components/AddProduct"
import ProductCard from '../components/ProductCard';

// config
import config from "../config/config.json";
import colors from '../config/colors';

// services
import { handeAddProduct, getProductsById } from '../services/ProductService';

function SellerScreen(props) {
    const [toastify, setToastify] = useState();
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeComponent, setActiveComponent] = useState('products');
    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState(false);

    const [products, setProducts] = useState([]);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Details",
            value: '',
        },
        {
            id: 2,
            placeHolder: "Location",
            value: '',
        },
        {
            id: 3,
            placeHolder: "Price",
            value: '',
        },
        {
            id: 4,
            placeHolder: "Area",
            value: '',
        },
    ]);

    const getCurrentUser = async () => {
        try {
            let currentUser = await AsyncStorage.getItem('currentUser')
            currentUser = JSON.parse(currentUser)
            return currentUser.id;
        } catch (error) {
            console.log(error)
        }
    }

    const getSellersProducts = async () => {
        const userId = await getCurrentUser();
        try {
            setActivityIndic(true)

            const { data } = await getProductsById(userId);
            let newData = data.map(item => {
                item.image = `${config.apiEndPoint}/${item.image}`
                return item;
            });
            setProducts(newData);
        } catch (error) {
            console.log("Error All ingredients: ", error)
        }
        setRefreshing(false)
        setActivityIndic(false);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        getSellersProducts();
    }, []);

    useEffect(() => {
        getSellersProducts()
    }, [])

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const uploadImages = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
            });

            setImage(pickerResult)
            setImageSelected(true)
        } catch (error) {

        }
    }

    const handleSubmit = async () => {
        setActivityIndic(true)
        try {
            let currentUser = await AsyncStorage.getItem('currentUser')
            currentUser = JSON.parse(currentUser)
            let userId = currentUser.id;

            const data = {
                name: feilds[0].value,
                details: feilds[1].value,
                location: feilds[2].value,
                price: feilds[3].value,
                area: feilds[4].value,
                userId
            }

            await handeAddProduct(image, data)
            setActivityIndic(false)
            toastify.success("Product Added")

        } catch (error) {
            console.log(error)
            toastify.error("Product Not Added")
        }

        setActivityIndic(false)
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} icon="" onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title="For Seller" />
            </Appbar.Header>

            {/* toast component */}
            <Toast ref={(c) => setToastify(c)} />

            <View style={[styles.container, { backgroundColor: activeComponent === 'products' ? colors.white : colors.lightGrey }]}>
                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', backgroundColor: activeComponent === 'products' ? colors.white : colors.lightGrey, marginTop: RFPercentage(2), width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            {/* buttons */}
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), backgroundColor: colors.primary }} >
                                <View style={{ width: "90%", flexDirection: "row" }} >
                                    <TouchableOpacity onPress={() => setActiveComponent('products')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "50%", padding: RFPercentage(2), backgroundColor: activeComponent === 'products' ? colors.secondary : null }} >
                                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >My Products</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('addProducts')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "50%", padding: RFPercentage(2), backgroundColor: activeComponent === 'addProducts' ? colors.secondary : null }} >
                                        <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Add Product</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                activeComponent === 'products' ?
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}
                                        style={{ marginTop: RFPercentage(3.5) }}
                                        showsVerticalScrollIndicator={false}
                                        numColumns={2}
                                        data={products.length === 0 ? [{ blank: true }] : products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) =>
                                            <TouchableOpacity onPress={() => handlePress(item)} onLongPress={() => handleLongPress(item)} activeOpacity={0.7} style={{
                                                margin: RFPercentage(1),
                                                marginRight: RFPercentage(2),
                                                marginBottom: 0,
                                                backgroundColor: "white",
                                                maxHeight: item.blank ? 0 : null,
                                                width: RFPercentage(21), height: RFPercentage(21),
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }} >
                                                {item.blank ? null :
                                                    <ProductCard index={index} price={item.price} title={item.name} description={item.details} image={item.image} />

                                                }
                                            </ TouchableOpacity>

                                        }
                                    /> :

                                    <AddProduct feilds={feilds} imageSelected={imageSelected} uploadImages={uploadImages} handleChange={handleChange} handleSubmit={handleSubmit} />
                            }

                        </View>
                    </>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default SellerScreen;