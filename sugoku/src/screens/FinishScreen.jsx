import React from "react"
import { View, Text, StyleSheet } from "react-native"
// import { useNavigation } from '@react-navigation/native';

export default function FinishScreen() {
    // const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <Text>
                Sorry, You Lose !!! (emot crying) 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
})