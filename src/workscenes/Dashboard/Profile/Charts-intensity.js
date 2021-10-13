import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet,Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { defIntensity } from '../../../constants';
import Cancel from '../../../../assets/images/cancel.svg';
import Nocancel from '../../../../assets/images/nocancel.svg';
import chartBG from '../../../../assets/chartBG.png'
import chartBGIOS from '../../../../assets/chartBGIOS.png'
import { Platform } from 'react-native';

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

export function ChartsIntensity({ data, len, hidden, koe = 1 }) {

    const [intensity, setIntensity] = useState([1]);
    const [labels, setLabels] = useState([]);
    const [days, setDaysLabels] = useState([]);
    const [valueText, setValueText] = useState('');

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
            if (data && index === 0 ) {
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
        for ( let i = Math.max(0, data.length - len); i < data.length; i++) {
            arrIntensity.push(Math.min(100, Math.ceil(data[i].countTrue / ( defIntensity * koe) * 100)));
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
            j ++;
        }
        const text = `${Math.min(100, Math.ceil(data[data.length - 1].countTrue / (defIntensity * koe) * 100))}%`;
        setValueText(text);
        setLabels(arrLabels);
        setDaysLabels(arrDays);
        setIntensity(arrIntensity);
        // if (len <= 20 || data.length <= 20) setDaysLabels(arrDays);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.intensityTitle}>Интенсивность</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -27, marginRight: 5 }}>
                <Text style={styles.intensityTitle1}>{valueText}</Text>
            </View>
            <Image  resizeMode='center' style={Platform.OS == 'android' ?
                { position: 'absolute', left:'7%',  top: -27, zIndex: 1, height: 285, width: '94%' }
                :
                {position: 'absolute', left:'5%',  top: -30, zIndex: 1, height: 280, width: '98%' }
    
            }  source={Platform.OS == 'android' ? chartBG: chartBGIOS}/>
            <LineChart
                withInnerLines={false}
                data={{
                    labels: days,
                    datasets: [
                        {
                            data: intensity,
                            strokeWidth: 2 // optional
                        },
                        {
                            data: [0],
                            color: () => 'transparent'
                        },
                        {
                            data: [100],
                            color: () => 'transparent'
                        }                        
                    ],

                }}
                // segments={10}
                width={windowWidth * kk}
                // width={windowWidth}
                height={170}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                // yAxisSuffix='ytt'
                // yAxisSuffix='ebcfeu'
                // xAxisLabel='j'
                // withDots={false}
                // bezier
                // fillShadowGradientOpacity={0.1}
                hideLegend={true}
                withShadow={false}
                withOuterLines={false}
                // withVerticalLabels={false}
                withHorizontalLabels={false}
                style={{
                    marginTop: 18,
                    borderRadius: 16,
                    marginLeft: '-5%',
                    
                }}
            />
            {hidden
                ? null
                : <View style={styles.cancel}>
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
        r: "3",
        strokeWidth: "0",
        stroke: "#2A80F1",
    },
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
    },
    cancel: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth,
        alignItems: 'flex-start',
        marginBottom: '2%',
        marginTop: 10,
        marginLeft:8,
    },
    intensityTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2A80F1",
        marginBottom: windowHeight * 0.01,
        marginHorizontal: windowWidth * 0.04,
        fontFamily: "Gilroy-Regular",
        marginLeft: '9%'
    },
    intensityTitle1: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2A80F1",
        fontFamily: "Gilroy-Regular",
        // marginLeft:100
    }
});
