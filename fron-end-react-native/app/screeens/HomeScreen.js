import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import ProductCard from '../components/ProductCard';

// config
import colors from '../config/colors';
import config from "../config/config.json";

// services
import { getAllProducts } from "../services/ProductService";

const windowWidth = Dimensions.get('window').width;

function HomeScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [userRole, setUserRole] = useState(false);
    const [products, setProducts] = useState([]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setActivityIndic(true)

            const { data } = await getAllProducts();
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

    const getCurrentUser = async () => {
        try {
            let currentUser = await AsyncStorage.getItem('currentUser')
            currentUser = JSON.parse(currentUser)
            setUserRole(currentUser.role);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCurrentUser();
        getProducts();
    }, []);


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            props.navigation.navigate('loginScreen')
        } catch (error) {
            alert("Logout Error")
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                {
                    userRole === "seller" ?
                        <Appbar.Action onPress={() => props.navigation.navigate('sellerScreen')} color={colors.white} icon="account-circle" />
                        :
                        <Appbar.Action onPress={() => props.navigation.navigate('homeScreen')} color={colors.white} icon="home" />
                }
                <Appbar.Content color={colors.white} title="KEK EMLAK" />
                <Appbar.Action onPress={() => handleLogout()} color={colors.white} icon="import" />
            </Appbar.Header>
            <View style={styles.container}>

                {/* Top container */}
                <View style={{ width: windowWidth, backgroundColor: colors.primary, height: RFPercentage(23), justifyContent: 'flex-start', alignItems: "center" }} >
                    <View style={{ marginTop: RFPercentage(2), flexDirection: 'row', width: "90%", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "column", width: "60%", marginTop: RFPercentage(3.5) }} >
                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(4), color: colors.white }} >
                                Hi, Zahid
                            </Text>
                        </View>
                    </View>
                </View>

                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), borderTopRightRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), borderTopRightRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            {/* Products */}
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />}
                                style={{ marginTop: RFPercentage(8) }}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={products.length === 0 ? [{ blank: true }] : products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('productDetailsScreen', { item: item })} activeOpacity={0.9} style={{
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
                                    </TouchableOpacity>

                                }
                            />

                        </View>

                    </>
                }
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    loginButton: { marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }
})

export default HomeScreen;