import * as React from 'react';
import { Button, View, Alert, TextInput } from 'react-native';
import axios from 'axios'
import { AuthContext } from "../../AuthContext"
// import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
    // const navigation = useNavigation();
    const [userName, setLoginVal] = React.useState('');
    const [userPassword, setPasswordVal] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    const loginClick = () => {
        signIn({ userName, userPassword }).then((val) => {
            if (val) {
                navigation.navigate('TabStack', { userName })
            } else {
                Alert.alert(
                    "提示",
                    "账号或密码错误",
                    [
                        {
                            text: "关闭",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ]
                );
            }
        })
        resetClick()
    }

    const resetClick = () => {
        setLoginVal("")
        setPasswordVal("")
    }

    return (
        <View style>
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
                secureTextEntry
            />

            <Button title="Login" onPress={loginClick} />
            <Button title="Reset" onPress={resetClick} />
        </View>
    );
}

