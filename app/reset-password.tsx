import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot exceed 15 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        Keyboard.dismiss();
        console.log("Reset Password button pressed");
        // Navigate back to Login screen
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
                                    Reset Password
                                </Heading>
                                <Text size="sm" className="text-typography-500">
                                    Create a new password for your account.
                                </Text>
                            </VStack>

                            <VStack className="gap-5">
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.password}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">New Password</FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.password ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    secureTextEntry={!showPassword}
                                                    placeholder="Enter new password"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    maxLength={15}
                                                />
                                                <Pressable className="pr-3 justify-center" onPress={() => setShowPassword(!showPassword)}>
                                                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className="text-typography-400" />
                                                </Pressable>
                                            </Input>
                                            <FormControlError>
                                                <FormControlErrorIcon as={AlertCircleIcon} />
                                                <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
                                            </FormControlError>
                                        </FormControl>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.confirmPassword}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">Confirm New Password</FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.confirmPassword ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    secureTextEntry={!showConfirmPassword}
                                                    placeholder="Re-enter new password"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    maxLength={15}
                                                />
                                                <Pressable className="pr-3 justify-center" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} className="text-typography-400" />
                                                </Pressable>
                                            </Input>
                                            <FormControlError>
                                                <FormControlErrorIcon as={AlertCircleIcon} />
                                                <FormControlErrorText>{errors.confirmPassword?.message}</FormControlErrorText>
                                            </FormControlError>
                                        </FormControl>
                                    )}
                                />

                                <Button
                                    size="lg"
                                    className="bg-primary-600 active:bg-primary-700"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="font-semibold">Reset Password</ButtonText>
                                </Button>
                            </VStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
