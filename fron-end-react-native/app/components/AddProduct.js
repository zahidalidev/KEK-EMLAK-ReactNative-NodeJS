import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppTextInput from './AppTextInput';
import AppTextButton from './AppTextButton';

// config
import colors from '../config/colors';

function AddProduct({ feilds, handleChange, handleSubmit }) {


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