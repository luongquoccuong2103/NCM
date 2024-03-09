import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { useTranslation } from "react-i18next";

const AuthContext = React.createContext({
    locale: 'vn',
    isLogin: false,
    role: 0,
    userId: 0,
    onLogin: () => {},
    onLogout: () => {},
    checkToken: () => {},
    language: () => {},
    handleToken: () => {},
});

export const AuthProvider = ({ children }) => {
    const { t, i18n } = useTranslation()
    const [isLogin, setIsLogin] = useState(false);
    const [locale, setLocale] = useState('vn')
    const [role, setrole] = useState(0)
    const [userId, setUserId] = useState(0)

    const getToken = async () => {
        const refresh_token = await SecureStore.getItemAsync('refresh_token');
        const access_token = await SecureStore.getItemAsync('access_token');       
        if(refresh_token && access_token){
            const decoded = jwt_decode(access_token);
            if(decoded.role !== 4) {
                setIsLogin(true);
                setrole(decoded.role);
                setUserId(decoded.userId);
            }
        }
        if(!refresh_token || !access_token){
            setIsLogin(false);
            setrole(0);
            setUserId(0);
        }
    }

    const checkLocale = async () => {
        const localeDefault = await SecureStore.getItemAsync('locale');
        if(localeDefault){
            i18n.changeLanguage(localeDefault);
            setLocale(localeDefault)
        }
    }

    useEffect(() => {
        checkLocale();
    } ,[])

    const handleLogin = async(accessToken, refreshToken) => {
        let decoded = jwt_decode(accessToken);
        if(decoded.role !== 4){
            await SecureStore.setItemAsync('access_token',accessToken)
            await SecureStore.setItemAsync('refresh_token',refreshToken)
            setrole(decoded.role)
            setUserId(decoded.uid)
            setIsLogin(true);
        }       
    }

    const handleSaveToken = async(accessToken, refreshToken) => {
        await SecureStore.setItemAsync('access_token',accessToken)
        await SecureStore.setItemAsync('refresh_token',refreshToken)
    }

    const handleLogout = async() => {
        setIsLogin(false); 
        setrole(0);
        setUserId(0);
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('refresh_token')
    }

    const handleLocale = async(language) => {      
        setLocale(language)
        await SecureStore.setItemAsync('locale',language)   
    }
    
    return (
        <AuthContext.Provider value={{
            locale : locale,
            isLogin: isLogin,
            role: role,
            userId: userId,
            onLogin: handleLogin,
            onLogout: handleLogout,
            checkToken: getToken,
            language: handleLocale,
            handleToken: handleSaveToken,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;