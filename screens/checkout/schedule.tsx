import { ICON_LEFT, ICON_RIGHT } from '@/assets/iconos/index';
import { ButtonBottom } from '@/components/atoms/button-bottom';
import { Select } from '@/components/atoms/select';
import { Titles } from '@/components/atoms/titles';
import { Screen } from '@/components/templates/screen';
import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_14_500_21, F1_15_400_16, F1_15_500_22, F1_17_500_25, F1_17_600_25, F1_20_600_24, F1_25_700_24, FONT_SIZE_16 } from '@/styles/typography';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDaysInMonth, getFirstDayOfMonth, MONTHS, WEEK_DAYS } from '@/utils/date-utils';
import { firstTwoLettersUpper, removeAccents } from '@/utils/string-utils';
import { VERDE_CLARO } from '@/styles/colors';

const TITLE = 'Programar mi pedido';
const SUBTITLE = 'Definir fecha y rango horario';
const TIME_TITLE = 'Seleccionar horario:';
const NOTE = 'Asegurase de estar presente al momento de recibir la entrega.';
const BUTTON_BOTTOM_TITLE = 'Confirmar';
const ITEMS = [
  { label: "8:00 AM - 10:00 AM", value: "8:00 AM - 10:00 AM" },
  { label: "10:00 AM - 12:00 PM", value: "10:00 AM - 12:00 PM" },
  { label: "12:00 PM - 2:00 PM", value: "12:00 PM - 2:00 PM" },
  { label: "2:00 PM - 4:00 PM", value: "2:00 PM - 4:00 PM" },
  { label: "4:00 PM - 6:00 PM", value: "4:00 PM - 6:00 PM" },
  { label: "6:00 PM - 8:00 PM", value: "6:00 PM - 8:00 PM" },
  { label: "8:00 PM - 10:00 PM", value: "8:00 PM - 10:00 PM" },
];

const actualDate = Date.now();
const actualYear = new Date(actualDate).getFullYear();
const actualMonth = new Date(actualDate).getMonth() + 1;
const actualDay = new Date(actualDate).getDate();

export default function Schedule({ onChange }) {
  const [month, setMonth] = useState(actualMonth);
  const [year, setYear] = useState(actualYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const onlySelectSixDates = (value) => {
    const day = parseInt(value);
    return (day <= (actualDay + 6) && day >= actualDay)
  }

  const monthLength = getDaysInMonth(month, year);

  const dates = Array.from({ length: monthLength }, (_, i) =>
    (i + 1).toString()
  );

  const firstDayOfMonth = getFirstDayOfMonth(month, year);

  const monthName = MONTHS[month - 1];

  const emptyDays = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => '');

  const allDates = [...emptyDays, ...dates];

  const handleBefore = () => {
    // setMonth(month + 1);
  }
  const handleNext = () => {
    // setMonth(month - 1);
  }
  const handleSelectItem = day => {
    if (day) setSelectedDate(day);
  };
  const handleSelectTime = time => {
    setSelectedTime(time);
  };
  const handleConfirm = () => {
    onChange(`${selectedDate} de ${monthName}, ${selectedTime}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.date,
        item && { backgroundColor: '#D9D9D9' },
        onlySelectSixDates(item) && { backgroundColor: 'white', borderColor: '#DCDCDC' },
        item && selectedDate === item && styles.selectedDate,
      ]}
      onPress={() => handleSelectItem(item)}>
      <Text
        style={
          selectedDate === item ? styles.selectedDateText : styles.dateText
        }
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (<>

    <Screen title='Schedule' >

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >

        <Titles title={TITLE} subTitle={SUBTITLE} style={TitlesStyles} />

        <View style={styles.calendar}>

          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={handleBefore}>
              <Image source={ICON_LEFT} style={styles.iconArrow} />
            </TouchableOpacity>
            <Text style={styles.month}>{monthName}</Text>
            <TouchableOpacity onPress={handleNext}>
              <Image source={ICON_RIGHT} style={styles.iconArrow} />
            </TouchableOpacity>
            <Text style={styles.month}>{year}</Text>
          </View>

          <View style={styles.weekDays}>
            {WEEK_DAYS.map(day => (
              <Text key={day} style={styles.dayLabel}>
                {removeAccents(firstTwoLettersUpper(day))}
              </Text>
            ))}
          </View>

          <FlatList
            data={allDates}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            numColumns={7}
            // scrollEnabled={false}
            contentContainerStyle={styles.dates}
          />
        </View>

        <Text style={styles.timeTitle}>{TIME_TITLE}</Text>

        <View style={styles.selectorContainer}>
          <Select
            items={ITEMS}
            placeholder="Seleccionar rango horario"
            onChange={handleSelectTime}
          />
        </View>

        <Text style={styles.note}>{NOTE}</Text>

        <View style={{ marginBottom: scaleVertical(30) }} >
          <ButtonBottom text={BUTTON_BOTTOM_TITLE} onPress={handleConfirm} />
        </View>

      </ScrollView>

    </Screen>
  </>);
}

const styles = StyleSheet.create({
  container: {
    marginTop: scaleVertical(20),
  },
  // header: {
  //   fontSize: scale(24),
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: scale(10),
  // },
  // subHeader: {
  //   fontSize: scale(16),
  //   color: 'green',
  //   textAlign: 'center',
  //   marginBottom: scale(20),
  // },
  calendar: {
    // padding: scaleModerate(10),
    width: '100%',
    marginBottom: scaleVertical(20),
    justifyContent:'center',
    alignItems:'center',//backgroundColor:'red'
  },
  monthSelector: {
    flexDirection: 'row',
    alignSelf:'flex-start',
    alignItems: 'center',
    gap: scaleHorizontal(5),
    marginBottom: scaleVertical(10),
  },
  iconArrow: {
    width: scaleHorizontal(22),
    height: scaleVertical(16),
  },
  month: {
    ...F1_17_600_25,
  },
  weekDays: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scaleVertical(10),
  },
  dayLabel: {
    ...F1_17_500_25,
    width: scaleHorizontal(45),
    textAlign: 'center',
    marginHorizontal: scaleHorizontal(5),
  },
  dates: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleHorizontal(5),
  },
  date: {
    height: scaleVertical(45),
    width: scaleHorizontal(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleModerate(5),
    marginHorizontal: scaleHorizontal(5),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateText: {
    ...F1_15_500_22,
    color: '#717171',
  },
  selectedDate: {
    borderColor: '#49C98B',
    backgroundColor: 'white',
  },
  selectedDateText: {
    color: '#717171',
  },
  timeTitle: {
    ...F1_15_500_22,
    color: '#717171',
    marginBottom: scaleVertical(10),
  },
  selectorContainer: {
    marginBottom: scaleVertical(20),
  },
  selector: {
    ...F1_15_400_16,
    color: '#ADADAD',
    backgroundColor: '#F1F1F1',
    height: scaleVertical(48),
    borderRadius: scaleModerate(8),
  },
  note: {
    ...F1_14_500_21,
    marginBottom: scaleVertical(40),
    color: '#5B5B5B',
  },
});

const TitlesStyles = StyleSheet.create({
  container: {
    marginTop: scaleVertical(20),
    marginBottom: scaleVertical(10)
  },
  titleText: {
    ...F1_25_700_24,
  },
  subTitleText: {
    ...F1_20_600_24,
    fontSize: FONT_SIZE_16,
    color: VERDE_CLARO
  },
});