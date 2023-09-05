import { AppRegistry } from 'react-native';
import AppNavigator from './AppNavigator';  // AppNavigator를 직접 임포트
import { name as appName } from './app.json';

// 이름 변경 (MainApp 대신 다른 이름도 가능)
export default function MainApp() {
  return <AppNavigator />;
}

AppRegistry.registerComponent(appName, () => MainApp);
