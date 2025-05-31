'use client'

import { FormProvider, RHFCheckbox, RHFPassword, RHFSelect, RHFTextField } from "@components/hook-form"
import { TValidationDataLogin, validationDataLogin } from "@components/hook-form/validation/signInRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, MenuItem, Stack, Typography } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { enqueueSnackbar } from 'notistack';

const Login = () => {
    const router = useRouter();

    const methods = useForm<TValidationDataLogin>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            admin: false
        },
        resolver: zodResolver(validationDataLogin)
    })

    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods

    const onSubmit = async (data: TValidationDataLogin) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/auth/register',
                data: {
                    "username": data.username,
                    "email": data.email,
                    "password": data.password,
                    "role": data.admin ? 'admin' : 'user'
                }
            });
            enqueueSnackbar('Успішна реєстрація', { variant: 'success' });
            if(response){
                router.push('/signIn')
            }
        } catch (error: any) {
            if(error.status === 409){
                enqueueSnackbar('Користувач з таким email вже зареєстрован', { variant: 'warning' })
            }else{
                enqueueSnackbar('Помилка реєстрації', { variant: 'error' })
            }
        }
    };

    return (

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="username" placeholder="Користувач" />
                <RHFTextField name="email" placeholder="Адреса електронної пошти" />
                <RHFPassword name="password" placeholder="Пароль" />
                <Stack flexDirection={'row'}  alignItems={'center'}>
                    <RHFCheckbox name={"admin"}/>
                    <Typography variant="body1">Я адмін</Typography>
                </Stack>

                <Button
                    fullWidth
                    size="large" type={'submit'}
                    color="inherit"
                    variant="contained"
                    sx={{ fontWeight: 700 }}
                    loading={isSubmitting}
                    disabled={!isValid}
                >
                    Зареєструватися
                </Button>
                <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="body1">У Вас є аккаунт?</Typography>
                    <Link href={"/signIn"} style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" color="primary.main">Увійти</Typography>
                    </Link>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default Login