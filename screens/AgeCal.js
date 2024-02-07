/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, Button, Modal} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, differenceInDays, differenceInMonths} from 'date-fns';

const BirthdayReminderApp = () => {
  const [isDobPickerVisible, setDobPickerVisibility] = useState(false);
  const [isCurrentDatePickerVisible, setCurrentDatePickerVisibility] =
    useState(false);
  const [dob, setDob] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentAge, setCurrentAge] = useState(null);
  const [daysUntilNextBirthday, setDaysUntilNextBirthday] = useState(null);
  const [monthsUntilNextBirthday, setMonthsUntilNextBirthday] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    if (dob && currentDate) {
      calculateAge();
      calculateDaysUntilNextBirthday();
      calculateMonthsUntilNextBirthday();
    }
  }, [dob, currentDate]);

  const showDobPicker = () => {
    setDobPickerVisibility(true);
  };

  const hideDobPicker = () => {
    setDobPickerVisibility(false);
  };

  const showCurrentDatePicker = () => {
    setCurrentDatePickerVisibility(true);
  };

  const hideCurrentDatePicker = () => {
    setCurrentDatePickerVisibility(false);
  };

  const handleDobConfirm = date => {
    hideDobPicker();
    setDob(date);
  };

  const handleCurrentDateConfirm = date => {
    hideCurrentDatePicker();
    setCurrentDate(date);
  };

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const today = new Date(currentDate);

    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayOccurred =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    const finalAge = hasBirthdayOccurred ? ageDiff : ageDiff - 1;
    setCurrentAge(finalAge);
  };

  const calculateDaysUntilNextBirthday = () => {
    const today = new Date(currentDate);
    const nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate(),
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilNext = differenceInDays(nextBirthday, today);
    setDaysUntilNextBirthday(daysUntilNext);
  };

  const calculateMonthsUntilNextBirthday = () => {
    const today = new Date(currentDate);
    const nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate(),
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const monthsUntilNext = differenceInMonths(nextBirthday, today);
    setMonthsUntilNextBirthday(monthsUntilNext);
  };

  const calculateBornOnDay = () => {
    const birthDate = new Date(dob);
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const bornDay = daysOfWeek[birthDate.getDay()];
    return bornDay;
  };

  const openDetailsModal = () => {
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 20}}>
          {dob
            ? `Date of Birth: ${format(dob, 'MMMM d, yyyy')}`
            : 'Select Date of Birth'}
        </Text>
        <Button title="Select Date of Birth" onPress={showDobPicker} />
        <DateTimePickerModal
          isVisible={isDobPickerVisible}
          mode="date"
          onConfirm={handleDobConfirm}
          onCancel={hideDobPicker}
        />
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 20}}>
          {currentDate
            ? `Current Date: ${format(currentDate, 'MMMM d, yyyy')}`
            : 'Select Current Date'}
        </Text>
        <Button title="Select Current Date" onPress={showCurrentDatePicker} />
        <DateTimePickerModal
          isVisible={isCurrentDatePickerVisible}
          mode="date"
          onConfirm={handleCurrentDateConfirm}
          onCancel={hideCurrentDatePicker}
        />
      </View>

      <Button
        title="Calculate Age"
        onPress={openDetailsModal}
        disabled={!dob || !currentDate}
      />

      <Modal
        visible={isDetailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDetailsModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{fontSize: 18, marginBottom: 10}}>
              Age Information:
            </Text>
            <Text style={{fontSize: 16}}>
              {`Your current age is: ${currentAge} years`}
            </Text>
            <Text style={{fontSize: 16}}>
              {`You were born on a ${calculateBornOnDay()}`}
            </Text>
            <Text style={{fontSize: 18, marginTop: 20}}>
              Next Birthday Countdown:
            </Text>
            <Text style={{fontSize: 16}}>
              {`Days until your next birthday: ${daysUntilNextBirthday} days`}
            </Text>
            <Text style={{fontSize: 16}}>
              {`Months and days until your next birthday: ${monthsUntilNextBirthday} months`}
            </Text>
            <Button title="Close" onPress={closeDetailsModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BirthdayReminderApp;
