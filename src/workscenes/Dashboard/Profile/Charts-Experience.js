import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Cancel from '../../../../assets/images/cancel.svg';
import Nocancel from '../../../../assets/images/nocancel.svg';
import Arrow from '../../../../assets/Arrow.svg'
import chartBG from '../../../../assets/chartBG25.png';
import chartBGIOS from '../../../../assets/chartBG25IOS.png';
import { Platform } from 'react-native';
const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

let arr = []

export function ChartsExperience({ data, len, hidden }) {

    const [experience, setExperience] = useState([1])
    const [labels, setLabels] = useState([]);
    const [days, setDaysLabels] = useState([]);
    const [valueText1, setValueText1] = useState('');
    const [valueText2, setValueText2] = useState('');
    const kk = len === 7 ? 1.15 : 1.039;

    const step00 = windowWidth * 0.069;
    const step2 = windowWidth * 0.357;
    const step3 = windowWidth * 0.217;
    const step4 = windowWidth * 0.148;
    const step5 = windowWidth * 0.106;
    const step6 = windowWidth * 0.078;
    const step7 = windowWidth * 0.085;

    const margins = [
        [step00, step2],
        [step00, step3, step3],
        [step00, step4, step4, step4],
        [step00, step5, step5, step5, step5],
        [step00, step6, step6, step6, step6, step6],
        [step00, step7, step7, step7, step7, step7, step7],
    ];
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const monthDays = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    const getWeekDay = (data, index, last) => {
        if (data && len === 7) {
            return weekDays[(new Date(data)).getDay()]
        }
        // if (data && len === 4) {
        if (data && index === 0) {
            const datt = new Date(data);
            return `${'      '}${datt.getDate()}.${datt.getMonth().toString().padStart(2, '0')}`;
        }
        if (data && index === last) {
            const datt = new Date(data);
            return `${datt.getDate()}.${datt.getMonth().toString().padStart(2, '0')}${'     '}`;
        }
        // if (data) {
        //     const datt = new Date(data);
        //     return monthDays[datt.getMonth()];
        // }
        return '';
    }

    useEffect(() => {
        const arrIntensity = [];
        const arrLabels = [];
        const arrDays = [];
        const index = Math.max(0, (Math.min(len, data.length) - 2));
        let j = 0;
        for (let i = Math.max(0, data.length - len); i < data.length; i++) {
            arrIntensity.push(Math.ceil(data[i].experience));
            arrDays.push(getWeekDay(data[i].data, j, index + 1));
            if (!hidden) {
                arrLabels.push(
                    <View key={`l${i}`} width={windowWidth*0.055} height={36} style={{ marginLeft: margins[index][j], alignItems: 'center' }}>
                        {data[i].count > 0
                            ? <Nocancel width={20} />
                            : <Cancel width={20} />}
                        {/* <Text style={{ fontSize: windowWidth * 0.03, marginTop: 3 }}>{weekDays[(new Date(data[i].data)).getDay()]}</Text> */}
                    </View>
                );
            }
            j++;
        }
        const text1 = `${data[Math.max(0, data.length - len)].experience}`
        const text2 = `${data[data.length - 1].experience}`

        setValueText1(text1);
        setValueText2(text2);
        setLabels(arrLabels);
        setDaysLabels(arrDays);
        setExperience(arrIntensity);
        // if (len <= 20 || data.length <= 20) setDaysLabels(arrDays);
    }, [])

    return (
        <View style={styles.container}>
        <View style={styles.container1}>
            <Text style={styles.intensityTitle}>Опыт</Text>
            <View style={Platform.OS == 'android' ?
            { flexDirection: 'row', justifyContent: 'flex-end', marginTop: -27, marginRight: 5, }
            :
            { flexDirection: 'row', justifyContent: 'flex-end', marginTop: -17, marginRight: 5, }}>
                <Text style={styles.intensityTitle1}>{valueText1}</Text>
                <Arrow style={{ width: 3, height: 3, alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
                <Text style={styles.intensityTitle1}>
                {valueText2}
                 </Text>
                </View>
            </View>
            <Image resizeMode='center' style={Platform.OS == 'android' ?
                { position: 'absolute', left:'2%',  top: -20, zIndex: 1, height: 285, width: '102%' }
                :
                {position: 'absolute', left:'5%',  top: -30, zIndex: 1, height: 280, width: '98%' }
            } source={Platform.OS == 'android' ? chartBG: chartBGIOS} />
            <LineChart
                withInnerLines={false}
                data={{
                    labels: days,
                    datasets: [
                        {
                            data: experience,
                            strokeWidth: 2 // optional
                        }
                    ],

                }}
                width={windowWidth * kk}
                // width={windowWidth} // from react-native
                height={175}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                withHorizontalLabels={false}
                withOuterLines={false}
                //   withVerticalLabels={false}
                style={{
                    marginTop: 18,
                    borderRadius: 16,
                    marginLeft: '-5%'
                    // zIndex:1
                }}
            />
            { hidden
                ? null
                :
                <View style={styles.cancel}>
                    {labels}
                </View>
            }
        </View>
    )
}

const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",

    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#2A80F1`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "2",
        strokeWidth: "1",
        stroke: "#2A80F1",
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // shadowColor: "#000",
        // shadowOffset: {
        //  width: 1000,
        //  height: 200,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 5,
    },
    container1:{
        width:'98%',
    },
    cancel: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: '2%',
        marginLeft: 8
    },
    intensityTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2A80F1",
        marginBottom: windowHeight * 0.01,
        marginHorizontal: windowWidth * 0.02,
        fontFamily: "Gilroy-Regular",
        marginLeft: '9%'
    },
    intensityTitle1: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2A80F1",
        fontFamily: "Gilroy-Regular",
    },

});
