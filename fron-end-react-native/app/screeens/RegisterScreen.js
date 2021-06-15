import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Toast from 'toastify-react-native';
import ReactNativeCrossPicker from "react-native-cross-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"; // for expo and any other for react-native-cli

// components
import AppTextInput from '../components/AppTextInput';
import AppTextButton from '../components/AppTextButton';
import AccountText from '../components/common/AccountText';

// config
import colors from '../config/colors';

//services
import { registerUser } from '../services/userService';

function RegisterScreen(props) {
    const [toastify, setToastify] = useState();
    const [indicator, setIndicator] = useState(false);
    const [role, setRole] = useState('user')

    const roles = [
        { label: "User", value: 'user' },
        { label: "Seller", value: 'seller' }
    ]

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "First name",
            value: '',
            secure: false
        },
        {
            id: 1,
            placeHolder: "Last name",
            value: '',
            secure: false
        },
        {
            id: 2,
            placeHolder: "email",
            value: '',
            secure: false
        },
        {
            id: 3,
            placeHolder: "Password",
            value: '',
            secure: true
        },
        {
            id: 4,
            placeHolder: "Confirm password",
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
        const body = {
            name: `${feilds[0].value} ${feilds[1].value}`,
            email: feilds[2].value,
            password: feilds[3].value,
            role
        }

        // if password and confirm password does not match
        if (body.password !== feilds[4].value) {
            toastify.error("Password and Confirm password are not same");
            return;
        }

        // if feilds are empty show alert
        if (body.name === '' || body.email === '' || body.password === '') {
            toastify.error("Please fill all the feilds");
            return;
        }

        setIndicator(true);

        try {
            await registerUser(body);
            toastify.success("Registration Successful");
            setIndicator(false)
            setTimeout(() => {
                props.navigation.navigate('loginScreen')
            }, 2000)
        } catch (error) {
            toastify.error("Registration Failed");
        }
        setIndicator(false);
    }

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={colors.primary} />

            <Toast key={89} ref={(t) => setToastify(t)} />
            {/* Top container */}
            <View style={{ backgroundColor: colors.primary, flex: 0.6, width: "100%", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ marginBottom: RFPercentage(5), color: colors.white, fontSize: Platform.OS === "ios" ? RFPercentage(4) : RFPercentage(6.5) }} >Sign Up</Text>
            </View>

            {indicator
                ? <View style={{ marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                </View>
                : <>
                    {/* Bottom Contaienr */}
                    <View style={{ marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                        <ScrollView style={{ width: "100%", flex: 1.8, flexDirection: 'column' }} >
                            {/* Text feilds */}
                            {feilds.map((item, i) =>
                                <>
                                    <View key={i} style={{ marginLeft: "7.5%", marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                        <AppTextInput
                                            placeHolder={item.placeHolder}
                                            width="100%"
                                            value={item.value}
                                            onChange={(text) => handleChange(text, item.id)}
                                            secure={item.secure}
                                        />
                                    </View>
                                    {item.id === 2 ?
                                        <View key={i * 4} style={{ marginLeft: "7.5%", marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                            <ReactNativeCrossPicker
                                                modalTextStyle={{ color: colors.primary }}
                                                mainComponentStyle={{ height: RFPercentage(6.2), backgroundColor: colors.white, borderColor: "rgba(0, 74, 173, 0)" }}
                                                iconComponent={iconComponent}
                                                width="100%"
                                                items={roles}
                                                setItem={setRole} selectedItem={role}
                                                placeholder="Select Role"
                                                modalMarginTop={"80%"} // popup model margin from the top 
                                            />
                                        </View>
                                        : null
                                    }
                                </>
                            )}

                            {/* SignUp button */}
                            <View style={{ marginBottom: RFPercentage(5), marginLeft: "7.5%", marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                <AppTextButton
                                    name="Sign Up"
                                    borderRadius={RFPercentage(1.3)}
                                    onSubmit={() => handleSubmit()}
                                    backgroundColor={colors.primary}
                                    width="100%"
                                    height={RFPercentage(5.5)}
                                />
                            </View>
                        </ScrollView>
                    </View>


                    {/* Signup text */}
                    <AccountText navigate={props.navigation.navigate} description="Already have an account? " buttnText="Sign In" location="loginScreen" />
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
})

export default RegisterScreen;