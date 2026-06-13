/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'react' {
  export = React;
  export as namespace React;
  namespace React {
    function createElement(type: any, props?: any, ...children: any[]): any;
    function useState<T>(initial: T): [T, (v: T | ((p: T) => T)) => void];
    function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    function useRef<T>(initial?: T): { current: T | null };
    function useCallback<T>(fn: T, deps?: any[]): T;
    function useMemo<T>(fn: () => T, deps?: any[]): T;
    function useContext(ctx: any): any;
    function createContext<T>(defaultValue?: T): any;
    function Fragment(props: any): any;
    function forwardRef<T, P = {}>(render: (props: P, ref: any) => any): any;
    function memo<T>(component: T): T;
    class Component<P = {}, S = {}> {
      constructor(props: P);
      state: S;
      props: P;
      context: any;
      refs: any;
      setState(state: S | ((prev: S, props: P) => S)): void;
      forceUpdate(): void;
      render(): ReactElement | null;
    }
    type ErrorInfo = any;
    type ReactNode = any;
    type ReactElement = any;
    type ComponentType<P = {}> = any;
    type FC<P = {}> = any;
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function Fragment(props: any): any;
}

declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const TouchableOpacity: any;
  export const ScrollView: any;
  export const FlatList: any;
  export const Image: any;
  export const TextInput: any;
  export const SafeAreaView: any;
  export const StatusBar: any;
  export const Dimensions: any;
  export const Animated: any;
  export const Platform: any;
  export const ActivityIndicator: any;
  export const Modal: any;
  export const Pressable: any;
  export const Switch: any;
  export const Alert: any;
  export const Linking: any;
  export const Share: any;
  export const Clipboard: any;
  export const KeyboardAvoidingView: any;
  export const Keyboard: any;
  export const useColorScheme: any;
  export const useWindowDimensions: any;
  export const RefreshControl: any;
  export const PanResponder: any;
  export type ViewStyle = any;
  export type TextStyle = any;
  export type ImageStyle = any;
  export type StyleProp<T> = any;
}

declare module '@react-navigation/native' {
  export function useNavigation(): any;
  export function NavigationContainer(props: any): any;
  export function useRoute(): any;
  export function useFocusEffect(effect: any): void;
}

declare module '@react-navigation/bottom-tabs' {
  export function createBottomTabNavigator(): any;
}

declare module '@react-navigation/native-stack' {
  export function createNativeStackNavigator(): any;
}

declare module '@react-navigation/stack' {
  export function createStackNavigator(): any;
}

declare module 'expo-status-bar' {
  export function StatusBar(props: any): any;
}

declare module 'expo-camera' {
  export function CameraView(props: any): any;
  export function useCameraPermissions(): [any, any];
}

declare module 'expo-av' {
  export const Video: any;
  export const Audio: any;
}

declare module 'expo-haptics' {
  export enum ImpactFeedbackStyle {
    Light = 'light',
    Medium = 'medium',
    Heavy = 'heavy',
  }
  export enum NotificationFeedbackType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
  }
  export function impactAsync(style?: ImpactFeedbackStyle): Promise<void>;
  export function notificationAsync(type?: NotificationFeedbackType): Promise<void>;
  export function selectionAsync(): Promise<void>;
}

declare module 'expo-file-system' {
  export function readAsStringAsync(uri: string, options?: any): Promise<string>;
  export function writeAsStringAsync(uri: string, content: string, options?: any): Promise<void>;
  export function makeDirectoryAsync(uri: string, options?: any): Promise<void>;
}

declare module 'expo-linear-gradient' {
  export function LinearGradient(props: any): any;
}

declare module 'expo-media-library' {
  export function saveToLibraryAsync(uri: string): Promise<void>;
  export function requestPermissionsAsync(): Promise<any>;
}

declare module 'expo-sharing' {
  export function shareAsync(uri: string, options?: any): Promise<void>;
}

declare module 'expo-updates' {
  export function checkForUpdateAsync(): Promise<any>;
  export function fetchUpdateAsync(): Promise<any>;
}

