import { Tabs } from 'expo-router';
import { Flame, MessageCircle, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontWeight: '800',
          textTransform: 'uppercase',
          fontSize: 10,
        },
        tabBarStyle: {
          backgroundColor: '#FFF9C4',
          borderTopWidth: 3,
          borderTopColor: '#000',
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ size, color }) => <Flame size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
