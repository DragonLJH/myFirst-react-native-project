import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { GetProductById } from '../../../api/index'

const w = Dimensions.get("window")

export default function ProductDetailsScreen({ navigation }) {
    const [product, setProduct] = React.useState({})
    const [akey, setAkey] = React.useState([])
    React.useEffect(() => {
        GetProductById("/product/queryProductById", { params: { productId: 1 } })
            .then((res) => {
                setProduct(res)
                setAkey(Object.keys(res))
            })
        return
    }, [])
    React.useEffect(() => {
        asd()
    }, ['akey'])
    const ResView = (props) => {
        const { myKey } = props
        if (myKey.indexOf("Img") != -1) return <Image style={{ width: w.width, height: w.width }} source={{ uri: product[myKey][0] }} />
        else return <Text>{product[myKey]}</Text>
    }
    const asd = () => {
        let arr = akey.map((val, index) => <ResView key={index} myKey={val} />)
        console.log(...arr)
    }

    return (
        <SafeAreaView >
            <ScrollView  >
                <Text>productDetailsScreen</Text>
                <View>
                    {akey.length ?  akey.map((val, index) => <ResView key={index} myKey={val} />) : <Text ></Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