declare module 'expo-gl' {
  export function GLView(props: any): any;
}

declare module 'expo-asset' {
  export class Asset {
    static fromModule(module: any): Asset;
    static fromURI(uri: string): Asset;
    downloadAsync(): Promise<void>;
    uri: string;
    localUri: string | null;
    width: number;
    height: number;
  }
}

declare module '@expo/vector-icons' {
  import { ComponentType } from 'react';
  export type IoniconsGlyph = string;
  export interface IconProps {
    name: IoniconsGlyph;
    size?: number;
    color?: string;
    style?: any;
  }
  export const Ionicons: ComponentType<IconProps>;
}

declare module 'react-native-safe-area-context' {
  export function SafeAreaProvider(props: any): any;
  export function SafeAreaView(props: any): any;
  export function useSafeAreaInsets(): { top: number; bottom: number; left: number; right: number };
}

declare module 'react-native-gesture-handler' {
  export function GestureHandlerRootView(props: any): any;
  export function PanGestureHandler(props: any): any;
  export function TapGestureHandler(props: any): any;
  export function GestureDetector(props: any): any;
  export function Gesture(): any;
}

declare module 'react-native-reanimated' {
  export function useSharedValue(initial: any): any;
  export function useAnimatedStyle(worklet: () => any): any;
  export function withSpring(value: any, config?: any): any;
  export function withTiming(value: any, config?: any): any;
  export function withDecay(config: any): any;
  export function withSequence(...animations: any[]): any;
  export function withDelay(ms: number, animation: any): any;
  export function interpolate(value: any, inputRange: number[], outputRange: any[], type?: any): any;
  export function runOnJS(fn: any): any;
  export function createAnimatedComponent(component: any): any;

  const View: any;
  const Text: any;
  const Image: any;
  const ScrollView: any;
  const FlatList: any;

  const Animated: {
    View: any;
    Text: any;
    Image: any;
    ScrollView: any;
    FlatList: any;
  };
  export default Animated;
}

declare module 'react-native-screens' {
  export function enableScreens(enabled?: boolean): void;
}

declare module 'react-native-svg' {
  export function Svg(props: any): any;
  export function Circle(props: any): any;
  export function Rect(props: any): any;
  export function Path(props: any): any;
  export function Line(props: any): any;
  export function G(props: any): any;
  export function Defs(props: any): any;
  export function LinearGradient(props: any): any;
  export function Stop(props: any): any;
  export function Text(props: any): any;
}

declare module 'react-native-webview' {
  export function WebView(props: any): any;
}

declare module 'lottie-react-native' {
  export default function LottieView(props: any): any;
}

declare module 'firebase/app' {
  export function initializeApp(options?: any): any;
  export function getApp(name?: string): any;
  export function getApps(): any[];
}

declare module 'firebase/auth' {
  export function getAuth(app?: any): any;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, nextOrObserver: any): any;
  export function updateProfile(user: any, profile: any): Promise<void>;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function collection(db: any, path: string): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function getDoc(ref: any): Promise<any>;
  export function getDocs(query: any): Promise<any>;
  export function setDoc(ref: any, data: any, options?: any): Promise<void>;
  export function updateDoc(ref: any, data: any): Promise<void>;
  export function deleteDoc(ref: any): Promise<void>;
  export function onSnapshot(ref: any, onNext: any, onError?: any): any;
  export function query(ref: any, ...constraints: any[]): any;
  export function where(field: string, op: string, value: any): any;
  export function orderBy(field: string, direction?: string): any;
  export function limit(n: number): any;
  export function addDoc(ref: any, data: any): Promise<any>;
  export function serverTimestamp(): any;
}

declare module 'firebase/storage' {
  export function getStorage(app?: any): any;
  export function ref(storage: any, path: string): any;
  export function uploadBytes(ref: any, data: any, metadata?: any): Promise<any>;
  export function getDownloadURL(ref: any): Promise<string>;
  export function deleteObject(ref: any): Promise<void>;
}

