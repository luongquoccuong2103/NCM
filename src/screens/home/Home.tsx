//import liraries
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import {
  IconButton,
  Searchbar,
  FAB,
  Card,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import styles from "./styles";
import { FormatDate } from "../../validate/FormatDate";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalHome from "../../components/Home/ModalHome";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { itemHome } from "../../../mocks/home";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { contact } from "../../types/contact.type";
// create a component
const images = {
  card1: require("../../../assets/cards/card1.png"),
  card2: require("../../../assets/cards/card2.png"),
  card3: require("../../../assets/cards/card3.png"),
  // Add more as needed
};

const listRequest = {
  R0001: {
    color: "#C73E1D",
    icon: "account-cancel",
  },
  R0002: {
    color: "#F29339",
    icon: "account-clock",
  },
};

const Home = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const listContact = useSelector(
    (state: RootState) => state.contact.contactList
  );
  const [listFilter, setListFilter] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [countContact, setCountContact] = useState(itemHome.length);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalFloatVisible, setModalFloatVisible] = useState(false);
  const [sort, setSort] = useState("create_date");

  useEffect(() => {
    setListFilter(listContact);
  }, [listContact]);

  const handleSearch = (searchText) => {
    const formattedQuery = searchText.trim().toLowerCase();

    setSearchQuery(formattedQuery);

    if (formattedQuery.length > 0) {
      const filteredContacts = itemHome.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(formattedQuery);
        return nameMatch;
      });
      setListFilter(filteredContacts);
    } else {
      setListFilter(itemHome);
    }
  };

  const handlePressSort = (item) => {
    setSort(item.value);
    console.log(listFilter);
    const sortedList = [...listFilter].sort((a, b) => {
      if (item.value === "create_date") {
        let dateA = new Date(a.created_at.split("-").reverse().join("-"));
        let dateB = new Date(b.created_at.split("-").reverse().join("-"));
        if (dateA.getTime() && dateB.getTime()) {
          // eslint-disable-next-line
          return dateA - dateB;
        } else {
          return 0;
        }
      }
      // Sắp xếp theo tên (name)
      else if (item.value === "name") {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else if (item.value === "company") {
        let companyA = a.company.toLowerCase();
        let companyB = b.company.toLowerCase();
        if (companyA < companyB) return -1;
        if (companyA > companyB) return 1;
        return 0;
      }
    });
    setListFilter(sortedList);
    setModalFloatVisible(!modalFloatVisible);
  };

  const handleAddContact = () => {
    navigation.navigate("HomeSwap", {
      screen: "UpdateContact",
      params: { addContact: true },
    });
    setModalFloatVisible(!modalFloatVisible);
  };

  //   const handleAddContact = () => {
  //     navigation.navigate("HomeSwap", {
  //       screen: "UpdateContact",
  //       params: { addContact: true },
  //     });
  //     setModalFloatVisible(!modalFloatVisible);
  //   };
  interface cardContact {
    item: contact;
  }
  const CardContact = ({ item }: cardContact) => {
    return (
      <Card
        mode="elevated"
        style={styles.card}
        elevation={2}
        onPress={() => {
          navigation.navigate("HomeSwap", {
            screen: "ViewContact",
            params: {
              contact: item,
              showFooter: true,
            },
          });
        }}
      >
        <View style={styles.item}>
          <View>
            <Image source={images[item.img_url]} style={styles.image} />
          </View>
          <View style={styles.txtContact}>
            <View
              style={[
                styles.title,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.nameContact} numberOfLines={1}>
                {item.name}
              </Text>
            </View>

            <Text style={styles.titleContact} numberOfLines={1}>
              {item.job_title}
            </Text>
            <View style={styles.title}>
              <Text numberOfLines={1} style={styles.companyContact}>
                {item.company}
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.date}>{FormatDate(item.created_at)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const EmptyList = () => {
    return (
      <View>
        <Text style={styles.listContainer_label}>No Contact</Text>
      </View>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.sectionStyle}>
            <Searchbar
              onChangeText={handleSearch}
              value={searchQuery}
              placeholder="Search contact"
              theme={{
                roundness: 6,
                colors: { primary: "#1890FF" },
              }}
              style={styles.searchBar}
              editable={true}
            />
          </Pressable>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.labelList}>Name Card ({countContact})</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} />}
            style={{ width: "100%" }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: listFilter.length === 0 ? "center" : "flex-start",
            }}
            data={listFilter}
            renderItem={CardContact}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={Platform.OS === "android" ? 0.1 : 0.5}
            ListEmptyComponent={EmptyList}
          />
        </View>
        <ModalHome
          visible={modalFloatVisible}
          onPressVisable={() => setModalFloatVisible(false)}
          sort={sort}
          onPressSort={handlePressSort}
          onPressAdd={() => {}}
        />
        <FAB
          style={styles.floatButton}
          icon="tune"
          color="#fff"
          onPress={() => setModalFloatVisible(!modalFloatVisible)}
        />
      </SafeAreaView>
    </Provider>
  );
};

export default Home;
