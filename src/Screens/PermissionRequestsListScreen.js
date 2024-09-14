import React, {useState} from 'react';
import { FlatList, StyleSheet, View} from 'react-native';

import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';


const initialRequests = [
    {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../../assets/doctor1.png'), 
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../../assets/doctor2.png'),
    },
]
function PermissionRequestsListScreen(props) {
    const [requests, setRequests ] = useState(initialRequests);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
            setRequests(requests.filter((r) => r.id !== requests.id));
    }
    return (
        <Screen>
            <FlatList 
            data={initialRequests}
            keyExtractor={(requests) => requests.id.toString()}
            renderItem={({ item }) => (
                <ListItem
                title={item.title}
                subTitle={item.description}
                image={item.image}
                onPress={() => console.log("Request selected", item)}
                
                />
            )}
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={() => {
                setRequests([
                    {
                        id: 2,
                        title: 'T2',
                        description: 'D2',
                        image: require('../../assets/Raied.png'),
                    },
                ]);
            }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
});

export default PermissionRequestsListScreen;