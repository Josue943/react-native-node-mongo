import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text } from 'react-native';

import useApi from '../../hooks/useApi';
import { CustomButton } from '../../components/ui';
import { Card, ListItemSeparator, Screen } from '../../components/ui';
import { fetchProducts } from '../../store/actions/products';
import routes from '../../navigation/routes';
import Spinner from '../../components/Spinner';

const FeedScreen = ({ products, navigation, fetchProducts, error }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { request, loading } = useApi(fetchProducts);
  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Spinner visible={loading} />
      <Screen style={styles.container}>
        {error && (
          <>
            <Text>Unexpeted error an occur.Try again!</Text>
            <CustomButton title='Try again' onPress={request} />
          </>
        )}
        <FlatList
          keyExtractor={item => item._id}
          data={products}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subtitle={'$' + item.price}
              image={item.images[0]}
              onPress={() =>
                navigation.navigate(routes.PRODUCT_DETAILS, {
                  productId: item._id,
                })
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            request();
          }}
        />
      </Screen>
    </>
  );
};

const mapStateToProps = state => ({
  products: state.products.products,
  error: state.products.error,
});

export default connect(mapStateToProps, { fetchProducts })(FeedScreen);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