declare module '@mediapipe/pose' {
  export class Pose {
    constructor(config?: any);
    setOptions(options: any): void;
    onResults(callback: (results: any) => void): void;
    send(inputs: any): Promise<void>;
    close(): Promise<void>;
  }
}

declare module '@tensorflow/tfjs' {
  export * from '@tensorflow/tfjs-core';
}

declare module '@tensorflow/tfjs-core' {
  export function ready(): Promise<void>;
  export function tensor(values: any, shape?: number[], dtype?: string): any;
  export function dispose(variables: any): void;
  export function tidy<T>(nameOrFn: string | (() => T), fn?: () => T): T;
  export function setBackend(backendName: string): Promise<boolean>;
  export function getBackend(): string;
  export function registerBackend(name: string, factory: () => any, priority?: number): void;
  export function engine(): any;
  export function env(): any;
  export namespace io {}
  export namespace data {}
  export namespace util {}
  export namespace losses {}
  export namespace image {}
  export namespace layers {}
  export function sequential(config?: any): any;
  export function model(config: any): any;
  export function loadLayersModel(pathOrIOHandler: any, options?: any): Promise<any>;
  export function loadGraphModel(pathOrIOHandler: any, options?: any): Promise<any>;
  export namespace train {}
  export namespace regularizers {}
  export namespace constraints {}
  export namespace initializers {}
  export namespace metrics {}
  export namespace serialization {}
  export var version_core: string;
  export function memory(): any;
}

declare module 'tone' {
  export class Synth {
    constructor(options?: any);
    toDestination(): this;
    triggerAttackRelease(note: string | number, duration: string | number, time?: number, velocity?: number): this;
    triggerAttack(note: string | number, time?: number, velocity?: number): this;
    triggerRelease(time?: number): this;
    dispose(): void;
    volume: any;
  }
  export class PolySynth {
    constructor(options?: any);
    toDestination(): this;
    triggerAttackRelease(notes: (string | number)[], duration: string | number, time?: number, velocity?: number): this;
    dispose(): void;
    volume: any;
  }
  export class Transport {
    static start(time?: number): void;
    static stop(time?: number): void;
    static pause(time?: number): void;
    static schedule(callback: (time: number) => void, time: string | number): number;
    static cancel(eventId: number): void;
    static bpm: { value: number };
    static position: string;
    static state: string;
  }
  export class Player {
    constructor(url: string | any, onload?: () => void);
    toDestination(): this;
    start(time?: number, offset?: number, duration?: number): this;
    stop(time?: number): this;
    dispose(): void;
  }
  export function start(): Promise<void>;
}

declare module 'ioredis' {
  class Redis {
    constructor(options?: any);
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ...args: any[]): Promise<string | null>;
    del(...keys: string[]): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    ttl(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    exists(...keys: string[]): Promise<number>;
    on(event: string, listener: (...args: any[]) => void): this;
    quit(): Promise<void>;
    disconnect(): void;
    ping(): Promise<string>;
  }
  export = Redis;
}

declare module 'pg' {
  export class Pool {
    constructor(config?: any);
    query(text: string, params?: any[]): Promise<any>;
    connect(): Promise<any>;
    end(): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): this;
  }
  export class Client {
    constructor(config?: any);
    connect(): Promise<void>;
    query(text: string, params?: any[]): Promise<any>;
    end(): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): this;
  }
  export namespace types {}
}

declare module 'mixpanel-react-native' {
  export class Mixpanel {
    constructor(token: string, trackAutomaticEvents?: boolean);
    init(): Promise<void>;
    track(event: string, properties?: Record<string, any>): void;
    identify(distinctId: string): void;
    set(prop: string, to: any): void;
    registerSuperProperties(properties: Record<string, any>): void;
    timeEvent(event: string): void;
    flush(): void;
  }
}

declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.jpeg' {
  const value: any;
  export default value;
}
declare module '*.gif' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  const value: any;
  export default value;
}
declare module '*.mp4' {
  const value: any;
  export default value;
}
declare module '*.mp3' {
  const value: any;
  export default value;
}
declare module '*.wav' {
  const value: any;
  export default value;
}
declare module '*.json' {
  const value: any;
  export default value;
}
