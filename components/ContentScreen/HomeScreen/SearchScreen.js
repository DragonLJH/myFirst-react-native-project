import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { SearchBar } from '@ant-design/react-native';
import { GetProductByMsg } from '../../../api/index'


export default function SearchScreen({ route, navigation }) {


    const [searchVal, setSearchVal] = React.useState(route.params.searchVal)

    const [productList, setProductList] = React.useState([])

    const submitSearch = () => {
        navigation.push('Search', { searchVal })

        // navigation.navigate('Search', { searchVal })
    }

    const clearSearch = (val) => {
        setSearchVal('')
    }
    React.useEffect(() => {
        getProductList()
    }, [])

    const getProductList = () => {
        GetProductByMsg("/product/queryProductByProductMsg", { params: { productMsg: searchVal } })
            .then((res) => {
                setProductList(res)
            })
    }

    return (
        <View style={{ flexDirection: "column", }}>
            <SearchBar placeholder="搜索" value={searchVal}
                placeholder="搜索"
                onSubmit={submitSearch}
                onChange={(val) => setSearchVal(val)}
                onCancel={clearSearch} />
            <View>
                {productList.map((val,index)=>{
                    return <Text key={index}>{val.productName}</Text>
                })}
                

            </View>

        </View>
    );
}