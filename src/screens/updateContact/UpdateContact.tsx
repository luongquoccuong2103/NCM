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
import { FormInput } from "../../components/Addcontact/ContextAddContact";
import { useDispatch } from "react-redux";
import { updateContact } from "../home/home.reducer";

const UpdateContact = ({ route, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const images = {
    card1: require("../../../assets/cards/card1.png"),
    card2: require("../../../assets/cards/card2.png"),
    card3: require("../../../assets/cards/card3.png"),
    // Add more as needed
  };
  const [value, setValue] = useState({
    id: "",
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

  const formInput = FormInput();
  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {
    dispatch(updateContact(values));

    Alert.alert("Success", "Contact updated successfully!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("HomeScreen");
        },
      },
    ]);
  };

  useEffect(() => {
    if (route.params) {
      setValue({
        id: route.params.contact.id,
        name: route.params.contact.name,
        job_title: route.params.contact.job_title,
        company: route.params.contact.company,
        phone: route.params.contact.phone,
        email: route.params.contact.email,
        fax: route.params.contact.fax,
        address: route.params.contact.address,
        note: route.params.contact.note,
        website: route.params.contact.website,
        img_url: route.params.contact.img_url,
      });
    }
  }, [route.params, route.params?.contact]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {/* ShimmerPlaceholder can be removed since we are not waiting for any data */}
        <View style={styles.imgContact}>
          {/* Placeholder image or logic to show selected image */}
          <Image style={styles.image} source={images[value.img_url]} />
        </View>
      </View>

      <Formik
        initialValues={value}
        onSubmit={handleOnSubmit}
        validationSchema={AddContactSchema}
        enableReinitialize={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formInput}>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {formInput.map((item, index) => (
                <View key={index} style={styles.formInput_component}>
                  <View style={styles.formInput_item}>
                    <View style={styles.formInput_item_component}>
                      <Icon
                        size={20}
                        style={{ marginLeft: 20 }}
                        name={item.icon}
                        color="#1890FF"
                      />
                      <View style={{ width: "100%", marginLeft: 10 }}>
                        <Text style={{ fontWeight: "600", color: "#1890FF" }}>
                          {item.title}
                        </Text>
                        <TextInput
                          placeholder={item.placeholder}
                          value={values[item.name]}
                          multiline={item.multiline}
                          dense={true}
                          style={styles.formInput_item_input}
                          onChangeText={handleChange(item.name)}
                          onBlur={handleBlur(item.name)}
                          theme={{
                            colors: {
                              primary: "#1890FF",
                              error: "#B22D1D",
                            },
                          }}
                        />
                        {errors[item.name] && touched[item.name] && (
                          <Text style={styles.formInput_item_error_label}>
                            {/* {errors[item.name]} */}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ marginBottom: 15 }} />
            </KeyboardAwareScrollView>
            <View style={styles.footer}>
              <Button onPress={() => navigation.goBack()} color="#1890FF">
                Cancel
              </Button>
              <Button
                color="#1890FF"
                onPress={() => {
                  handleOnSubmit(values);
                }}
              >
                Save
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateContact;
