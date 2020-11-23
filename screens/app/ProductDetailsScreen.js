import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import {
  Card,
  CustomText,
  CustomButton,
  Screen,
  ListItem,
} from '../../components/ui';
import { getProduct } from '../../store/actions/products';
import { verifyAvatar } from '../../utility/helpers';
import { Spinner } from '../../components';
import ContactSellerForm from '../../components/ContactSellerForm';

const ProductDetailsScreen = ({ route, product, getProduct }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!route.params) return;
    getProduct(route.params.productId);
    setLoading(true);
  }, []);

  if (!product) return <Spinner />;
  const {
    title,
    price,
    images,
    owner: { _id, avatar, name, count, expoPushToken },
  } = product;
  console.log(images);
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
        >
          <Card
            title={title}
            subtitle={'$ ' + price}
            image={images[0]}
            style={styles.imgCard}
          />

          <View style={styles.mainContainer}>
            <View style={styles.userInfo}>
              <ListItem
                title={name}
                subtitle={`Listing(s) ${count}`}
                image={verifyAvatar(avatar)}
              />
            </View>
            <ContactSellerForm userId={_id} targetToken={expoPushToken} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
};

const mapStateToProps = state => ({
  product: state.products.selectedProduct,
});

export default connect(mapStateToProps, { getProduct })(ProductDetailsScreen);

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  imgCard: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  mainContainer: { padding: 10 },
  userInfo: { marginTop: 10, marginVertical: 30 },
  text: { marginLeft: 15 },
  buttonContainer: { marginVertical: 25 },
});
