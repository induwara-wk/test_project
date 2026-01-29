import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const verifyEmailSchema = z.object({
    otp: z.string().length(6, 'Please enter a valid 6-digit code').regex(/^\d+$/, 'Code must contain only numbers'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: { otp: '' },
    });

    const onSubmit = (data: VerifyEmailFormData) => {
        Keyboard.dismiss();
        console.log("Verify Email button pressed with code:", data.otp);
        // Navigate to Login screen after successful verification
        router.push('/login');
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
                                    Verify Email
                                </Heading>
                                <Text size="sm" className="text-typography-500">
                                    Please enter the verification code sent to your email address to activate your account.
                                </Text>
                            </VStack>

                            <VStack className="gap-5">
                                <Controller
                                    control={control}
                                    name="otp"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.otp}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">
                                                    Verification Code
                                                </FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.otp ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    placeholder="Enter 6-digit code"
                                                    keyboardType="number-pad"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    maxLength={6}
                                                    className="text-center tracking-widest font-medium text-lg"
                                                />
                                            </Input>
                                            <FormControlError>
                                                <FormControlErrorIcon as={AlertCircleIcon} />
                                                <FormControlErrorText>{errors.otp?.message}</FormControlErrorText>
                                            </FormControlError>
                                        </FormControl>
                                    )}
                                />

                                <Button
                                    size="lg"
                                    className="bg-primary-600 active:bg-primary-700"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="font-semibold">Verify Email</ButtonText>
                                </Button>

                                <Center>
                                    <HStack className="items-center gap-1">
                                        <Text size="sm" className="text-typography-500">
                                            Didn't receive the code?
                                        </Text>
                                        <Pressable onPress={() => console.log("Resend code pressed")}>
                                            <Text size="sm" className="text-primary-600 font-bold">
                                                Resend
                                            </Text>
                                        </Pressable>
                                    </HStack>
                                </Center>
                            </VStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
