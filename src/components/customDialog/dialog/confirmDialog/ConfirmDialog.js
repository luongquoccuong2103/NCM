//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from '../confirmDialog/styles';
import { useTranslation } from "react-i18next";
// create a component
const ConfirmDialog = ({ visible, onPressVisable, onPressConfirm, title, rightButtonTitle, leftButtonTitle }) => {
    const { t } = useTranslation();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPressVisable}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback>
                    <Card elevation={3} style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{t("ConfirmDialog_Title")}</Text>
                        <Text style={{ fontSize: 16, margin: 10 }}>{title}</Text>
                        <View style={{ width: '100%' }}>
                            <View style={styles.info_status_modalItem_button}>
                                <Button
                                    mode='contained'
                                    color="#F3F3F3"
                                    style={{ borderRadius: 10, width: '40%' }}
                                    onPress={onPressVisable}
                                    uppercase={false}
                                >
                                    {leftButtonTitle}
                                </Button>
                                <Button
                                    mode='contained'
                                    color="#1890FF"
                                    style={{ borderRadius: 10, width: '40%' }}
                                    onPress={onPressConfirm}
                                    uppercase={false}
                                >
                                    {rightButtonTitle}
                                </Button>
                            </View>
                        </View>
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default ConfirmDialog;
