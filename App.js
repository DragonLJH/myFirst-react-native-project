import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "./AuthContext"
import axios from 'axios'
import LoginScreen from "./components/LoginScreen/index"
import ContentScreen from "./components/ContentScreen/index"


const FStack = createNativeStackNavigator();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
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
        return axios({ url: "http://150.158.96.29:8781/user/queryUserByUserName", method: "get", params: { userName, userPassword } })
          .then((val) => {
            if (val?.data && val.data) {
              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
              return true
            } else {
              return false
            }
          })
      },
      signOut: (data) => {
        console.log("signOut",data)
        dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <FStack.Navigator>
          <FStack.Screen name="登陆" component={LoginScreen} />
          {state.userToken ? <FStack.Screen name="TabStack" component={ContentScreen} options={{ headerShown: false }} /> : <></>}
        </FStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

