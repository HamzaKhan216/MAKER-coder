import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

const SettingsScreen = () => {
  // --- State for basic settings ---
  const [storeName, setStoreName] = useState('My Awesome Store'); // Default value
  const [currency, setCurrency] = useState('USD'); // Default value

  // --- Placeholder functions for data management --- 
  const handleExportProducts = () => {
    // In a real application, this would trigger a data export process
    // e.g., fetching product data, formatting as CSV, and saving to device storage.
    Alert.alert('Export Products', 'Exporting products to CSV... (Not implemented yet)');
    console.log('Export Products (CSV) initiated.');
    // Example: call an export utility
    // exportProductsToCSV();
  };

  const handleBackupAllData = () => {
    // In a real application, this would fetch all relevant app data,
    // serialize it to JSON, and save it to device storage or a cloud service.
    Alert.alert('Backup Data', 'Backing up all data to JSON... (Not implemented yet)');
    console.log('Backup All Data (JSON) initiated.');
    // Example: call a backup utility
    // backupAllDataToJson();
  };

  const handleImportFromJson = () => {
    // In a real application, this would typically open a file picker
    // to allow the user to select a JSON file, then parse and import its data.
    Alert.alert(
      'Import Data',
      'This would open a file picker to import data from a JSON file. (Not implemented yet)'
    );
    console.log('Import from JSON initiated.');
    // Example: call an import utility
    // importDataFromJsonFile();
  };

  const _performClearAllData = () => {
    // This function would contain the actual logic to clear all app data.
    // Be extremely cautious with this in a real app!
    console.log('All data has been cleared!');
    Alert.alert('Data Cleared', 'All application data has been successfully cleared.');
    // Example: call a data reset utility
    // clearAllAppData();
    // Reset local state if necessary
    setStoreName('My Awesome Store');
    setCurrency('USD');
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear ALL application data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Clear All Data cancelled.'),
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: _performClearAllData,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>App Settings</Text>

      {/* --- Basic Settings Form --- */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Basic Information</Text>

        <Text style={styles.label}>Store Name:</Text>
        <TextInput
          style={styles.input}
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter store name"
          autoCapitalize="words"
          returnKeyType="done"
        />

        <Text style={styles.label}>Currency:</Text>
        <TextInput
          style={styles.input}
          value={currency}
          onChangeText={setCurrency}
          placeholder="e.g., USD, EUR, GBP"
          autoCapitalize="characters"
          maxLength={3}
          returnKeyType="done"
        />
        {/* Potentially a picker for currency for a better UX */}
      </View>

      {/* --- Data Management Section --- */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Data Management</Text>

        <TouchableOpacity style={styles.button} onPress={handleExportProducts}>
          <Text style={styles.buttonText}>Export Products (CSV)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleBackupAllData}>
          <Text style={styles.buttonText}>Backup All Data (JSON)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleImportFromJson}>
          <Text style={styles.buttonText}>Import from JSON</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearAllData}>
          <Text style={styles.clearButtonText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }} /> {/* Spacer for bottom content */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fefefe',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#dc3545', // Danger color for clear data
    marginTop: 20,
    shadowColor: '#dc3545',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingsScreen;
