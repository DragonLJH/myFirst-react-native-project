import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Dimensions, StyleSheet } from 'react-native';
// import { Provider, Carousel } from '@ant-design/react-native';
import { Carousel } from '@ant-design/react-native';
import { GetProductById } from '../../../api/index'

const w = Dimensions.get("window")

export default function ProductDetailsScreen({ navigation }) {
    const [product, setProduct] = React.useState({})
    const [akey, setAkey] = React.useState([])
    const [rotationImgs, setRotationImgs] = React.useState([])
    const [msgImgs, setMsgImgs] = React.useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [autoplay, setAutoplay] = React.useState(true)
    const [carousel, setCarousel] = React.useState(null)

    React.useEffect(() => {
        getProduct()
        return
    }, [])

    const onHorizontalSelectedIndexChange = (index) => {
        /* tslint:disable: no-console */
        console.log('horizontal change to', index)
        setSelectedIndex(index)
    }
    // const onVerticalSelectedIndexChange = (index) => {
    //     /* tslint:disable: no-console */
    //     console.log('vertical change to', index)
    // }

    const getProduct = () => {
        GetProductById("/product/queryProductById", { params: { productId: 1 } })
            .then((res) => {
                setProduct(res)
                let objRes = Object.keys(res)
                objRes = objRes.filter((val) => {
                    return !["productRotationImg", "productMsgImg"].includes(val)
                })
                setAkey(objRes)
                setRotationImgs(res["productRotationImg"])
                setMsgImgs(res["productMsgImg"])
            })
    }

    const ResView = (props) => {
        const { myKey } = props
        if (myKey.indexOf("Img") != -1) return <Image style={{ width: w.width, height: w.height }} source={{ uri: product[myKey][0] }} />
        else return <Text>{product[myKey]}</Text>
    }

    return (
        <SafeAreaView >
            <ScrollView  >

                <View style={{ width: w.width, height: w.width }}>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={selectedIndex}
                        autoplay
                        infinite
                        afterChange={onHorizontalSelectedIndexChange}
                        ref={(ref) => (setCarousel(ref))}>
                        <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
                            <Text>Carousel 1</Text>
                        </View>
                        <View style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}>
                            <Text>Carousel 2</Text>
                        </View>
                    </Carousel>
                </View>
                <Text>productDetailsScreen</Text>
                {/* <ScrollView style={{ flexDirection: "row", justifyContent: "space-around" }}> */}
                <View style={{ flex: 1, flexDirection: "row", }}>
                    {rotationImgs.map((val, index) => {
                        return <View style={{ flex: 1, width: w.width, height: w.width }} key={index}><Image style={{ flex: 1 }} source={{ uri: val }} /></View>
                    })}
                </View>

                <View>
                    {akey.map((val, index) => <ResView key={index} myKey={val} />)}
                </View>

                <View style={{ flexDirection: "column" }}>
                    {msgImgs.map((val, index) => {
                        return <View style={{ flex: 1, width: w.width, height: w.width }} key={index}><Image style={{ flex: 1 }} source={{ uri: val }} /></View>
                    })}
                </View>
                {/* <Carousel
                    style={styles.wrapper}
                    selectedIndex={selectedIndex}
                    autoplay
                    infinite
                    afterChange={onHorizontalSelectedIndexChange}
                    ref={(ref) => (this.carousel = ref)}>
                    <View
                        style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
                        <Text>Carousel 1</Text>
                    </View>
                    <View
                        style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}>
                        <Text>Carousel 2</Text>
                    </View>
                    <View
                        style={[
                            styles.containerHorizontal,
                            { backgroundColor: 'yellow' },
                        ]}>
                        <Text>Carousel 3</Text>
                    </View>
                    <View
                        style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}>
                        <Text>Carousel 4</Text>
                    </View>
                    <View
                        style={[
                            styles.containerHorizontal,
                            { backgroundColor: 'fuchsia' },
                        ]}>
                        <Text>Carousel 5</Text>
                    </View>
                </Carousel> */}
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ccc', width: w.width, height: w.width
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    containerVertical: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    text: {
        color: '#fff',
        fontSize: 36,
    },
});