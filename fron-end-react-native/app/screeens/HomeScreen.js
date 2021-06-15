import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import ProductCard from '../components/ProductCard';

// config
import colors from '../config/colors';
// import { getAllIngredients } from "../services/ingredientsService";
// import GetSqlDate from '../components/commmon/GetSqlDate';

const windowWidth = Dimensions.get('window').width;

function HomeScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldIngredients, setOldIngredients] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [products, setProducts] = useState([
        {
            id: 0,
            name: "Green Houese",
            price: "$239012",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        },
        {
            id: 1,
            name: "Corner Cottage.",
            price: "$209899",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
        },
        {
            id: 2,
            name: "Orchard Cottage",
            price: "$234230",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
            id: 3,
            name: "Mill House",
            price: "$212935",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
        },
        {
            id: 4,
            name: "Ivy Cottage",
            price: "$219344",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqI0K4oWhQDXJ6qFGP-hlEg_j9nYFNrO7VK_BrXjxi2IEK9asUk-gpI0wHAEY55yq03D0&usqp=CAU",
        },
        {
            id: 5,
            name: "Corner Cottage.",
            price: "$209899",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://i.ytimg.com/vi/axzlYeeWKWU/maxresdefault.jpg",
        },
        {
            id: 6,
            name: "Orchard Cottage",
            price: "$310290",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://i.pinimg.com/originals/5c/a7/8e/5ca78e7e2390177b49da3777311c1b6e.jpg",
        },
        {
            id: 7,
            name: "Mill House",
            price: "$210295",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        },
        {
            id: 8,
            name: "Ivy Cottage",
            price: "$212304",
            location: "this is a address",
            area: "This area",
            addedBy: "Zahid",
            details: "This is description of the House",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        },
    ]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        // getIngredients();
    }, []);

    const handleSearch = () => {
        // let temp = [...oldIngredients];
        // let newIngredients = temp.map((ingredient) => {
        //     if (ingredient.name.includes(searchValue)) {
        //         return ingredient;
        //     }
        // })
        // setIngredients(newIngredients);
    }

    const getIngredients = async () => {
        // try {
        //     setActivityIndic(true)
        //     let data = await AsyncStorage.getItem('currentUser');
        //     data = JSON.parse(data);

        //     const { data } = await getAllIngredients(userId);
        //     const allIngredients = data.map(item => {
        //         item.expirationDate = GetSqlDate(new Date(item.expirationDate));
        //         return item;
        //     })
        //     setIngredients(allIngredients);
        //     setOldIngredients(allIngredients);
        // } catch (error) {
        //     console.log("Error All ingredients: ", error)
        // }
        // setRefreshing(false)
        // setActivityIndic(false);
    }

    useEffect(() => {
        getIngredients();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            props.navigation.navigate('login')
        } catch (error) {
            alert("Logout Error")
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                {/* <Appbar.Action onPress={() => { }} color={colors.white} icon="home" /> */}
                <Appbar.Action onPress={() => props.navigation.navigate('sellerScreen')} color={colors.white} icon="account-circle" />
                <Appbar.Content color={colors.white} title="KEK EMLAK" />
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