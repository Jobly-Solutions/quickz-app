import { F1_13_400_19 } from "@/styles/typography";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";

const UNAVAILABLE = 'No disponible';

export const Unavailable: FC = () => {
    return (
        <Text style={styles.text}>{UNAVAILABLE}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        ...F1_13_400_19,
    }
});