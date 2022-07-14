import * as React from 'react';
import { Button, View, Text, Image, Dimensions } from 'react-native';
import { GetProductById } from '../../../api/index'

const w = Dimensions.get("window")

export default function ProductDetailsScreen({ navigation }) {
    const [product, setProduct] = React.useState({})
    React.useEffect(() => {
        GetProductById("/product/queryProductById", { params: { productId: 1 } })
            .then((res) => {
                setProduct(res)
            })
        return
    }, [])
    let key = Object.keys(product)
    if (key.length) {

        console.log("product.productRotationImg[0]", product?.productRotationImg[0])
    }
    return (
        <View>
            <Text>productDetailsScreen</Text>
            <View>
                {/* {key.length ? key.map((val, index) => <Text key={index}>{product[val]}</Text>) : <Text>123</Text>} */}
            </View>
            <View>
                <Image
                    style={{ width: w.width, height: w.width }}
                    source={{
                        uri: "http://150.158.96.29:8082/my-shop-img/uploadProductRotationImg/2f0aecaef4514b46b25fb86484e60a1d.jpg",
                    }}
                />
            </View>
        </View>
    );
}