'use client'

import { FormProvider, RHFCheckbox, RHFPassword, RHFSelect, RHFTextField } from "@components/hook-form"
import { TValidationForgotPassword, validateForgotPassword } from "@components/hook-form/validation/signInRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Typography } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { enqueueSnackbar } from 'notistack';

const ForgotPassword = () => {

    const methods = useForm<TValidationForgotPassword>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(validateForgotPassword)
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods

    const onSubmit = async (data: TValidationForgotPassword) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/auth/forgot-password',
                data: {
                    "email": data.email,
                }
            });

            if(response){
                enqueueSnackbar(`Ось токен для збросу пароля: ${response.data.token}, але цей фронт нічого не придумав, у нього лапки тому просто перейдіть на реєстрацію чи вхід будь ласка >=<`, { variant: 'success' });
            }
        } catch (error) {
            if(error.status === 404){
                enqueueSnackbar('Користувача не знайдено', { variant: 'warning' })
            }else{
                enqueueSnackbar('Помилка при зміні пароля', { variant: 'error' })
            }
        }
    };

    return (

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="email" placeholder="Адреса електронної пошти" />
                <Button
                    fullWidth
                    size="large" type={'submit'}
                    color="inherit"
                    variant="contained"
                    sx={{ fontWeight: 700 }}
                    loading={isSubmitting}
                    disabled={!isValid}
                >
                    Отримати новий пароль
                </Button>
                <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="body1">Перейти до </Typography>
                    <Link href={"/signIn"} style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" color="primary.main">входу</Typography>
                    </Link>
                    <Typography variant="body1">або </Typography>
                    <Link href={"/registration"} style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" color="primary.main">реєстрації</Typography>
                    </Link>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default ForgotPassword