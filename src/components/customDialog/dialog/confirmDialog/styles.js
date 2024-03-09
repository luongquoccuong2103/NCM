import {StyleSheet, Dimensions } from 'react-native';


// define your styles
const styles = StyleSheet.create({
    mb10: {
        marginBottom: 10,
    },
    ml10: {
        marginLeft: 10,
    },
    btl20 :{
        borderTopLeftRadius: 20,
    },
    btr20 :{
        borderTopRightRadius: 20,
    },
    bbl20 :{
        borderBottomLeftRadius: 20,
    },
    bbr20 :{
        borderBottomRightRadius: 20,
    },
    containerOverlay: {
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    info_flag_modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '70%',
        alignItems: 'flex-start',
        padding: 7
    },
    info_flag_modalItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info_flag_modalIcon: {
                width: 32,
                margin: 10
            },
            info_flag_modalText: {
                fontSize: 15,
            },
    info_status_modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '90%',
        padding: 10,
    },
    info_status_modalItem_button: {
        flexDirection:'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    body_imgContact: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
    },
    body_imgContact_image:{
        width: '100%',
        height: '100%',
        aspectRatio: 1.63185185185,
        resizeMode: 'contain',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#2D9CDB',
    },
    info: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    info_title: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
    },
    info_title_name: {
        fontSize: 25,
        marginBottom: 10,
    },
    info_title_job: {
        fontSize: 16,
        textAlign: 'center',
    },
    info_title_job_name: {
        fontSize: 12,
        color: '#828282',
    },
    info_flag_button: {
        borderRadius: 10,
        marginTop: 10
    },
    info_component: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginTop: 15,
    },
    info_component_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info_component_button: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    info_contact_des: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 5,
    },
    info_contact_border: {
        borderBottomColor: '#82828250',
        borderBottomWidth: 1,
    },
    info_contact_des_item: {
        width: '90%',
    },
    info_component_des_title: {
        fontSize: 12,
        color: '#828282',
    },
    info_contact_des_label: {
        fontSize: 16,
    },
    info_component_title: {
        fontSize: 18,
        color: '#828282',
        fontWeight: '500',
    },
    info_component_des: {
        fontSize: 16,
    },
    info_componetn_content: {
        flexDirection: 'row',
    },
    info_component_label: {
        fontSize: 16,
        color: '#828282',
    },
    modelViewFloat: {
        backgroundColor: '#ffff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
    },
    footer_button: {
        alignItems: 'center',
    },
    footer_button_label: {
        fontSize: 12,
    }
});

export default styles;