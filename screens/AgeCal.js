import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const BirthdateScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = date => {
    setBirthDate(date);
    hideDatePicker();
    navigation.navigate('AgeDetailsScreen', {birthDate: date});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Age Calculator</Text>
      <Button title="Select Birthdate" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default BirthdateScreen;
