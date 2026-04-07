import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { Colors } from '../theme/Colors';
import { LogOut, User, Bell, Shield, HelpCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.full_name?.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user?.full_name}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <User size={20} color={Colors.textMuted} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Bell size={20} color={Colors.textMuted} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Shield size={20} color={Colors.textMuted} />
          <Text style={styles.menuText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <HelpCircle size={20} color={Colors.textMuted} />
          <Text style={styles.menuText}>Get Help</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <LogOut size={20} color={Colors.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { alignItems: 'center', padding: 40, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.accent + '20', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 32, fontWeight: '800', color: Colors.accent },
  name: { fontSize: 24, fontWeight: '700', color: Colors.text },
  role: { fontSize: 16, color: Colors.textMuted, marginTop: 4 },
  section: { backgroundColor: Colors.white, marginTop: 24, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuText: { fontSize: 16, color: Colors.text, marginLeft: 16 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 40 },
  logoutText: { fontSize: 16, fontWeight: '700', color: Colors.error, marginLeft: 12 },
});
