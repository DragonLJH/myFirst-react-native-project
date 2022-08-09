import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "./AuthContext"
import { MySignIn } from './api/index.js'
import LoginScreen from "./components/LoginScreen/index"
import ContentScreen from "./components/ContentScreen/index"


const FStack = createNativeStackNavigator();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { userName, userPassword } = data
        return MySignIn("/user/queryUserByUserName", { params: { userName, userPassword } })
          .then((res) => {
            if (res) {
              dispatch({ type: 'SIGN_IN', token: userName });//登陆成功的时候再显示主页
              return true
            } else {
              return false
            }
          })
      },
      signOut: (data) => {
        data.navigate('Login')// data === user页面的 navigate ， 根据navigate来跳转回登陆页 来实现退出效果
        // dispatch({ type: 'SIGN_OUT' })//控制userToken 隐藏主页 来实现退出效果
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <FStack.Navigator>
          <FStack.Screen name="Login" component={LoginScreen} />
          <FStack.Screen name="TabStack" component={ContentScreen} options={{ headerShown: false }} />
          {/* 根据控制userToken来显示隐藏主页 */}
          {/* {state.userToken ? <FStack.Screen name="TabStack" component={ContentScreen} options={{ headerShown: false }} /> : <></>} */}
        </FStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

