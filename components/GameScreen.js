/*GAME Screen
  whack-a-mole
  implemented difficulty
 */

import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const NUM_HOLES = 8;
const NUM_MOLES = 1;

const GameScreen = ({ navigation, route }) => {
    const { difficulty } = route.params;
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(30); 
    const [moles, setMoles] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);

    // Adjust difficulty settings
    const moleSpeed = difficulty === 'easy' ? 2000 : difficulty === 'medium' ? 1500 : difficulty === 'hard' ? 1000 : 750;
    const numHoles = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : difficulty === 'hard' ? 16 : NUM_HOLES;
    const numMolesToShow = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : difficulty === 'hard' ? 3 : NUM_MOLES;

    useEffect(() => {
        if (!isPlaying) return; // Stop game if not playing

        if (lives === 0) {
            Alert.alert('Game Over', `Your score is ${score}`);
            navigation.navigate('GameOver', { score });
            setIsPlaying(false); // Game over, stop playing
            return;
        }

        const molePositions = [];
        while (molePositions.length < numMolesToShow) {
            const random = Math.floor(Math.random() * numHoles);
            if (!molePositions.includes(random)) {
                molePositions.push(random);
            }
        }

        setMoles(molePositions);

        const timer = setTimeout(() => {
            setLives((prevLives) => prevLives - 1);
            setMoles([]); // Reset moles for the next appearance
        }, moleSpeed);

        return () => clearTimeout(timer); 
    }, [isPlaying, lives]);

    const handleHolePress = (index) => {
        if (!isPlaying) return; // Ignore presses if game is not active

        if (moles.includes(index)) {
            setScore((prevScore) => prevScore + 1);
            setMoles((prevMoles) => prevMoles.filter((mole) => mole !== index));
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Mole.png')} //personally drawn icon
                style={{ width: 200, height: 200 }}
            />
            <Text style={styles.title}>Whack-a-Mole</Text>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.lives}>Lives: {lives}</Text>
            <View style={styles.grid}>
                {[...Array(numHoles)].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.hole, moles.includes(index) && styles.mole]}
                        onPress={() => handleHolePress(index)}
                        disabled={!isPlaying} // Disable holes when not playing
                    />
                ))}
            </View>
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
    lives: {
        fontSize: 18,
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    hole: {
        width: 80,
        height: 80,
        backgroundColor: 'brown',
        margin: 10,
    },
    mole: {
        backgroundColor: 'black',
    },
});

export default GameScreen;
