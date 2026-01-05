import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

// ====== INITIAL DATA ======
const INITIAL_WORKOUTS = [
  { id: '1', title: 'Full Body Burn', time: '45 min', calories: '350', icon: 'fitness', color: '#FF6B6B', completed: false },
  { id: '2', title: 'Cardio Blast', time: '30 min', calories: '300', icon: 'speedometer', color: '#4ECDC4', completed: false },
  { id: '3', title: 'Strength Training', time: '60 min', calories: '450', icon: 'barbell', color: '#45B7D1', completed: false },
  { id: '4', title: 'Yoga Flow', time: '40 min', calories: '250', icon: 'body', color: '#96CEB4', completed: false },
];

const INITIAL_EXERCISES = [
  { id: '1', name: 'Push-ups', muscle: 'Chest', sets: '3x15', icon: 'body', color: '#FF6B6B', completed: false },
  { id: '2', name: 'Squats', muscle: 'Legs', sets: '4x12', icon: 'walk', color: '#4ECDC4', completed: false },
  { id: '3', name: 'Plank', muscle: 'Core', sets: '3x60s', icon: 'timer', color: '#45B7D1', completed: false },
  { id: '4', name: 'Lunges', muscle: 'Legs', sets: '3x10', icon: 'footsteps', color: '#96CEB4', completed: false },
  { id: '5', name: 'Burpees', muscle: 'Full Body', sets: '3x10', icon: 'flash', color: '#FFD166', completed: false },
];

const INITIAL_MEALS = [
  { 
    id: '1', 
    name: 'Breakfast', 
    time: '8:00 AM',
    calories: 505,
    icon: 'sunny',
    color: '#FFD166',
    items: ['Oatmeal with fruits', 'Greek Yogurt', 'Green Tea'],
    eaten: false
  },
  { 
    id: '2', 
    name: 'Lunch', 
    time: '1:00 PM',
    calories: 600,
    icon: 'restaurant',
    color: '#06D6A0',
    items: ['Grilled Chicken Breast', 'Brown Rice', 'Mixed Vegetables'],
    eaten: false
  },
  { 
    id: '3', 
    name: 'Dinner', 
    time: '7:00 PM',
    calories: 550,
    icon: 'moon',
    color: '#118AB2',
    items: ['Baked Salmon', 'Quinoa', 'Steamed Broccoli'],
    eaten: false
  },
  { 
    id: '4', 
    name: 'Snacks', 
    time: '3:00 PM',
    calories: 300,
    icon: 'nutrition',
    color: '#EF476F',
    items: ['Apple', 'Almonds', 'Protein Shake'],
    eaten: false
  },
];

// ====== SCREEN 1: WORKOUTS ======
function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const savedWorkouts = await AsyncStorage.getItem('@workouts');
      if (savedWorkouts) {
        setWorkouts(JSON.parse(savedWorkouts));
      } else {
        setWorkouts(INITIAL_WORKOUTS);
        await AsyncStorage.setItem('@workouts', JSON.stringify(INITIAL_WORKOUTS));
      }
    } catch (error) {
      console.error('Error loading workouts:', error);
      setWorkouts(INITIAL_WORKOUTS);
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkoutComplete = async (id) => {
    const updatedWorkouts = workouts.map(workout => 
      workout.id === id ? { ...workout, completed: !workout.completed } : workout
    );
    setWorkouts(updatedWorkouts);
    await AsyncStorage.setItem('@workouts', JSON.stringify(updatedWorkouts));
    
    Alert.alert(
      'Workout Status',
      `Workout marked as ${updatedWorkouts.find(w => w.id === id).completed ? 'completed' : 'incomplete'}!`,
      [{ text: 'OK' }]
    );
  };

  const resetWorkouts = async () => {
    Alert.alert(
      'Reset Workouts',
      'Are you sure you want to reset all workouts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            setWorkouts(INITIAL_WORKOUTS);
            await AsyncStorage.setItem('@workouts', JSON.stringify(INITIAL_WORKOUTS));
          },
          style: 'destructive'
        }
      ]
    );
  };

  const completedWorkouts = workouts.filter(w => w.completed).length;
  const totalCalories = workouts.reduce((sum, workout) => {
    return workout.completed ? sum + parseInt(workout.calories) : sum;
  }, 0);

  const renderWorkout = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: item.color }]}
      onPress={() => toggleWorkoutComplete(item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.cardDetails}>
            <View style={styles.detailItem}>
              <Icon name="time-outline" size={14} color="#666" />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="flame-outline" size={14} color="#666" />
              <Text style={styles.detailText}>{item.calories} cal</Text>
            </View>
          </View>
        </View>
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
          {item.completed && <Icon name="checkmark" size={16} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading workouts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout Plans</Text>
        <Text style={styles.headerSubtitle}>Complete your daily workouts</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedWorkouts}/{workouts.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalCalories}</Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {workouts.length > 0 ? Math.round((completedWorkouts / workouts.length) * 100) : 0}%
          </Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.resetButton} onPress={resetWorkouts}>
        <Icon name="refresh" size={20} color="#666" />
        <Text style={styles.resetButtonText}>Reset Workouts</Text>
      </TouchableOpacity>
    </View>
  );
}

