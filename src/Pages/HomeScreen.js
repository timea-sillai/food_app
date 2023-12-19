import * as React from 'react';
import { Button, Text, View } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button title='Navigate to categories' onPress={()=> navigation.navigate('Categories')}></Button>
      </View>
    );
}