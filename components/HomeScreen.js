/*HOME Screen
  Showing Instructions
  Adjust Difficulty Levels
 */
import React, { useState } from 'react';
import { View, Text, Button, Image, Modal, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [difficulty, setDifficulty] = useState('medium'); // Default difficulty

    const startGame = () => {
        navigation.navigate('Game', { difficulty });
    };

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <Text style={styles.header}>Instructions:</Text>
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instruction}>• Unleash your ultra instinct!</Text>
                        <Text style={styles.instruction}>• Whack, tap, click, the moles as they appear!</Text>
                        <Text style={styles.instruction}>• Select your difficulty:</Text>
                        <Text style={styles.subInstruction}>   - Easy: 8 Holes 1 Mole</Text>
                        <Text style={styles.subInstruction}>   - Medium: 12 Holes 2 Moles</Text>
                        <Text style={styles.subInstruction}>   - Hard: 14 Holes 3 Moles</Text>
                        <Text style={styles.instruction}>• The Harder the difficulty, the faster the mole is!</Text>
                        <Text style={styles.instruction}>• You have 30 lives (automatically consumed by moles per sequence)</Text>
                        <Text style={styles.instruction}>• So make it count! </Text>
                        <Text style={styles.instruction}>• 'Coz I can't get the timer and lives works at the same time LOL! :V</Text>
                    </View>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>

            <Image
                source={require('../assets/Mole.png')} //personally drawn icon
                style={{ width: 200, height: 200 }} 
            /> 
            <Text style={styles.title}>Whack-a-Mole</Text> 
            <Button title="Instructions" onPress={() => setModalVisible(true)} /> 
            <View style={styles.difficultyButtons}> 
                <Button title="Easy" onPress={() => handleDifficultyChange('easy')} />
                <Button title="Medium" onPress={() => handleDifficultyChange('medium')} />
                <Button title="Hard" onPress={() => handleDifficultyChange('hard')} />
            </View>
            <Button title="Start Game" onPress={startGame} />
        </View>
    );
};

const styles = StyleSheet.create({

    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ivory',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructionsContainer: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    instruction: {
        fontSize: 16,
        marginBottom: 5,
    },
    subInstruction: {
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
        marginVertical: 10,

    },

    difficultyButtons: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        marginVertical: 20,
        display: 'block',
        marginBottom: 10,
    },

    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default HomeScreen;
