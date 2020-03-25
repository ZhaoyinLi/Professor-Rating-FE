import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScree from './components/screen/User/LoginScreen';
import SignUpScreen from './components/screen/User/SignupScreen';
import CommentScreen from './components/screen/CommentScreen';
import CourseScreen from './components/screen/CourseScreen';
import SavedScreen from './components/screen/SavedScreen';
import SearchResultScreen from './components/screen/SearchResultScreen';
import SearchScreen from './components/screen/SearchScreen';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScree },
  SignUp: { screen: SignUpScreen },
  Search: { screen: SearchScreen },
  Result: { screen: SearchResultScreen },
  Course: { screen: CourseScreen },
  Comment: { screen: CommentScreen },
  Saved: { screen: SavedScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
