import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const signUpSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot exceed 15 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: SignUpFormData) => {
        Keyboard.dismiss();
        console.log("Sign Up button pressed");
        // Navigate to Verify Email screen
        router.push('/verify-email');
    };

    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Center className="flex-1 px-6 my-10">
                    <Box className="w-full max-w-[400px]">
                        <VStack className="gap-8">
                            <VStack className="gap-2">
                                <Heading size="3xl" className="text-typography-900 leading-tight">
                                    Create Account
                                </Heading>
                                <Text size="sm" className="text-typography-500">
                                    Sign up to get started
                                </Text>
                            </VStack>

                            <VStack className="gap-5">
                                <HStack space="md" className="gap-4">
                                    <Box className="flex-1">
                                        <Controller
                                            control={control}
                                            name="firstName"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <FormControl isInvalid={!!errors.firstName}>
                                                    <FormControlLabel className="mb-1.5">
                                                        <FormControlLabelText className="text-typography-600 font-medium">First Name</FormControlLabelText>
                                                    </FormControlLabel>
                                                    <Input size="lg" className={`border-outline-200 ${errors.firstName ? 'border-error-500' : ''}`}>
                                                        <InputField
                                                            placeholder="First Name"
                                                            value={value}
                                                            onChangeText={onChange}
                                                            onBlur={onBlur}
                                                        />
                                                    </Input>
                                                    <FormControlError>
                                                        <FormControlErrorIcon as={AlertCircleIcon} />
                                                        <FormControlErrorText>{errors.firstName?.message}</FormControlErrorText>
                                                    </FormControlError>
                                                </FormControl>
                                            )}
                                        />
                                    </Box>
                                    <Box className="flex-1">
                                        <Controller
                                            control={control}
                                            name="lastName"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <FormControl isInvalid={!!errors.lastName}>
                                                    <FormControlLabel className="mb-1.5">
                                                        <FormControlLabelText className="text-typography-600 font-medium">Last Name</FormControlLabelText>
                                                    </FormControlLabel>
                                                    <Input size="lg" className={`border-outline-200 ${errors.lastName ? 'border-error-500' : ''}`}>
                                                        <InputField
                                                            placeholder="Last Name"
                                                            value={value}
                                                            onChangeText={onChange}
                                                            onBlur={onBlur}
                                                        />
                                                    </Input>
                                                    <FormControlError>
                                                        <FormControlErrorIcon as={AlertCircleIcon} />
                                                        <FormControlErrorText>{errors.lastName?.message}</FormControlErrorText>
                                                    </FormControlError>
                                                </FormControl>
                                            )}
                                        />
                                    </Box>
                                </HStack>

                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">Email</FormControlLabelText>
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

                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.password}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">Password</FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.password ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    secureTextEntry={!showPassword}
                                                    placeholder="Enter your password"
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
                                                <FormControlLabelText className="text-typography-600 font-medium">Confirm Password</FormControlLabelText>
                                            </FormControlLabel>
                                            <Input size="lg" className={`border-outline-200 ${errors.confirmPassword ? 'border-error-500' : ''}`}>
                                                <InputField
                                                    secureTextEntry={!showConfirmPassword}
                                                    placeholder="Re-enter your password"
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
                                    className="bg-primary-600 active:bg-primary-700 mt-2"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="font-semibold">Sign Up</ButtonText>
                                </Button>

                                <HStack className="justify-center items-center gap-1.5">
                                    <Text size="sm" className="text-typography-500">Already have an account?</Text>
                                    <Link href="/login" asChild>
                                        <Text size="sm" className="text-primary-600 font-bold">
                                            Sign In
                                        </Text>
                                    </Link>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
