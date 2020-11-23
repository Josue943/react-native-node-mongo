import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';

import { deleteMessage, getMessages } from '../../store/actions/messages';
import {
  ListItem,
  ListItemSeparator,
  ListItemDeleteAction,
} from '../../components/ui';

const MessagesScreen = ({ getMessages, messages, deleteMessage }) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            title={item.emitter.name}
            subtitle={item.message}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => deleteMessage(item._id)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={getMessages}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps, { getMessages, deleteMessage })(
  MessagesScreen
);

const styles = StyleSheet.create({
  screen: { flex: 1, paddingLeft: 5, paddingVertical: 10 },
});
