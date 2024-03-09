import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dialog: {
        width: '60%',
        zIndex: 4, 
        position: "absolute", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: 'red', 
        top: '40%',
        height: '25%'
    },
    loadingContainer :{
        alignItems:'center',
        justifyContent: 'center',
        
    },
    loading: {
        height: 50,
        width: '60%',
        alignItems: 'center',
        
        
    },
    title: {
        textAlign:'center'
    }
})

export default styles;