// ====== SCREEN 2: EXERCISES ======
function ExercisesScreen() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const savedExercises = await AsyncStorage.getItem('@exercises');
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      } else {
        setExercises(INITIAL_EXERCISES);
        await AsyncStorage.setItem('@exercises', JSON.stringify(INITIAL_EXERCISES));
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      setExercises(INITIAL_EXERCISES);
    } finally {
      setLoading(false);
    }
  };

  const toggleExerciseComplete = async (id) => {
    const updatedExercises = exercises.map(exercise => 
      exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
    );
    setExercises(updatedExercises);
    await AsyncStorage.setItem('@exercises', JSON.stringify(updatedExercises));
  };

  const resetExercises = async () => {
    Alert.alert(
      'Reset Exercises',
      'Are you sure you want to reset all exercises?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            setExercises(INITIAL_EXERCISES);
            await AsyncStorage.setItem('@exercises', JSON.stringify(INITIAL_EXERCISES));
          },
          style: 'destructive'
        }
      ]
    );
  };

  const completedExercises = exercises.filter(e => e.completed).length;
  const totalExercises = exercises.length;

  const renderExercise = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: item.color }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, item.completed && styles.completedText]}>
            {item.name}
          </Text>
          <Text style={styles.cardSubtitle}>{item.muscle} • {item.sets}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.exerciseButton, item.completed && styles.exerciseButtonCompleted]}
          onPress={() => toggleExerciseComplete(item.id)}
        >
          <Icon 
            name={item.completed ? "checkmark-done" : "play"} 
            size={18} 
            color={item.completed ? "white" : "#2196F3"} 
          />
          <Text style={[styles.exerciseButtonText, item.completed && styles.exerciseButtonTextCompleted]}>
            {item.completed ? 'Done' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Exercises</Text>
        <Text style={styles.headerSubtitle}>Track your exercise progress</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedExercises}/{totalExercises} exercises completed
        </Text>
      </View>

      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.resetButton} onPress={resetExercises}>
        <Icon name="refresh" size={20} color="#666" />
        <Text style={styles.resetButtonText}>Reset Exercises</Text>
      </TouchableOpacity>
    </View>
  );
}

