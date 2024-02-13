import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameOverScreen = ({ navigation, route }) => {
    const { score } = route.params;
    const [highestScore, setHighestScore] = useState(0);

    if (score > highestScore) {
        setHighestScore(score);
    }

    const restartGame = () => {
        // Reset game state and navigate back to HomeScreen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            <Text style={styles.highestScore}>Highest Score: {highestScore}</Text>
            <Button title="Restart" onPress={restartGame} />
            <Button title="Close" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 18,
        marginBottom: 10,
    },
    highestScore: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default GameOverScreen;
