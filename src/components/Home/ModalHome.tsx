import * as React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
} from "react-native";
import { Button, Card } from "react-native-paper";
import styles from "../../screens/home/styles";
import { useContext, useState } from "react";

const ModalHome = ({
  visible,
  onPressVisable,
  sort,
  onPressSort,
  onPressAdd,
}) => {
  const listSort = [
    {
      name: "date",
      title: "Date",
      icon: "calendar-range",
      value: "create_date",
    },
    {
      name: "name",
      title: "Name",
      icon: "account-outline",
      value: "name",
    },
    {
      name: "company",
      title: "Company",
      icon: "office-building-outline",
      value: "company",
    },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onPressVisable();
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onPressVisable}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <TouchableWithoutFeedback>
            <Card elevation={5} style={styles.modelViewFloat}>
              <View style={styles.mb10}>
                <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>
                  Sort
                </Text>
                <View style={styles.modalFloatSort}>
                  {listSort.map((item) => {
                    return (
                      <Button
                        key={item.name}
                        icon={item.icon}
                        color={item.value == sort ? "#1890FF" : "#828282"}
                        labelStyle={{ fontSize: 16 }}
                        mode="outlined"
                        style={{ alignItems: "flex-start" }}
                        onPress={() => onPressSort(item)}
                        uppercase={false}
                      >
                        <Text style={{ fontSize: 12 }}>{item.title}</Text>
                      </Button>
                    );
                  })}
                </View>
              </View>
              <View>
                <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>
                  Manage
                </Text>
                <View>
                  <Button
                    icon="account-plus-outline"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                    uppercase={false}
                    onPress={onPressAdd}
                  >
                    <Text style={{ fontSize: 14 }}>Create contact</Text>
                  </Button>
                </View>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalHome;
