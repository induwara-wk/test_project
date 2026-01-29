import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Icon, StarIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
    useEffect(() => {
        const timer = setTimeout(() => {
            // @ts-ignore
            router.replace('/login');
        }, 2000); // Wait for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-primary-600">
            <Center className="flex-1">
                <Box className="items-center">
                    <VStack className="gap-4 items-center">
                        <Box className="bg-white p-6 rounded-full shadow-lg">
                            <Icon as={StarIcon} className="text-primary-600 w-16 h-16" />
                        </Box>
                        <Heading size="3xl" className="text-white font-bold tracking-widest">
                            MY APP
                        </Heading>
                        <Text className="text-primary-100 text-lg">
                            Welcome to the future
                        </Text>
                    </VStack>
                </Box>
            </Center>
        </SafeAreaView>
    );
}
