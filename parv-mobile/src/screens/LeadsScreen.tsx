import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/Colors';
import { Search, Filter, Plus } from 'lucide-react-native';

export default function LeadsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color={Colors.textMuted} />
        <Text style={styles.searchText}>Search leads...</Text>
        <Filter size={20} color={Colors.accent} />
      </View>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No leads assigned yet.</Text>
      </View>
      <TouchableOpacity style={styles.fab}>
        <Plus color={Colors.white} size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  searchText: { flex: 1, marginLeft: 12, color: Colors.textMuted },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: Colors.accent,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
