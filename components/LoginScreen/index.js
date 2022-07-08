import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import axios from 'axios'
// import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
    // const navigation = useNavigation();
    const [userName, setLoginVal] = React.useState('');
    const [userPassword, setPasswordVal] = React.useState('');

    const loginClick = () => {
        axios({ url: "http://150.158.96.29:8781/user/queryUserByUserName", method: "get", params: { userName, userPassword } })
            .then((val) => {
                if (val.data) {
                    navigation.navigate('TabStack', { userName })

                }
                // console.log("axios", val.data, navigation)
            })
        // console.log(loginVal, passwordVal)
    }
    const resetClick = () => {
        setLoginVal("")
        setPasswordVal("")
    }

    return (
        <View style>
            <Text>登陆</Text>
            <TextInput
                placeholder="输入账号"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setLoginVal(text)}
                value={userName}
            />
            <TextInput
                placeholder="输入密码"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setPasswordVal(text)}
                value={userPassword}
            />

            <Button title="Login" onPress={loginClick} />
            <Button title="Reset" onPress={resetClick} />
        </View>
    );
}

