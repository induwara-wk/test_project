import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    // Authenticated state passed via query params
    const { authenticated } = useLocalSearchParams();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (authenticated === 'true') {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [authenticated]);

    const handleSignOut = () => {
        console.log("Sign Out button pressed");
        setIsAuth(false);
        // Clears params
        router.setParams({ authenticated: 'false' });
    };

    const handleSignIn = () => {
        // Navigate to Login
        router.push('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header Area */}
            <HStack className="justify-between items-center px-6 py-4">
                <Heading size="md" className="text-primary-600">MY APP</Heading>
                {!isAuth ? (
                    <Button size="sm" variant="outline" action="primary" onPress={handleSignIn}>
                        <ButtonText>Sign In</ButtonText>
                    </Button>
                ) : (
                    <Button size="sm" variant="outline" action="negative" onPress={handleSignOut}>
                        <ButtonText>Sign Out</ButtonText>
                    </Button>
                )}
            </HStack>

            <Center className="flex-1 px-6">
                <Box className="w-full max-w-[400px]">
                    <VStack className="gap-8 items-center">
                        <VStack className="gap-2 items-center">
                            <Heading size="3xl" className="text-typography-900 leading-tight text-center">
                                {isAuth ? "Welcome Home!" : "Hello, Guest"}
                            </Heading>
                            <Text size="sm" className="text-typography-500 text-center">
                                {isAuth
                                    ? "You have successfully signed in. This is your dashboard."
                                    : "Join us today to unlock full features. Sign in to continue."}
                            </Text>
                        </VStack>

                        {isAuth && (
                            <Box className="bg-primary-50 p-6 rounded-xl w-full">
                                <Text className="text-center font-medium text-primary-900">
                                    Dashboard Content Area
                                </Text>
                            </Box>
                        )}

                        {!isAuth && (
                            <Button
                                size="lg"
                                className="w-full bg-primary-600"
                                onPress={handleSignIn}
                            >
                                <ButtonText className="font-semibold">Get Started</ButtonText>
                            </Button>
                        )}
                    </VStack>
                </Box>
            </Center>
        </SafeAreaView>
    );
}
