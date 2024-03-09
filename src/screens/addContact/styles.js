import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imgContact: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
        marginTop: 10
    },
    image:{
        width: '100%',
        height: '100%',
        aspectRatio: 1.63185185185,
        resizeMode: 'contain',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#2D9CDB',
    },
    formInput: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        width: "100%",

    },
    formInput_component: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginTop: 15,
        padding: 10,
    },
    formInput_item: {
        alignItems: 'center',
        width: '100%',
    },
    formInput_item_component: {
        flexDirection: 'row',
    },
    shimmer_formInput: {
        with: "100%", 
        height: 56, 
        borderRadius: 10
    },
    formInput_item_input: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 0
    },
    formInput_item_error: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    formInput_item_error_label:{
        color: '#B22D1D',
        fontSize: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
    },
    footer_button_label: {
        fontSize: 16,
    }
})

export default styles