import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { GestureDetector, Gesture, TouchableOpacity } from "react-native-gesture-handler";
import Animated, { event, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';
import { Book, Book2, SwipeUp } from "../../../assets";
import Axios from 'axios';


const {height: SCREEN_HEIGHT} = Dimensions.get('window')


const BottomSheet = ({kelasMhs}) => {
    const [listJadwal, setListJadwal] = useState('');
    
    useEffect(() => {        
        GetJadwal()
        scrollTo(-50)
    }, [])

    const GetJadwal = async () => {
        var d = new Date()
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        var tglIND = new Date(utc + (3600000 * 7))
        var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        var hari = myDays[tglIND.getDay()]
    
        try {
            const response = await Axios.get('http://192.168.1.8:8011/golkar/api.php?op=jadwalMk&hari='+hari+'&kelas='+kelasMhs,); 
            console.log(response.data.data.hasil) 
            const hasil = response.data.data.hasil; 
            setListJadwal(hasil);
        } catch (e) {
            console.log(e)
        }
    }
    
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 500
    const translateY = useSharedValue(0)

    const scrollTo = useCallback((destination) => {
        "worklet";
        translateY.value = withSpring(destination, { damping: 50 });
    }, [])


    const context = useSharedValue({y: 0})    
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = {y: translateY.value}        
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y )
    })
    .onEnd(() => {
        if (translateY.value < -SCREEN_HEIGHT / 6.5) {
            scrollTo(MAX_TRANSLATE_Y)
        } else if (translateY.value > -SCREEN_HEIGHT / 1) {
            scrollTo(-50)
        }
    })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value, [MAX_TRANSLATE_Y + 120, MAX_TRANSLATE_Y], [15, 10],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        }
    })

    const HeadofContent = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <LinearGradient style={styles.bookContain}
                    colors={['#0072ff', '#00c6ff']}
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                >
                    <Image source={Book2} style={{ width: 30, height: 30, alignSelf: 'center', tintColor: '#fff' }} />
                </LinearGradient>

                             
                <View style={styles.line} />

                <View style={styles.swipeContain}>
                    <Image source={SwipeUp} style={{ alignSelf: 'center', tintColor: '#00FFFF' }} />
                </View>
            </View>
        )
    }


    const ListMK = ({val}) => {              
        return (
            <View style={styles.listContaint}>
                <View >
                    <Text style={styles.namaMk}>{ val.matakuliah }</Text>
                    <Text style={styles.namaDosen}>{val.dosen}</Text>
                </View>
                <View>
                    <Text style={styles.jamMk}>{ val.jammasuk }</Text>
                </View>
            </View>
        )
    }



    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[ styles.bottomSheet, rBottomSheetStyle ]} >       
                <View style={styles.content}>    
                    <HeadofContent />
                    <View style={styles.txtContain}>
                        <TouchableOpacity>
                        <Text style={styles.txtJadwal}>Jawlll Mata Kuliah</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            listJadwal.length > 0 ? (
                                listJadwal.map((val, i) => {
                                    console.log(val.hari)
                                    return <ListMK key={i} val={val}/>
                                })
                            ) : (
                                    <><Text>Loading...</Text></>
                            )
                        }
                    </View>                    
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

export default BottomSheet;

const styles = StyleSheet.create({
    bottomSheet: {
        height: SCREEN_HEIGHT,
        width: '90%',
        backgroundColor: '#5D26C1',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        alignSelf: 'center'
    },
    line: {
        top: -10,
        width: 74,
        height: 3,
        backgroundColor: '#00c6ff',
        alignSelf: 'center',
        borderRadius: 2,
        marginVertical: 10,
        marginBottom: 20
    },
    content: {
        flex: 1,
        paddingHorizontal: 10
    },
    bookContain: {
        top: -25,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fe8c00',
        // backgroundColor: '#281152',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtContain: {
        // marginBottom: -10,
        paddingHorizontal: 10
    },
    txtJadwal: {
        color: '#fff',
        fontFamily: 'BebasNeue-Regular',
        fontSize: 18,
        letterSpacing: 2
    },
    swipeContain: {
        top: 10,
        right: 20
    },
    listContaint: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 15,
        // borderBottomWidth: 1,
        // borderColor: '#00FFFF'
    },
    namaMk: {
        fontFamily: 'Quicksand-Bold',
        color: '#fff',
        fontSize: 15
    },
    namaDosen: {
        fontFamily: 'Akaya',
        color: '#fff',
        fontSize: 13
    },
    jamMk: {
        color: '#fcb314',
        // color: '#00FFFF',
        fontFamily: 'PTSansNarrow-Bold',
        marginTop: 10
    }

})