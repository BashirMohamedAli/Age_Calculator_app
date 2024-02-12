import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns';
import {COLORS} from '../constants/theme';
import Lottie from 'lottie-react-native';

const AgeCal = () => {
  const [isDobPickerVisible, setDobPickerVisibility] = useState(false);
  const [isCurrentDatePickerVisible, setCurrentDatePickerVisibility] =
    useState(false);
  const [dob, setDob] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentAge, setCurrentAge] = useState(null);
  const [daysUntilNextBirthday, setDaysUntilNextBirthday] = useState(null);
  const [monthsUntilNextBirthday, setMonthsUntilNextBirthday] = useState(null);
  const [weeksUntilNextBirthday, setWeeksUntilNextBirthday] = useState(null);
  const [nextBirthdayDay, setNextBirthdayDay] = useState(null);
  const [additionalDays, setAdditionalDays] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    if (dob) {
      calculateAge();
      calculateDaysUntilNextBirthday();
      calculateMonthsUntilNextBirthday();
      calculateWeeksUntilNextBirthday();
      calculateNextBirthdayDay();
      calculateAdditionalDays();
    }
  }, [dob]);

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

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setCurrentAge(age);
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

  const calculateWeeksUntilNextBirthday = () => {
    const today = new Date(currentDate);
    const nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate(),
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const weeksUntilNext = differenceInWeeks(nextBirthday, today);
    setWeeksUntilNextBirthday(weeksUntilNext);
  };

  const calculateNextBirthdayDay = () => {
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      dob.getMonth(),
      dob.getDate(),
    );
    const dayOfWeek = nextBirthday.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    setNextBirthdayDay(dayOfWeek);
  };

  const calculateAdditionalDays = () => {
    const today = new Date(currentDate);
    const nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate(),
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const additionalDaysCount = differenceInDays(nextBirthday, today);
    setAdditionalDays(additionalDaysCount);
  };

  const openDetailsModal = () => {
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Lottie
          source={require('../assets/logo3.json')}
          autoPlay
          loop
          resizeMode="cover"
          style={{width: 150, height: 150}}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity onPress={showDobPicker}>
          <Text style={styles.dateText}>
            {dob ? format(dob, 'MMMM d, yyyy') : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDobPickerVisible}
          mode="date"
          onConfirm={handleDobConfirm}
          onCancel={hideDobPicker}
        />
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Current Date:</Text>
        <TouchableOpacity onPress={showCurrentDatePicker}>
          <Text style={styles.dateText}>
            {format(currentDate, 'MMMM d, yyyy')}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isCurrentDatePickerVisible}
          mode="date"
          onConfirm={handleCurrentDateConfirm}
          onCancel={hideCurrentDatePicker}
        />
      </View>

      <TouchableOpacity
        style={[styles.calculateAgeButton, !dob && styles.disabledButton]}
        onPress={openDetailsModal}
        disabled={!dob}>
        <Text style={[styles.buttonText, !dob && styles.disabledButtonText]}>
          Calculate Age
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isDetailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDetailsModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Age Information:</Text>
            <Text
              style={
                styles.modalText
              }>{`Your current age is: ${currentAge} years`}</Text>
            <Text
              style={
                styles.modalText
              }>{`Days until your next birthday: ${daysUntilNextBirthday} days`}</Text>
            <Text
              style={
                styles.modalText
              }>{`Months until your next birthday: ${monthsUntilNextBirthday} months`}</Text>
            <Text
              style={
                styles.modalText
              }>{`Weeks until your next birthday: ${weeksUntilNextBirthday} weeks`}</Text>
            <Text
              style={
                styles.modalText
              }>{`Your next birthday is on a ${nextBirthdayDay}`}</Text>
            <Text
              style={
                styles.modalText
              }>{`Additional days until your next birthday: ${additionalDays} days`}</Text>
            <Button title="Close" onPress={closeDetailsModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logo: {
    alignItems: 'center',
    marginTop: 40,
  },
  datePickerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.white,
    marginHorizontal: 15,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.white,
    marginHorizontal: 15,
  },
  calculateAgeButton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 100,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: COLORS.secondary,
    color: COLORS.primary,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.white,
    alignItems: 'center',
    textAlign: 'center',
  },
  disabledButtonText: {
    flex: 1,
    fontSize: 18,
    backgroundColor: COLORS.secondary,
    color: COLORS.primary,
    alignItems: 'center',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AgeCal;
