import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';

import { Card, ListItemSeparator, Screen } from '../../components/ui';
import { Spinner } from '../../components';
import { getUserProducts } from '../../store/actions/products';

const MyListingsScreen = ({ getUserProducts, userProducts }) => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getUserProducts();
  }, []);

  return (
    <>
      <Spinner visible={false} />
      <Screen style={styles.container}>
        <FlatList
          keyExtractor={item => item._id}
          data={userProducts}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subtitle={'$' + item.price}
              image={item.images[0]}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={getUserProducts}
        />
      </Screen>
    </>
  );
};

const mapStateToProps = state => ({
  userProducts: state.products.userProducts,
});

export default connect(mapStateToProps, { getUserProducts })(MyListingsScreen);

const styles = StyleSheet.create({
  container: {},
});
