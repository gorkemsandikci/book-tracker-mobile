import 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const applyFullHeight = (node) => {
    if (!node) return;
    node.style.height = '100%';
    node.style.maxHeight = '100%';
    node.style.overflow = 'hidden';
  };

  applyFullHeight(document.documentElement);
  applyFullHeight(document.body);
  document.body.style.margin = '0';

  const lockRoot = () => applyFullHeight(document.getElementById('root'));
  lockRoot();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lockRoot);
  }
}

registerRootComponent(App);
