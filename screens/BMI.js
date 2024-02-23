// HomeScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Card} from 'react-native-elements';
import {LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';

const HomeScreen = () => {
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
  const [history, setHistory] = useState([]);
  const [timeUnit, setTimeUnit] = useState('day');

  const calculateBMI = () => {
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(2);
    setBmiResult(bmi);

    if (bmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmi >= 18.5 && bmi <= 26.3) {
      setBmiCategory('Normal Weight');
    } else if (bmi >= 26.4 && bmi <= 29.7) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }

    setHistory([
      ...history,
      {
        weight,
        height: heightCm,
        gender,
        age,
        bmi,
        category: bmiCategory,
        date: new Date(),
      },
    ]);
  };

  const groupDataByTime = (timeUnit, type) => {
    const groupedData = history.reduce((acc, entry) => {
      const key =
        timeUnit === 'day'
          ? entry.date.getDate()
          : timeUnit === 'week'
          ? Math.ceil(entry.date.getDate() / 7)
          : timeUnit === 'month'
          ? entry.date.getMonth() + 1
          : timeUnit === 'year'
          ? entry.date.getFullYear()
          : '';
      if (!acc[key]) {
        acc[key] = {bmi: [], weight: []};
      }
      acc[key].bmi.push(parseFloat(entry.bmi));
      acc[key].weight.push(parseFloat(entry.weight));
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const datasets =
      type === 'bmi'
        ? Object.values(groupedData).map(data => ({
            data: data.bmi,
            color: () => `rgba(0, 0, 255, 1)`,
            strokeWidth: 2,
          }))
        : Object.values(groupedData).map(data => ({
            data: data.weight,
            color: () => `rgba(255, 0, 0, 1)`,
            strokeWidth: 2,
          }));

    return {labels, datasets};
  };

  const bmiChartData = groupDataByTime(timeUnit, 'bmi');
  const weightChartData = groupDataByTime(timeUnit, 'weight');

  const renderTooltip = (value, unit) => {
    ToastAndroid.showWithGravityAndOffset(
      `${unit}: ${value}`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleChartPress = (event, type) => {
    if (event.nativeEvent.location) {
      const {x} = event.nativeEvent.location;
      const index = Math.floor(
        x /
          (300 /
            (type === 'bmi'
              ? bmiChartData.labels.length
              : weightChartData.labels.length)),
      );
      const selectedData =
        type === 'bmi'
          ? bmiChartData.labels[index]
          : weightChartData.labels[index];
      const value =
        type === 'bmi'
          ? bmiChartData.datasets[0].data[index]
          : weightChartData.datasets[0].data[index];
      const unit = type === 'bmi' ? 'BMI' : 'Weight';
      renderTooltip(`${unit}: ${value}`, selectedData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={text => setWeight(text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          value={heightCm}
          onChangeText={text => setHeightCm(text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Gender:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
          keyboardType="numeric"
        />
        <Button title="Calculate BMI" onPress={calculateBMI} />
        {bmiResult && (
          <View>
            <Text style={styles.result}>Your BMI: {bmiResult}</Text>
            <Text style={styles.result}>Category: {bmiCategory}</Text>
          </View>
        )}
      </Card>

      {history.length > 0 && (
        <Card containerStyle={styles.card}>
          <Text style={styles.label}>History:</Text>
          {history.map((entry, index) => (
            <View key={index}>
              <Text style={styles.historyEntry}>{`Entry ${index + 1}: Weight ${
                entry.weight
              }kg, Height ${entry.height}cm, Gender ${entry.gender}, Age ${
                entry.age
              }, BMI ${entry.bmi}, Category ${entry.category}, Date ${
                entry.date.toISOString().split('T')[0]
              }`}</Text>
            </View>
          ))}
        </Card>
      )}

      {history.length > 1 && (
        <View>
          <Card containerStyle={styles.card}>
            <Text style={styles.label}>BMI Analytics:</Text>
            <Picker
              style={styles.picker}
              selectedValue={timeUnit}
              onValueChange={itemValue => setTimeUnit(itemValue)}>
              <Picker.Item label="Day" value="day" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Month" value="month" />
              <Picker.Item label="Year" value="year" />
            </Picker>
            <TouchableOpacity onPress={event => handleChartPress(event, 'bmi')}>
              <LineChart
                data={{
                  labels: bmiChartData.labels,
                  datasets: bmiChartData.datasets,
                }}
                width={300}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </TouchableOpacity>
          </Card>

          <Card containerStyle={styles.card}>
            <Text style={styles.label}>Weight Analytics:</Text>
            <Picker
              style={styles.picker}
              selectedValue={timeUnit}
              onValueChange={itemValue => setTimeUnit(itemValue)}>
              <Picker.Item label="Day" value="day" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Month" value="month" />
              <Picker.Item label="Year" value="year" />
            </Picker>
            <TouchableOpacity
              onPress={event => handleChartPress(event, 'weight')}>
              <LineChart
                data={{
                  labels: weightChartData.labels,
                  datasets: weightChartData.datasets,
                }}
                width={300}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </TouchableOpacity>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 10,
  },
  historyEntry: {
    fontSize: 14,
    marginBottom: 5,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
