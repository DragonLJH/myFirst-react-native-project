import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { SearchBar, Toast } from '@ant-design/react-native';
import axios from 'axios'


export default function HomeScreen({ navigation }) {
    const [miankey, setMainKey] = React.useState('')

    const [searchVal, setSearchVal] = React.useState('')

    const submitSearch = () => {
        navigation.navigate('ProductDetails', { searchVal })
        // Toast.loading('Loading...', 0, () => {
        //     Toast.info('Toast.loading onClose callback called!')
        // })
        // setTimeout(() => {
        //     Toast.removeAll()
        // }, 3000)
    }

    const clearSearch = (val) => {
        setSearchVal('')
    }

    return (
        <View style={{ flexDirection: "column", }}>
            <SearchBar placeholder="搜索" value={searchVal}
                placeholder="搜索"
                onSubmit={submitSearch}
                onChange={(val) => setSearchVal(val)}
                onCancel={clearSearch} />
            {/* <View style={{ flexDirection: "row", }}>
                <View style={{ flex: 2 }}>
                    <TextInput
                        placeholder="请输入关键字"
                        value={miankey}
                        onChangeText={text => setMainKey(text)}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button title="搜索" />
                </View>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View> */}

        </View>
    );
}