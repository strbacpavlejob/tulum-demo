import { Tabs } from 'expo-router';
import { Heart, MessageCircle, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
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
          tabBarIcon: ({ size, focused }) => (
            <Heart
              size={size}
              color="#000"
              fill={focused ? '#cebdff' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ size, focused }) => (
            <MessageCircle
              size={size}
              color="#000"
              fill={focused ? '#cebdff' : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, focused }) => (
            <User
              size={size}
              color="#000"
              fill={focused ? '#cebdff' : 'transparent'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
