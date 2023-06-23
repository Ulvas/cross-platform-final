import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import ProductsScreen from './screens/ProductsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import OrdersScreen from './screens/OrdersScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Products') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Categories') {
            iconName = 'list';
          } else if (route.name === 'Orders') {
            iconName = 'receipt';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      screenOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      {/* <Stack.Navigator>
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
