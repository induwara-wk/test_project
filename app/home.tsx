import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const handleSignOut = () => {
        // Here you would clear user session/auth tokens
        console.log("Sign Out button pressed");
        // Navigate back to Login and replace current history to prevent going back
        router.replace('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <Stack.Screen options={{ headerShown: false }} />
            <Center className="flex-1 px-6">
                <Box className="w-full max-w-[400px]">
                    <VStack className="gap-8 items-center">
                        <VStack className="gap-2 items-center">
                            <Heading size="3xl" className="text-typography-900 leading-tight text-center">
                                Welcome Home!
                            </Heading>
                            <Text size="sm" className="text-typography-500 text-center">
                                You have successfully signed in. This is your dashboard.
                            </Text>
                        </VStack>

                        <Button
                            size="lg"
                            action="negative"
                            className="w-full"
                            onPress={handleSignOut}
                        >
                            <ButtonText className="font-semibold">Sign Out</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </SafeAreaView>
    );
}
