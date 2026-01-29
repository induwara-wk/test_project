import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Divider } from '@/components/ui/divider';
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
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot exceed 15 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = (data: LoginFormData) => {
        Keyboard.dismiss();
        console.log("Sign In button pressed");
        // Navigate to Home screen
        // @ts-ignore
        router.replace({ pathname: '/home', params: { authenticated: 'true' } });
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
                                    Welcome Back
                                </Heading>
                                <Text size="sm" className="text-typography-500">
                                    Sign in to continue to your account
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

                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <FormControl isInvalid={!!errors.password}>
                                            <FormControlLabel className="mb-1.5">
                                                <FormControlLabelText className="text-typography-600 font-medium">
                                                    Password
                                                </FormControlLabelText>
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
                                            <Box className="items-end mt-2">
                                                <Link href="/forgot-password" asChild>
                                                    <Text size="sm" className="text-primary-600 font-medium">
                                                        Forgot Password?
                                                    </Text>
                                                </Link>
                                            </Box>
                                        </FormControl>
                                    )}
                                />

                                <Button
                                    size="lg"
                                    className="bg-primary-600 active:bg-primary-700"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <ButtonText className="font-semibold">Sign In</ButtonText>
                                </Button>

                                <HStack className="items-center gap-4 my-2">
                                    <Divider className="flex-1 bg-outline-200" />
                                    <Text size="xs" className="text-typography-400 font-medium uppercase tracking-wider">
                                        Or continue with
                                    </Text>
                                    <Divider className="flex-1 bg-outline-200" />
                                </HStack>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    action="secondary"
                                    className="border-outline-200 active:bg-background-50 gap-3"
                                    onPress={() => {
                                        console.log('Google login pressed');
                                        // @ts-ignore
                                        router.replace({ pathname: '/home', params: { authenticated: 'true' } });
                                    }}
                                >
                                    <Image
                                        source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                                        style={{ width: 20, height: 20 }}
                                        resizeMode="contain"
                                    />
                                    <ButtonText className="text-typography-700 font-medium">Continue with Google</ButtonText>
                                </Button>
                            </VStack>

                            <HStack className="justify-center items-center gap-1.5">
                                <Text size="sm" className="text-typography-500">Don't have an account?</Text>
                                <Link href="/signup" asChild>
                                    <Text size="sm" className="text-primary-600 font-bold">
                                        Sign Up
                                    </Text>
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
