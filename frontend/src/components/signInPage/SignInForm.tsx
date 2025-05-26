'use client'

import { FormProvider, RHFCheckbox, RHFPassword, RHFSelect, RHFTextField } from "@components/hook-form"
import { TValidationDataSingIn, validationDataSignIn } from "@components/hook-form/validation/signInRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, MenuItem, Stack, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const SignIn = () => {
  const router = useRouter();
  const arrayJks = ['jks1', 'jks2', 'jks3']

  const methods = useForm<TValidationDataSingIn>({
    defaultValues: {
      jks: '',
      email: '',
      password: '',
      rememberMe: false
    },
    resolver: zodResolver(validationDataSignIn)
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = (data: TValidationDataSingIn) => {
    console.log({ data })
    router.push('/');
  };

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" placeholder="Адреса електронної пошти" />
        <RHFPassword name="password" placeholder="Пароль" />
        <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
          <Stack flexDirection={'row'} spacing={0.5} alignItems={'center'}>
            <RHFCheckbox name={"rememberMe"} />
            <Typography variant="body2" margin={0}>Запам&#39;ятати мене</Typography>
          </Stack>
          <Button sx={{ fontWeight: 600, padding: 0, margin: 0 }} variant="text">Забули пароль?</Button>
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
        <Stack flexDirection={'row'}  gap={1}>
          <Typography variant="body1">Якщо у Вас ще немає аккаунту</Typography>
          <Link href={"/registration"} style={{textDecoration:'none'}}>
            <Typography variant="body1" color="primary.main">зареєструйтесь</Typography>
          </Link>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default SignIn