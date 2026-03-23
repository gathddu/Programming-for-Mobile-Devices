import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FormInput } from '../components/FormInput';
import { FormPicker } from '../components/FormPicker';
import { FormSlider } from '../components/FormSlider';
import { FormSwitch } from '../components/FormSwitch';
import { useForm } from '../hooks/useForm';

const GENRE_OPTIONS = [
  { label: 'Action', value: 'Action' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Thriller', value: 'Thriller' },
  { label: 'Horror', value: 'Horror' },
  { label: 'Romance', value: 'Romance' },
];

const RATING_OPTIONS = [
  { label: 'G', value: 'G' },
  { label: 'PG', value: 'PG' },
  { label: 'PG-13', value: 'PG-13' },
  { label: 'R', value: 'R' },
  { label: 'NC-17', value: 'NC-17' },
];

export const FormScreen: React.FC = () => {
  const { formState, updateField, reset } = useForm();

  const handleSubmit = (): void => {
    if (!formState.title || !formState.name || !formState.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      `Form submitted!\n\nTitle: ${formState.title}\nName: ${formState.name}\nEmail: ${formState.email}\nGenre: ${formState.genre}\nQuality: ${Math.round(formState.quality)}\nIn Production: ${formState.inProduction}`,
      [{ text: 'OK', onPress: reset }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 Film Project</Text>
        <Text style={styles.headerSubtitle}>Submit your project details</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Project Information</Text>

        <FormInput
          label="Project Title"
          value={formState.title}
          onChangeText={(text) => updateField('title', text)}
          placeholder="Enter project title"
        />

        <FormInput
          label="Director Name"
          value={formState.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Enter director name"
        />

        <FormInput
          label="Email"
          value={formState.email}
          onChangeText={(text) => updateField('email', text)}
          placeholder="Enter email address"
        />

        <FormInput
          label="Phone"
          value={formState.phone}
          onChangeText={(text) => updateField('phone', text)}
          placeholder="Enter phone number"
        />

        <Text style={styles.sectionTitle}>Project Details</Text>

        <FormPicker
          label="Genre"
          value={formState.genre}
          onValueChange={(value) => updateField('genre', value)}
          options={GENRE_OPTIONS}
        />

        <FormPicker
          label="Rating"
          value={formState.rating}
          onValueChange={(value) => updateField('rating', value)}
          options={RATING_OPTIONS}
        />

        <FormSlider
          label="Quality"
          value={formState.quality}
          onValueChange={(value) => updateField('quality', value)}
          min={0}
          max={100}
        />

        <FormSlider
          label="Budget (Millions)"
          value={formState.budget}
          onValueChange={(value) => updateField('budget', value)}
          min={0}
          max={500}
        />

        <Text style={styles.sectionTitle}>Status</Text>

        <FormSwitch
          label="In Production"
          value={formState.inProduction}
          onValueChange={(value) => updateField('inProduction', value)}
        />

        <FormSwitch
          label="Already Released"
          value={formState.released}
          onValueChange={(value) => updateField('released', value)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
});
