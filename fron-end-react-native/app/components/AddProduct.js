import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppTextInput from './AppTextInput';
import AppTextButton from './AppTextButton';

// config
import colors from '../config/colors';

function AddProduct({ feilds, handleChange, handleSubmit, uploadImages, imageSelected }) {


    return (
        <View style={{ marginTop: RFPercentage(2), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
            {/* Text feilds */}
            {feilds.map((item, i) =>
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(4) : RFPercentage(4), width: "85%" }} >
                    <AppTextInput
                        placeHolder={item.placeHolder}
                        width="100%"
                        value={item.value}
                        onChange={(text) => handleChange(text, item.id)}
                        secure={item.secure}
                    />
                </View>
            )}

            {/* SignUp button */}
            <TouchableOpacity onPress={() => uploadImages()} style={{ marginTop: RFPercentage(4), width: "85%", }} >
                {imageSelected ?
                    <Text style={{ marginBottom: RFPercentage(1), color: colors.grey, fontSize: RFPercentage(1.8) }} >* Image is Selected</Text>
                    : <Text style={{ marginBottom: RFPercentage(1), color: colors.danger, fontSize: RFPercentage(1.8) }} >* Image is Not Selected</Text>
                }
                <View style={{ borderRadius: RFPercentage(1.3), backgroundColor: "rgba(76, 152, 207, 0.6)", width: "100%", height: RFPercentage(6), justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Upload Image</Text>
                </View>
            </TouchableOpacity>

            <View style={{ marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }} >
                <AppTextButton
                    name="Add Product"
                    borderRadius={RFPercentage(1.3)}
                    onSubmit={() => handleSubmit()}
                    backgroundColor={colors.primary}
                    width="100%"
                    height={RFPercentage(5.5)}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})

export default AddProduct;