// ====== SCREEN 3: MEALS ======
function MealsScreen() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const savedMeals = await AsyncStorage.getItem('@meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      } else {
        setMeals(INITIAL_MEALS);
        await AsyncStorage.setItem('@meals', JSON.stringify(INITIAL_MEALS));
      }
    } catch (error) {
      console.error('Error loading meals:', error);
      setMeals(INITIAL_MEALS);
    } finally {
      setLoading(false);
    }
  };

  const toggleMealEaten = async (id) => {
    const updatedMeals = meals.map(meal => 
      meal.id === id ? { ...meal, eaten: !meal.eaten } : meal
    );
    setMeals(updatedMeals);
    await AsyncStorage.setItem('@meals', JSON.stringify(updatedMeals));
    
    const meal = updatedMeals.find(m => m.id === id);
    Alert.alert(
      'Meal Status',
      `${meal.name} marked as ${meal.eaten ? 'eaten' : 'not eaten'}!`,
      [{ text: 'OK' }]
    );
  };

  const resetMeals = async () => {
    Alert.alert(
      'Reset Meals',
      'Are you sure you want to reset all meals?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            setMeals(INITIAL_MEALS);
            await AsyncStorage.setItem('@meals', JSON.stringify(INITIAL_MEALS));
          },
          style: 'destructive'
        }
      ]
    );
  };

  const calculateStats = () => {
    const eatenMeals = meals.filter(m => m.eaten);
    const totalCalories = eatenMeals.reduce((sum, meal) => sum + meal.calories, 0);
    const remainingCalories = 2000 - totalCalories;
    
    return {
      eatenCount: eatenMeals.length,
      totalCalories,
      remainingCalories,
      progressPercentage: Math.min((totalCalories / 2000) * 100, 100)
    };
  };

  const stats = calculateStats();

  const renderMeal = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: item.color }]}>
      <View style={styles.mealHeader}>
        <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.mealInfo}>
          <Text style={styles.mealTitle}>{item.name}</Text>
          <Text style={styles.mealTime}>{item.time}</Text>
        </View>
        <View style={styles.calorieBadge}>
          <Text style={styles.calorieText}>{item.calories} cal</Text>
        </View>
      </View>

      <View style={styles.mealItems}>
        {item.items.map((food, index) => (
          <View key={index} style={styles.foodItem}>
            <View style={[styles.foodDot, { backgroundColor: item.color }]} />
            <Text style={styles.foodText}>{food}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.eatenButton, item.eaten && styles.eatenButtonActive]}
        onPress={() => toggleMealEaten(item.id)}
      >
        <Icon 
          name={item.eaten ? "checkmark-circle" : "checkmark-circle-outline"} 
          size={20} 
          color={item.eaten ? "white" : "#4CAF50"} 
        />
        <Text style={[styles.eatenButtonText, item.eaten && styles.eatenButtonTextActive]}>
          {item.eaten ? 'Eaten' : 'Mark as Eaten'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading meals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Meals</Text>
        <Text style={styles.headerSubtitle}>Track your nutrition intake</Text>
      </View>

      <View style={styles.calorieCard}>
        <Text style={styles.calorieGoal}>Daily Goal: 2000 cal</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${stats.progressPercentage}%` }]} />
          </View>
          <Text style={styles.calorieCount}>{stats.totalCalories} / 2000 cal</Text>
        </View>
        
        <View style={styles.calorieStats}>
          <View style={styles.calorieStat}>
            <Text style={styles.calorieStatValue}>{stats.totalCalories}</Text>
            <Text style={styles.calorieStatLabel}>Consumed</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.calorieStat}>
            <Text style={[
              styles.calorieStatValue, 
              stats.remainingCalories < 0 && { color: '#FF6B6B' }
            ]}>
              {stats.remainingCalories}
            </Text>
            <Text style={styles.calorieStatLabel}>Remaining</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.calorieStat}>
            <Text style={styles.calorieStatValue}>{stats.eatenCount}/{meals.length}</Text>
            <Text style={styles.calorieStatLabel}>Meals</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.resetButton} onPress={resetMeals}>
        <Icon name="refresh" size={20} color="#666" />
        <Text style={styles.resetButtonText}>Reset Meals</Text>
      </TouchableOpacity>
    </View>
  );
}

// ====== MAIN APP ======
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Workouts') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            } else if (route.name === 'Exercises') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Meals') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Exercises" component={ExercisesScreen} />
        <Tab.Screen name="Meals" component={MealsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ====== STYLES ======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardDetails: {
    flexDirection: 'row',
    marginTop: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  exerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  exerciseButtonCompleted: {
    backgroundColor: '#4CAF50',
  },
  exerciseButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginLeft: 5,
  },
  exerciseButtonTextCompleted: {
    color: 'white',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  calorieBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  calorieText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  mealItems: {
    marginVertical: 10,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  foodText: {
    fontSize: 15,
    color: '#555',
  },
  eatenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  eatenButtonActive: {
    backgroundColor: '#4CAF50',
  },
  eatenButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
  eatenButtonTextActive: {
    color: 'white',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  calorieCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  calorieGoal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  calorieCount: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginTop: 5,
  },
  calorieStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  calorieStat: {
    alignItems: 'center',
  },
  calorieStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calorieStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resetButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginLeft: 8,
  },
});