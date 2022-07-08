import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import axios from 'axios'

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen Screen</Text>
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            /> */}
        </View>
    );
}