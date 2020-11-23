import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../constants/colors';
import { Icon } from '../../components';
import { ListItem, ListItemSeparator, Screen } from '../../components/ui';
import { logout } from '../../store/actions/auth';
import routes from '../../navigation/routes';
import { verifyAvatar } from '../../utility/helpers';

const options = [
  {
    route: routes.MY_LISTING,
    title: 'My Listings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
  },
  {
    route: 'Messages',
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: 'blue',
    },
  },
  {
    route: 'Pick Location',
    title: 'Pick Location',
    icon: {
      name: 'map',
      backgroundColor: 'purple',
    },
  },
  {
    route: 'Update Profile',
    title: 'Update Profile',
    icon: {
      name: 'settings',
      backgroundColor: 'skyblue',
    },
  },
];

const AccountScreen = ({ navigation, user, logout }) => {
  return (
    <Screen>
      <ListItem
        title={user.name}
        subtitle={user.email}
        image={verifyAvatar(user.avatar)}
      />
      <View style={styles.list}>
        <FlatList
          style={styles.list}
          data={options}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.route)}
              arrow
              IconComponent={
                <Icon
                  icon={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <ListItem
        title='logout'
        IconComponent={<Icon icon='lock' backgroundColor='yellow' />}
        onPress={logout}
      />
    </Screen>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(AccountScreen);

const styles = StyleSheet.create({
  list: { marginVertical: 40 },
});
