//import liraries
import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, Image, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Provider, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackActions } from "@react-navigation/native";
import styles from "./styles";
import { Formik } from "formik";
import AddContactSchema from "../../validate/ValidateFormAddContact";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import ModalContact from "../../components/Addcontact/ModelContact";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import AuthContext from "../../store/AuthContext";
import { FormInput } from "../../components/Addcontact/ContextAddContact";
import {
  DuplicateInfoModel,
  DuplicateModel,
} from "../../components/Addcontact/ContextAddContact";

const UpdateContact = ({ route, navigation }) => {
  const authCtx = useContext(AuthContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const formRef = useRef();
  const [value, setValue] = useState({
    name: "",
    job_title: "",
    company: "",
    phone: "",
    email: "",
    fax: "",
    address: "",
    note: "",
    website: "",
    img_url: "",
  });
  //   useEffect(() => {
  //     route.params &&
  //       route.params.idContact &&
  //       formRef.current &&
  //       FetchApi(
  //         `${ContactAPI.ViewContact}/${route.params.idContact}`,
  //         Method.GET,
  //         ContentType.JSON,
  //         undefined,
  //         getContact
  //       );
  //     if (route.params && route.params.contact && formRef.current) {
  //       formRef.current.setValues(route.params.contact);
  //       setLoading(true);
  //     }
  //     if (route.params && route.params.addContact && formRef.current) {
  //       formRef.current.setValues({
  //         ...value,
  //         img_url: "https://ncmsystem.azurewebsites.net/Images/noImage.jpg",
  //       });
  //       setLoading(true);
  //     }
  //   }, [route.params]);

  const [duplicate, setDuplicate] = useState(false);

  const [duplicateOther, setDuplicateOther] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState({
    id: "",
    id_duplicate: "",
    owner: "",
  });

  const formInput = FormInput();

  const getContact = (status, data) => {
    authCtx.checkToken();
    if (!status) {
      Alert.alert("", t("Something_Wrong"));
      return;
    }
    if (status && data) {
      if (data.data && formRef.current) {
        // formRef.current.setValues(data.data);
        setLoading(true);
      }
    }
  };

  const handleOnSubmit = (values) => {
    setIsLoading(true);
    // route.params &&
    //   route.params.idContact &&
    //   FetchApi(
    //     `${ContactAPI.UpdateContact}/${route.params.idContact}`,
    //     Method.PUT,
    //     ContentType.JSON,
    //     values,
    //     getMessage
    //   );
    // route.params &&
    //   route.params.contact &&
    //   FetchApi(
    //     ContactAPI.AddContact,
    //     Method.POST,
    //     ContentType.JSON,
    //     values,
    //     getMessage
    //   );
    // route.params &&
    //   route.params.addContact &&
    //   FetchApi(
    //     ContactAPI.AddContact,
    //     Method.POST,
    //     ContentType.JSON,
    //     values,
    //     getMessage
    //   );
  };

  const getMessage = (status, data) => {
    authCtx.checkToken();
    setIsLoading(false);
    if (status && data) {
      if (data.message === "C0009") {
        navigation.dispatch(StackActions.popToTop());
        route.params &&
          route.params.contact &&
          navigation.navigate("HomeSwap", {
            screen: "ViewContact",
            params: { idContact: data.data.id, showFooter: true },
          });
        return;
      }
      if (data.message === "C0010") {
        navigation.dispatch(StackActions.popToTop());
        route.params &&
          route.params.idContact &&
          navigation.navigate("HomeSwap", {
            screen: "ViewContact",
            params: { idContact: route.params.idContact, showFooter: true },
          });
        return;
      }
      if (data.message === "D0001") {
        setDuplicate(true);
        setDuplicateInfo({ ...duplicateInfo, id: data.data.id });
        return;
      }
      if (data.message === "D0003") {
        setDuplicateOther(true);
        setDuplicateInfo({
          id: data.data.id,
          id_duplicate: data.data.id_duplicate,
          owner: data.data.user_name,
        });
        return;
      }
    }
    if (!status) {
      if (data) {
        if (data.message === "C0005") {
          Alert.alert("", t("Screen_AddContact_Alert_Infomation_Not_Valid"));
          return;
        }
        if (data.message === "D0005") {
          Alert.alert("", t("Screen_UpdateContact_Alert_Message"), [
            { text: "OK" },
          ]);
          return;
        }
      }
      if (!data) {
        Alert.alert("", t("Something_Wrong"));
        return;
      }
    }
  };

  const handleDuplicateOther = () => {
    // FetchApi(
    //   `${ContactAPI.RequestTransferContact}/${duplicateInfo.id}/${duplicateInfo.id_duplicate}`,
    //   Method.GET,
    //   ContentType.JSON,
    //   undefined,
    //   getMessageDuplaicate
    // );
  };

  const getMessageDuplaicate = (status, data) => {
    authCtx.checkToken();
    if (!status) {
      Alert.alert("", t("Something_Wrong"));
      return;
    }
    if (status && data) {
      setDuplicateOther(false);
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("HomeSwap", {
        screen: "ViewContact",
        params: { idContact: duplicateInfo.id_duplicate },
      });
      return;
    }
  };

  const handleDuplicate = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("HomeSwap", {
      screen: "UpdateContact",
      params: { idContact: duplicateInfo.id },
    });
  };

  const handleOnCancel = () => {
    setDuplicateOther(false);
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("HomeSwap", {
      screen: "ViewContact",
      params: { idContact: duplicateInfo.id_duplicate },
    });
  };

  return (
    <Provider>
      <LoadingDialog onVisible={isLoading} />
      <ModalContact
        visible={duplicate}
        onPress={handleDuplicate}
        onPressVisable={() => setDuplicate(false)}
        context={DuplicateModel()}
        onCancel={() => setDuplicate(false)}
      />
      <ModalContact
        visible={duplicateOther}
        onPress={handleDuplicateOther}
        onPressVisable={() => setDuplicateOther(false)}
        context={DuplicateInfoModel(duplicateInfo.owner)}
        onCancel={handleOnCancel}
      />
      <View style={{ alignItems: "center" }}>
        <ShimmerPlaceholder
          visible={loading}
          width={windowWidth * 0.9}
          height={windowHeight * 0.3}
          shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
        >
          <View style={styles.imgContact}>
            {route.params && formRef.current && <Image style={styles.image} />}
          </View>
        </ShimmerPlaceholder>
      </View>

      <Formik
        initialValues={value}
        onSubmit={handleOnSubmit}
        validationSchema={AddContactSchema}
        innerRef={formRef}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={styles.formInput}>
              <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {formInput.map((item, index) => {
                  return (
                    <View key={index} style={styles.formInput_component}>
                      <View style={styles.formInput_item}>
                        <ShimmerPlaceholder
                          visible={loading}
                          style={{ width: "100%" }}
                          shimmerStyle={styles.shimmer_FormInput}
                        >
                          <View style={styles.formInput_item_component}>
                            <Icon size={20} name={item.icon} color="#1890FF" />
                            <View style={{ width: "100%", marginLeft: 10 }}>
                              <Text
                                style={{ fontWeight: "600", color: "#1890FF" }}
                              >
                                {item.title}
                              </Text>
                              <TextInput
                                placeholder={item.placeholder}
                                value={values[item.name]}
                                multiline={item.multiline}
                                // keyboardType={item.keyboardType}
                                dense={true}
                                style={styles.formInput_item_input}
                                onChangeText={handleChange(item.name)}
                                onBlur={handleBlur(item.name)}
                                // error={errors[item.name] && touched[item.name]}
                                theme={{
                                  colors: {
                                    primary: "#1890FF",
                                    error: "#B22D1D",
                                  },
                                }}
                              />
                              {errors[item.name] && touched[item.name] ? (
                                <View style={styles.formInput_item_error}>
                                  <Text
                                    style={styles.formInput_item_error_label}
                                  >
                                    {/* {t(errors[item.name])} */}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        </ShimmerPlaceholder>
                      </View>
                    </View>
                  );
                })}
                <View style={{ marginBottom: 15 }} />
              </KeyboardAwareScrollView>
              <View style={styles.footer}>
                <Button
                  onPress={() => navigation.goBack()}
                  //   style={styles.footer_button_label}
                  color="#1890FF"
                >
                  Cancel
                </Button>
                <Button
                  //   style={styles.footer_button_label}
                  color="#1890FF"
                  //   onPress={handleSubmit}
                >
                  Save
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </Provider>
  );
};

export default UpdateContact;
