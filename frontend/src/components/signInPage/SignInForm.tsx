'use client'

import { FormProvider, RHFCheckbox, RHFPassword, RHFSelect, RHFTextField } from "@components/hook-form"
import { TValidationDataSingIn, validationDataSignIn } from "@components/hook-form/validation/signInRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, MenuItem, Stack, Typography } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import { useForm } from "react-hook-form"

const SignIn = () => {
  const router = useRouter();

  const methods = useForm<TValidationDataSingIn>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(validationDataSignIn)
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = async (data: TValidationDataSingIn) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/login',
        data: {
          "email": data.email,
          "password": data.password,
        }
      });
    

      enqueueSnackbar('Вхід успішний', { variant: 'success' });
      if (response) {
        router.push('/')
      }
    } catch (error) {
      if (error.status === 401) {
        enqueueSnackbar('Невірні дані', { variant: 'warning' });
      } else {
        enqueueSnackbar('Помилка при вході', { variant: 'error' });
      }
    }
  };

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" placeholder="Адреса електронної пошти" />
        <RHFPassword name="password" placeholder="Пароль" />
        <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
          <Link href={"/forgot-password"} style={{ textDecoration: 'none' }}>
            <Typography variant="body1" color="primary.main">Забули пароль</Typography>
          </Link>
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
          Увійти
        </Button>
        <Stack flexDirection={'row'} gap={1}>
          <Typography variant="body1">Якщо у Вас ще немає аккаунту?</Typography>
          <Link href={"/registration"} style={{ textDecoration: 'none' }}>
            <Typography variant="body1" color="primary.main">Зареєструйтесь</Typography>
          </Link>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default SignIn