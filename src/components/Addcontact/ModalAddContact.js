import { Platform } from "react-native";
import { Dialog, Portal, RadioButton } from 'react-native-paper';

const ModalAddContact = ({ listItem, title, name, value, visible, onPress, onPressVisable }) => {
    return (
        <Portal>
            <Dialog visible={visible[name]} onDismiss={() => onPressVisable(name)} style={{borderRadius: 10}}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group 
                        mode= {Platform.OS}
                        onValueChange={(values) => onPress(values, name)}
                        value={value}
                        >                            
                        {listItem.map((item, index) => {
                            return (
                                <RadioButton.Item key={index} color='#1890FF' label={item} value={item} />
                            )
                        })}
                    </RadioButton.Group>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default ModalAddContact;
