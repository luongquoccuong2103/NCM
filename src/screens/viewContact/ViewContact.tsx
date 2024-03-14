//import liraries
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Linking,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Appbar, IconButton, TouchableRipple } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { FormatDate } from "../../validate/FormatDate";
import SnackbarComponent from "../../components/viewcontact/Snackbar";

import styles from "./styles";

const images = {
  card1: require("../../../assets/cards/card1.png"),
  card2: require("../../../assets/cards/card2.png"),
  card3: require("../../../assets/cards/card3.png"),
  // Add more as needed
};

const ViewContact = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const [contact, setContact] = useState(route.params.contact);
  // console.log("aaaa", route.param);
  //   useEffect(() => {
  // setLoading(true);
  // FetchApi(
  //   `${ContactAPI.ViewContact}/${route.params.idContact}`,
  //   Method.GET,
  //   ContentType.JSON,
  //   undefined,
  //   getContact
  // );
  //   }, []);

  const handlePressUpdateContact = () => {
    navigation.navigate("UpdateContact", {
      contact,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        theme={{ colors: { primary: "transparent" } }}
        statusBarHeight={1}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View style={styles.body}>
        <ShimmerPlaceholder
          visible={!loading}
          width={windowWidth * 0.95}
          height={windowHeight * 0.3}
          shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
        >
          <View style={styles.body_imgContact}>
            {contact && (
              <Image
                source={images[contact.img_url]}
                style={styles.body_imgContact_image}
              />
            )}
          </View>
        </ShimmerPlaceholder>
        {!contact && (
          <View style={styles.info}>
            <View style={styles.info_title}>
              <ShimmerPlaceholder
                visible={!loading}
                width={windowWidth * 0.5}
                height={windowHeight * 0.05}
                shimmerStyle={{ borderRadius: 10, marginBottom: 20 }}
              />
              <ShimmerPlaceholder
                visible={!loading}
                width={windowWidth * 0.9}
                height={windowHeight * 0.02}
                shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
              />
              <ShimmerPlaceholder
                visible={!loading}
                width={windowWidth * 0.9}
                height={windowHeight * 0.02}
                shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
              />
            </View>
          </View>
        )}
        {contact && (
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginTop: 10 }} />
            <View style={styles.info}>
              <View style={styles.info_title}>
                <Text style={styles.info_title_name} numberOfLines={3}>
                  {contact.name}
                </Text>
                {Boolean(contact.job_title) && (
                  <Text style={styles.info_title_job}>
                    <Text style={styles.info_title_job_name}>Job Title </Text>
                    {contact.job_title}
                  </Text>
                )}
                <Text style={styles.info_title_job}>
                  <Text style={styles.info_title_job_name}>Company </Text>
                  {contact.company}
                </Text>
              </View>
              {
                <View style={styles.info_component}>
                  {Boolean(contact.phone) && (
                    <TouchableRipple
                      borderless={true}
                      style={[
                        styles.info_component_button,
                        styles.btl20,
                        styles.btr20,
                      ]}
                      onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                    >
                      <View
                        style={[
                          styles.info_contact_des,
                          styles.info_contact_border,
                        ]}
                      >
                        <View style={styles.info_contact_des_item}>
                          <Text style={styles.info_component_des_title}>
                            Phone
                          </Text>
                          <Text style={styles.info_contact_des_label}>
                            {contact.phone}
                          </Text>
                        </View>
                        <IconButton
                          icon="cellphone"
                          size={16}
                          iconColor="#828282"
                        />
                      </View>
                    </TouchableRipple>
                  )}
                  {Boolean(contact.email) && (
                    <TouchableRipple
                      borderless={true}
                      style={styles.info_component_button}
                      onPress={() => Linking.openURL(`mailto:${contact.email}`)}
                    >
                      <View
                        style={[
                          styles.info_contact_des,
                          ,
                          styles.info_contact_border,
                        ]}
                      >
                        <View style={styles.info_contact_des_item}>
                          <Text style={styles.info_component_des_title}>
                            Email
                          </Text>
                          <Text style={styles.info_contact_des_label}>
                            {contact.email}
                          </Text>
                        </View>
                        <IconButton
                          icon="email"
                          size={16}
                          iconColor="#828282"
                        />
                      </View>
                    </TouchableRipple>
                  )}

                  {Boolean(contact.fax) && (
                    <TouchableRipple
                      borderless={true}
                      style={[
                        styles.info_component_button,
                        styles.bbl20,
                        styles.bbr20,
                      ]}
                    >
                      <View style={styles.info_contact_des}>
                        <View style={styles.info_contact_des_item}>
                          <Text style={styles.info_component_des_title}>
                            Fax
                          </Text>
                          <Text style={styles.info_contact_des_label}>
                            {contact.fax}
                          </Text>
                        </View>
                        <IconButton icon="fax" size={16} iconColor="#828282" />
                      </View>
                    </TouchableRipple>
                  )}
                </View>
              }
              {(Boolean(contact.address) || Boolean(contact.website)) && (
                <View style={styles.info_component}>
                  {Boolean(contact.address) && (
                    <TouchableRipple
                      borderless={true}
                      style={[
                        styles.info_component_button,
                        styles.btl20,
                        styles.btr20,
                      ]}
                      onPress={() =>
                        Linking.openURL(
                          Platform.OS === "android"
                            ? `geo:0,0?q=${contact.address}`
                            : `maps:0,0?q=${contact.address}`
                        )
                      }
                    >
                      <View
                        style={[
                          styles.info_contact_des,
                          styles.info_contact_border,
                        ]}
                      >
                        <View style={styles.info_contact_des_item}>
                          <Text style={styles.info_component_des_title}>
                            Address
                          </Text>
                          <Text style={styles.info_contact_des_label}>
                            {contact.address}
                          </Text>
                        </View>
                        <IconButton
                          icon="map-marker"
                          size={16}
                          iconColor="#828282"
                        />
                      </View>
                    </TouchableRipple>
                  )}
                  {Boolean(contact.website) && (
                    <TouchableRipple
                      borderless={true}
                      style={[
                        styles.info_component_button,
                        styles.bbl20,
                        styles.bbr20,
                      ]}
                      onPress={() =>
                        Linking.openURL(`https://${contact.website}`)
                      }
                    >
                      <View style={styles.info_contact_des}>
                        <View style={styles.info_contact_des_item}>
                          <Text style={styles.info_component_des_title}>
                            Website
                          </Text>
                          <Text style={styles.info_contact_des_label}>
                            {contact.website}
                          </Text>
                        </View>
                        <IconButton icon="web" size={16} iconColor="#828282" />
                      </View>
                    </TouchableRipple>
                  )}
                </View>
              )}
              {Boolean(contact.note) && (
                <View style={styles.info_component}>
                  <TouchableRipple
                    borderless={true}
                    style={styles.info_component_button}
                  >
                    <View style={styles.info_contact_des}>
                      <View>
                        <Text style={styles.info_component_des_title}>
                          Note
                        </Text>
                        <Text style={styles.info_contact_des_label}>
                          {contact.note}
                        </Text>
                      </View>
                    </View>
                  </TouchableRipple>
                </View>
              )}

              {
                <View style={styles.info_component}>
                  <TouchableRipple
                    borderless={true}
                    style={[
                      styles.info_component_button,
                      styles.btl20,
                      styles.btr20,
                    ]}
                  >
                    <View
                      style={[
                        styles.info_contact_des,
                        styles.info_contact_border,
                      ]}
                    >
                      <View style={styles.info_contact_des_item}>
                        <Text style={styles.info_component_des_title}>
                          Created Date
                        </Text>
                        <Text style={styles.info_contact_des_label}>
                          {FormatDate(contact.created_at)}
                        </Text>
                      </View>
                      <IconButton
                        icon="calendar-today"
                        size={16}
                        iconColor="#828282"
                      />
                    </View>
                  </TouchableRipple>
                </View>
              }
            </View>
            <View style={{ marginBottom: 20 }} />
          </ScrollView>
        )}
        <SnackbarComponent
          visible={snackVisible}
          onPressVisible={() => setSnackVisible(false)}
          message="Copy"
        />
      </View>
      {route.params && route.params.showFooter && (
        <View style={styles.footer}>
          {route.params && !route.params.useid && contact && (
            <Pressable
              style={styles.footer_button}
              onPress={handlePressUpdateContact}
            >
              <Icon name="account-edit-outline" size={24} color="#828282" />
              <Text style={styles.footer_button_label}>Edit</Text>
            </Pressable>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewContact;
