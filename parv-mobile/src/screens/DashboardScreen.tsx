import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '../store/authStore';
import { Colors } from '../theme/Colors';
import {
  TrendingUp,
  Users,
  FileText,
  IndianRupee,
  ChevronRight,
  ArrowUpRight,
  Activity,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, icon: Icon, color, bg }: any) => (
  <View style={[styles.statCard, { backgroundColor: bg || Colors.white }]}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={20} color={color} />
      </View>
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const fmt = (v = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);

export default function DashboardScreen() {
  const { stats, isLoading, fetchStats } = useDashboardStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchStats();
  }, []);

  if (isLoading && !stats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  const chartData = {
    labels: stats?.monthly.map((m) => m.month.substring(0, 3)) || [],
    datasets: [
      {
        data: stats?.monthly.map((m) => m.amount / 100000) || [0],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, {user?.full_name?.split(' ')[0]}</Text>
        <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Total Disbursed"
          value={fmt(stats?.totalAmount)}
          icon={IndianRupee}
          color={Colors.success}
        />
        <StatCard
          title="Applications"
          value={stats?.totalApplications || 0}
          icon={FileText}
          color={Colors.accent}
        />
        <StatCard
          title="Total Leads"
          value={stats?.leads?.total || 0}
          icon={TrendingUp}
          color="#8B5CF6"
        />
        <StatCard
          title="Team Size"
          value={stats?.users?.total || 0}
          icon={Users}
          color="#F59E0B"
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Disbursement Trend (Lakhs)</Text>
          <TrendingUp size={20} color={Colors.textMuted} />
        </View>
        <View style={styles.chartContainer}>
          {stats?.monthly && (
            <LineChart
              data={chartData}
              width={width - 32}
              height={220}
              chartConfig={{
                backgroundColor: Colors.white,
                backgroundGradientFrom: Colors.white,
                backgroundGradientTo: Colors.white,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: '4', strokeWidth: '2', stroke: Colors.accent },
              }}
              bezier
              style={styles.chart}
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Applications</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listCard}>
          {stats?.recentApplications.map((app, index) => (
            <TouchableOpacity 
              key={app.id} 
              style={[styles.listItem, index === stats.recentApplications.length - 1 && styles.lastItem]}
            >
              <View style={styles.itemMain}>
                <View style={styles.itemInfo}>
                  <Text style={styles.applicantName}>{app.applicantName}</Text>
                  <Text style={styles.loanInfo}>{app.loanType} • {app.loanId}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.amount}>{fmt(app.loanAmount)}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(app.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(app.status) }]}>{app.status}</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved': return Colors.success;
    case 'pending': return Colors.warning;
    case 'rejected': return Colors.error;
    default: return Colors.accent;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    width: '60%',
  },
  iconContainer: {
    padding: 6,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent,
  },
  chartContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  listCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  loanInfo: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
