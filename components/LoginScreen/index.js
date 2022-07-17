import * as React from 'react';
import { ScrollView, Alert, } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
import axios from 'axios'
import { AuthContext } from "../../AuthContext"

export default function LoginScreen({ navigation }) {
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
        <ScrollView keyboardShouldPersistTaps='always'>
            <InputItem
                clear
                type="phone"
                placeholder="输入账号"
                onChangeText={text => setLoginVal(text)}
                value={userName}
            />
            <InputItem
                clear
                type="password"
                placeholder="输入密码"
                onChangeText={text => setPasswordVal(text)}
                value={userPassword}
            />
            <Button type="primary" onPress={loginClick}>Login</Button>

        </ScrollView>
    );
}

