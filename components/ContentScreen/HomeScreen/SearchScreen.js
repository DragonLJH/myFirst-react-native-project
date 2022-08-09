import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { SearchBar, Card, Flex, Button } from '@ant-design/react-native';
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
                console.log(res)
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
            {/* <Flex wrap="wrap">
                {'ooooooooooooooooooooooooooooo'
                    .split('')
                    .map((char, i) => <Circle key={`${i}-${char}`} />)}
            </Flex> */}
            <View>
                {productList.map((val, index) => {
                    return (
                        <Card key={index}>
                            {/* <Card.Header
                                title={val.productName}
                                thumbStyle={{ width: 100, height: 100, resizeMode: "stretch" }}
                                thumb={val.productRotationImg[0]}

                            /> */}
                            <Card.Body>
                                <View style={{ flexDirections: "row" }}>
                                    <View style={{ flex: 1, minWidth: 50, minHeight: 50, width: 50, height: 50 }}>
                                        <Image style={{ flex: 1 }} source={{ uri: val.productRotationImg[0] }} />
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ marginLeft: 16 }}>{val.productName}</Text>
                                        <Text style={{ marginLeft: 16 }}>{val.productMsg}</Text>
                                    </View>
                                </View>
                            </Card.Body>
                            {/* <Card.Footer /> */}
                        </Card>
                    )
                })}


            </View>

        </View>
    );
}