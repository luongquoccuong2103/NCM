import { Button, Provider, TextInput } from "react-native-paper";
import styles from "./styles";
import { Dimensions, View, Image, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import AddContactSchema from "../../validate/ValidateFormAddContact";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputItem from "../../components/Addcontact/TextInputItem";
import { FormInput } from "../../components/Addcontact/ContextAddContact";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { useDispatch } from "react-redux";
import { addContact } from "../home/home.reducer";
import { contact } from "../../types/contact.type";
const AddContact = ({ route, navigation }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [loadingDialog, setLoadingDialog] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
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

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  function formatDate(date) {
    const d = new Date(date);
    let day = "" + d.getDate();
    let month = "" + (d.getMonth() + 1);
    const year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return [day, month, year].join("-");
  }

  const handleSubmit = (values: contact) => {
    values.id = randomId();
    values.created_at = formatDate(new Date());
    console.log("values", values);
    if (values) {
      setLoadingDialog(true);
      dispatch(addContact(values));
      setLoadingDialog(false);
      navigation.navigate("HomeScreen");
    }
  };

  const extractNumbers = (str) => {
    if (str) return str.replace(/\D/g, "");
  };

  useEffect(() => {
    if (route.params?.newPhoto) {
      console.log(route.params?.newPhoto);
      const updatedValues = {
        name: route.params.newPhoto.name[0] || "",
        job_title: route.params.newPhoto.job_title[0] || "",
        company: route.params.newPhoto.company[0] || "",
        phone: extractNumbers(route.params.newPhoto.phone[0]) || "",
        email: route.params.newPhoto.email[0] || "",
        fax: extractNumbers(route.params.newPhoto.fax[0]) || "",
        address: route.params.newPhoto.address[0] || "",
        note: "",
        website: route.params.newPhoto.website[0] || "",
        img_url: route.params.newPhoto.img_url,
      };
      setValue(updatedValues);
      // console.log(updatedValues); // Log the updated values here
    }
  }, [route.params?.newPhoto]);

  return (
    <Provider>
      <LoadingDialog visible={loadingDialog} />
      <View style={{ alignItems: "center" }}>
        <ShimmerPlaceholder
          visible={!loadingDialog}
          style={{ width: windowWidth * 0.9, height: windowHeight * 0.3 }}
          shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
        >
          {/* Hiển thị ảnh nếu có */}
          {value.img_url && (
            <Image
              source={{ uri: value.img_url }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              resizeMode="cover"
            />
          )}
        </ShimmerPlaceholder>
      </View>
      <Formik
        initialValues={value}
        onSubmit={handleSubmit}
        validationSchema={AddContactSchema}
        enableReinitialize={true}
        innerRef={formRef}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <View style={styles.formInput}>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {FormInput().map((item, index) => {
                return (
                  <View key={index} style={styles.formInput_component}>
                    <ShimmerPlaceholder
                      visible={!loadingDialog}
                      style={{ width: "100%" }}
                      shimmerStyle={styles.shimmer_formInput}
                    >
                      {value && (
                        <TextInputItem
                          item={item}
                          handleChange={handleChange}
                          errors={errors}
                          touched={touched}
                          values={value}
                        />
                      )}
                    </ShimmerPlaceholder>
                  </View>
                );
              })}
            </KeyboardAwareScrollView>

            <View style={styles.footer}>
              <Button onPress={() => navigation.goBack()}>{"Cancel"}</Button>
              <Button color="#1890FF" onPress={() => handleSubmit()}>
                {"Add"}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </Provider>
  );
};

export default AddContact;
