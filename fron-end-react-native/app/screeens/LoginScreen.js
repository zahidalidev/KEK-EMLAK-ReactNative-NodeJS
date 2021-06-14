import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "toastify-react-native";

import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import AppTextButton from '../components/AppTextButton';

import logo from "../assets/logo.png"
// import { loginUser } from '../services/userService';
import { useEffect } from 'react';
import AccountText from '../components/common/AccountText';

function LoginScreen(props) {
    const [indicator, setIndicator] = useState(false);
    const [toastify, setToastify] = useState();
    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Email",
            value: '',
            secure: false
        },
        {
            id: 1,
            placeHolder: "Password",
            value: '',
            secure: true
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        // const email = feilds[0].value;
        // const password = feilds[1].value;
        // try {
        //     setIndicator(true)
        //     const { data } = await loginUser(email, password);
        //     await AsyncStorage.setItem('token', data.id.toString());
        //     setIndicator(false)
        props.navigation.navigate('homeScreen')
        // } catch (error) {
        //     console.log("login error: ", error);
        //     setIndicator(false)
        //     toastify.error("Login Error");
        // }
    }

    // get token from AsyncStorage to confirm login or logout
    let validateWithToken = async () => {
        // await AsyncStorage.removeItem('token');
        // try {
        //     let res = await AsyncStorage.getItem('token');
        //     if (res) {
        //         props.navigation.navigate('home')
        //         return;
        //     }
        //     props.navigation.navigate('login');
        // } catch (error) {
        // }
    }

    useEffect(() => {
        // validateWithToken();
    }, [props.route.params]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={colors.primary} />

            {/* toast component */}
            <Toast ref={(c) => setToastify(c)} />

            {/* Kitchen buddy top container */}
            <View style={{ backgroundColor: colors.primary, width: "100%", flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Image source={logo} style={{ height: RFPercentage(20), width: RFPercentage(20), marginBottom: RFPercentage(5) }} />

                </View>
            </View>

            {indicator
                ? <View style={{ marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                </View>
                : <>
                    {/* Bottom Contaienr */}
                    <View style={{ marginTop: -RFPercentage(7), borderTopRightRadius: RFPercentage(8), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

                        <View style={{ marginTop: RFPercentage(6.5), width: "85%", alignItems: "center" }} >
                            <Text style={{ color: colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.5) : RFPercentage(5.5) }} >Login</Text>
                        </View>

                        {/* Text feilds */}
                        {feilds.map((item, i) =>
                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(10) : RFPercentage(4), width: "85%" }} >
                                <AppTextInput
                                    placeHolder={item.placeHolder}
                                    width="100%"
                                    value={item.value}
                                    onChange={(text) => handleChange(text, item.id)}
                                    secure={item.secure}
                                />
                            </View>
                        )}

                        {/* Login button */}
                        <View style={styles.loginButton} >
                            <AppTextButton
                                name="LOGIN"
                                borderRadius={RFPercentage(1.3)}
                                onSubmit={() => handleSubmit()}
                                backgroundColor={colors.primary}
                                width="100%"
                                height={RFPercentage(5.5)}
                            />
                        </View>

                    </View>

                    {/* Login text */}
                    <AccountText navigate={props.navigation.navigate} description="Dont't have an account? " buttnText="Sign Up" location="registerScreen" />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    loginButton: { marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }
})

export default LoginScreen;