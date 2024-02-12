import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  add,
} from 'date-fns';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentAge, setCurrentAge] = useState(null);
  const [totalMonths, setTotalMonths] = useState(null);
  const [totalWeeks, setTotalWeeks] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);
  const [subscriptionToNextBirthday, setSubscriptionToNextBirthday] =
    useState(null);
  const [bornOnDay, setBornOnDay] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    hideDatePicker();
    setDob(selectedDate);
  };

  useEffect(() => {
    if (dob) {
      calculateAge();
      calculateTotalMonths();
      calculateTotalWeeks();
      calculateTotalDays();
      calculateTotalHours();
      calculateTotalMinutes();
      calculateTotalSeconds();
      calculateNextBirthday();
      calculateSubscriptionToNextBirthday();
      calculateBornOnDay();
    }
  }, [dob]);

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const ageDiff = differenceInMonths(today, birthDate) / 12;
    setCurrentAge(ageDiff);
  };

  const calculateTotalMonths = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const monthsDiff = differenceInMonths(today, birthDate);
    setTotalMonths(monthsDiff);
  };

  const calculateTotalWeeks = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const weeksDiff = differenceInWeeks(today, birthDate);
    setTotalWeeks(weeksDiff);
  };

  const calculateTotalDays = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const daysDiff = differenceInDays(today, birthDate);
    setTotalDays(daysDiff);
  };

  const calculateTotalHours = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const hoursDiff = differenceInHours(today, birthDate);
    setTotalHours(hoursDiff);
  };

  const calculateTotalMinutes = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const minutesDiff = differenceInMinutes(today, birthDate);
    setTotalMinutes(minutesDiff);
  };

  const calculateTotalSeconds = () => {
    const birthDate = new Date(dob);
    const today = new Date();

    const secondsDiff = differenceInSeconds(today, birthDate);
    setTotalSeconds(secondsDiff);
  };

  const calculateNextBirthday = () => {
    const today = new Date();
    const birthDate = new Date(dob);

    let nextBirthdayDate = add(
      new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()),
      {years: 1},
    );

    if (today > nextBirthdayDate) {
      nextBirthdayDate = add(
        new Date(
          today.getFullYear() + 1,
          birthDate.getMonth(),
          birthDate.getDate(),
        ),
        {years: 1},
      );
    }

    const daysLeft = differenceInDays(nextBirthdayDate, today);
    setNextBirthday(daysLeft);
  };

  const calculateSubscriptionToNextBirthday = () => {
    if (nextBirthday !== null) {
      const months = Math.floor(nextBirthday / 30);
      const days = nextBirthday % 30;

      setSubscriptionToNextBirthday(
        `${months} months and ${days} days until your next birthday`,
      );
    }
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
    setBornOnDay(bornDay);
  };

  return (
    <View>
      <Text>Enter your Date of Birth:</Text>
      <Button title="Pick a date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {currentAge !== null && (
        <Text>Your current age is: {currentAge.toFixed(2)} years</Text>
      )}
      {totalMonths !== null && (
        <Text>Your current age in total months is: {totalMonths} months</Text>
      )}
      {totalWeeks !== null && (
        <Text>Your current age in total weeks is: {totalWeeks} weeks</Text>
      )}
      {totalDays !== null && (
        <Text>Your current age in total days is: {totalDays} days</Text>
      )}
      {totalHours !== null && (
        <Text>Your current age in total hours is: {totalHours} hours</Text>
      )}
      {totalMinutes !== null && (
        <Text>
          Your current age in total minutes is: {totalMinutes} minutes
        </Text>
      )}
      {totalSeconds !== null && (
        <Text>
          Your current age in total seconds is: {totalSeconds} seconds
        </Text>
      )}
      {nextBirthday !== null && (
        <Text>Days until your next birthday: {nextBirthday} days</Text>
      )}
      {subscriptionToNextBirthday !== null && (
        <Text>Subscription to next birthday: {subscriptionToNextBirthday}</Text>
      )}
      {bornOnDay !== null && <Text>You were born on a {bornOnDay}</Text>}
    </View>
  );
};

export default AgeCalculator;
