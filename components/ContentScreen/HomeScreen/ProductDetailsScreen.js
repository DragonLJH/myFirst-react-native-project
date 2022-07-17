import * as React from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
// import { Provider, Carousel } from '@ant-design/react-native';
import { Carousel } from '@ant-design/react-native';
import { GetProductById } from '../../../api/index'

const w = Dimensions.get("window")

export default function ProductDetailsScreen({ navigation }) {
    const [product, setProduct] = React.useState({})
    const [akey, setAkey] = React.useState([])
    const [rotationImgs, setRotationImgs] = React.useState([])
    const [msgImgs, setMsgImgs] = React.useState([])
    const [size, setSizes] = React.useState([])
    const [color, setColor] = React.useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [carousel, setCarousel] = React.useState(null)

    React.useEffect(() => {
        getProduct()
        return
    }, [])

    const onHorizontalSelectedIndexChange = (index) => {
        //监听轮播图
    }

    const getProduct = () => {
        GetProductById("/product/queryProductById", { params: { productId: 1 } })
            .then((res) => {
                setProduct(res)
                let objRes = Object.keys(res)
                objRes = objRes.filter((val) => {
                    return !["productRotationImg", "productMsgImg", "productSize", "productColor"].includes(val)
                })
                setAkey(objRes)
                setRotationImgs(res["productRotationImg"])
                setMsgImgs(res["productMsgImg"])
                setSizes(res["productSize"])
                setColor(res["productColor"])
            })
    }

    const ResView = (props) => {

        const { myKey } = props
        console.log(myKey, product[myKey])
        return <Text>{product[myKey]}</Text>
    }
    const MsgView = () => {

        return (
            <View>
                <View >
                    <Text style={{ color: "#990" }}>{product["productMsg"]}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>销售价格：{product["productSellingPrice"]}</Text><Text>原价：{product["productPrice"]}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>库存：{product["productStock"]}</Text><Text>销量：{product["productSalesVolume"]}</Text>
                </View>
            </View>
        )
    }


    return (
        <ScrollView style={{ backgroundColor: "#eee" }}>
            <View style={{ width: w.width, height: w.width }}>
                <Carousel
                    style={{ backgroundColor: '#ccc', width: w.width, height: w.width }}
                    selectedIndex={selectedIndex}
                    autoplay
                    infinite
                    afterChange={onHorizontalSelectedIndexChange}
                >
                    {/* <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
                            <Text>Carousel 1</Text>
                        </View> */}
                    {rotationImgs.map((val, index) => {
                        return <View style={{ flexGrow: 1, }} key={index}><Image style={{ flex: 1 }} source={{ uri: val }} /></View>
                    })}
                </Carousel>
            </View>

            {/* <View style={{ backgroundColor: "#fff", padding: 10, margin: 10, borderWidth: 1, borderRadius: 20, }}>
                {akey.map((val, index) => <ResView key={index} myKey={val} />)}
            </View> */}
            <View style={{ backgroundColor: "#fff", padding: 10, margin: 10, borderWidth: 1, borderRadius: 20, }}>
                <MsgView />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>宝贝详情</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
                {msgImgs.map((val, index) => {
                    return <View style={{ flex: 1, width: w.width, height: w.width }} key={index}><Image style={{ flex: 1 }} source={{ uri: val }} /></View>
                })}
            </View>

        </ScrollView>
    );
}

