import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, List} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {differenceInDays, add, differenceInMonths, format} from 'date-fns';

const AgeDetailsScreen = ({route}) => {
  const {birthDate} = route.params;
  const [ageDetails, setAgeDetails] = useState([]);
  const [nextBirthdayDetails, setNextBirthdayDetails] = useState([]);

  const calculateAgeDetails = () => {
    if (!birthDate) {
      alert('Please select your birthdate.');
      return;
    }

    const today = new Date();
    const birthday = new Date(birthDate);
    const nextBirthday = add(birthday, {
      years: today.getFullYear() - birthday.getFullYear(),
    });

    const calculateTimeUnit = (timeUnit, divisor) =>
      differenceInDays(today, birthday) / divisor;

    const ageDetailsArray = [
      {
        title: 'Age (in years)',
        value: `${calculateTimeUnit('years', 365).toFixed(0)} years`,
      },
      {
        title: 'Months',
        value: `${differenceInMonths(today, birthday).toFixed(0)} months`,
      },
      {
        title: 'Weeks',
        value: `${calculateTimeUnit('weeks', 7).toFixed(0)} weeks`,
      },
      {title: 'Days', value: differenceInDays(today, birthday).toFixed(0)},
      {title: 'Hours', value: calculateTimeUnit('hours', 1).toFixed(0)},
      {title: 'Minutes', value: calculateTimeUnit('minutes', 60).toFixed(0)},
      {title: 'Seconds', value: calculateTimeUnit('seconds', 3600).toFixed(0)},
    ];

    const nextBirthdayDetailsArray = [
      {
        title: 'Days until next birthday',
        value: `${differenceInDays(nextBirthday, today)} days`,
      },
      {
        title: 'Months until next birthday',
        value: `${differenceInMonths(nextBirthday, today).toFixed(0)} months`,
      },
      {
        title: 'Weeks until next birthday',
        value: `${calculateTimeUnit('weeks', 7).toFixed(0)} weeks`,
      },
      {title: 'Day of the Week', value: format(birthday, 'EEEE')},
      {title: 'Day of Next Birthday', value: format(nextBirthday, 'EEEE')},
      {title: 'Next Birthday Date', value: format(nextBirthday, 'yyyy-MM-dd')},
    ];

    setAgeDetails(ageDetailsArray);
    setNextBirthdayDetails(nextBirthdayDetailsArray);
  };

  useEffect(() => {
    calculateAgeDetails();
  }, [birthDate]);

  const renderListItems = details =>
    details.map((item, index) => (
      <List.Item
        key={index}
        title={item.title}
        description={item.value}
        left={() => <List.Icon icon="chevron-right" />}
      />
    ));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Your Age" />
          <Card.Content>
            <List.Section>{renderListItems(ageDetails)}</List.Section>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Next Birthday" />
          <Card.Content>
            <List.Section>{renderListItems(nextBirthdayDetails)}</List.Section>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
});

export default AgeDetailsScreen;
