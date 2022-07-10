import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { AuthContext } from "../../../AuthContext"

export default function UserScreen({ navigation }) {
    const { signOut } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>UserScreen Screen</Text>
            <Button
                title="退出"
                onPress={() => signOut(navigation)}
            />
        </View>
    );
}