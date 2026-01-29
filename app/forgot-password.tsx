import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { AlertCircleIcon, ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        Keyboard.dismiss();
        console.log("Send Code button pressed with email:", data.email);
        // Navigate to Verify OTP screen
        router.push('/verify-otp');
    };

    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Center className="flex-1 px-6">
                    <Box className="w-full max-w-[400px]">
                        <VStack className="gap-8">
                            <VStack className="gap-2">
                                <Heading size="3xl" className="text-typography-900 leading-tight">
                                    Forgot Password?
                                </Heading>
                                <Text size="sm" className="text-typography-500">
                                    Enter your email address and we'll send you a code to reset your password.
                                </Text>
                            </VStack>

                            <VStack className="gap-5">
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">
                                                    Email
                                                </FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.email ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    placeholder="Enter your email"
                                                    autoCapitalize="none"
                                                    keyboardType="email-address"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                />
                                            </Input>
                                            <FormControlError>
                                                <FormControlErrorIcon as={AlertCircleIcon} />
                                                <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
                                            </FormControlError>
                                        </FormControl>
                                    )}
                                />

                                <Button
                                    size="lg"
                                    className="bg-primary-600 active:bg-primary-700"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="font-semibold">Send Code</ButtonText>
                                </Button>

                                <Center>
                                    <Link href="/login" asChild>
                                        <Pressable className="flex-row items-center gap-2 p-2">
                                            <Icon as={ArrowLeftIcon} className="text-typography-500 w-4 h-4" />
                                            <Text size="sm" className="text-typography-500 font-medium">
                                                Back to Sign In
                                            </Text>
                                        </Pressable>
                                    </Link>
                                </Center>
                            </VStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
