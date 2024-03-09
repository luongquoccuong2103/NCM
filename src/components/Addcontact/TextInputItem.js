//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, UIManager } from 'react-native';
import styles from '../../screen/AddContact/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, RadioButton, Card } from "react-native-paper";
import { t } from "i18next";
// create a component
const TextInputItem = ({ item, handleChange, handleBlur, errors, touched, values, listItem = [], onPressRadio }) => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState();

    useEffect(() => {
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [])

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    const handleChangeValue = (value) => {
        setValue(value);
        onPressRadio(value, item.name);
        setExpanded(false);
    }

    return (
        <View style={styles.formInput_item}>
            <View style={styles.formInput_item_component}>
                <Icon size={20} name={item.icon} color="#1890FF" />
                <View style={{ width: '90%', marginLeft: 10 }}>
                    <Text style={{ fontWeight: '600', color: '#1890FF' }}>{item.title}</Text>
                    <TextInput
                        placeholder={item.placeholder}
                        value={values[item.name]}
                        multiline={item.multiline}
                        keyboardType={item.keyboardType}
                        dense={true}
                        style={styles.formInput_item_input}
                        onChangeText={handleChange(item.name)}
                        onBlur={handleBlur(item.name)}
                        error={errors[item.name] && touched[item.name]}
                        theme={{
                            colors: {
                                primary: '#1890FF',
                                error: '#B22D1D',
                            },
                        }}
                        right={
                            <TextInput.Icon
                                name={expanded ? "chevron-up" : "chevron-down"}
                                onPress={toggleExpand}
                                forceTextInputFocus={false}
                            />
                        }
                    />
                    {errors[item.name] && touched[item.name] ? (
                        <View style={styles.formInput_item_error}>
                            <Text style={styles.formInput_item_error_label}>
                                {t(errors[item.name])}
                            </Text>
                        </View>
                    ) : null}
                    {
                        expanded &&
                        <Card mode='outlined' style={{ width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <RadioButton.Group onValueChange={handleChangeValue} value={value}>
                                {listItem && listItem.map((item, index) => {
                                    return (
                                        <RadioButton.Item label={item} value={item} key={index} color="#1890FF" />
                                    )
                                })}
                            </RadioButton.Group>
                        </Card>
                    }
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default TextInputItem;
