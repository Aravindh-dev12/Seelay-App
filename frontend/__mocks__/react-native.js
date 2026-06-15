const React = require('react');

function makeComponent(name) {
  return function Component(props) { return React.createElement(name, props, props.children); };
}

module.exports = {
  View: makeComponent('View'),
  Text: makeComponent('Text'),
  TouchableOpacity: makeComponent('TouchableOpacity'),
  TextInput: makeComponent('TextInput'),
  FlatList: makeComponent('FlatList'),
  ScrollView: makeComponent('ScrollView'),
  KeyboardAvoidingView: makeComponent('KeyboardAvoidingView'),
  Platform: { OS: 'ios', select: (obj) => obj.ios },
  StyleSheet: { create: (s) => s },
  Dimensions: { get: () => ({ width: 375, height: 812 }) },
  Animated: {
    View: makeComponent('Animated.View'),
    createAnimatedComponent: (c) => c,
  },
};
