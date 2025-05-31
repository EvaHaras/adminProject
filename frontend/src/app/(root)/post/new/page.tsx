'use client'
import { FormProvider, RHFTextField } from "@components/hook-form";
import RHFAutocomplete from "@components/hook-form/RHFAutocomplete";
import { TValidationUpdatePost, validationUpdatePost } from "@components/hook-form/validation/updatePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack } from "@mui/material";
import axios from "@root/utils/axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";


const Page = () => {
    const router = useRouter()
    const roles = [{ id: 1, name: 'admin' }, { id: 0, name: 'user' }]

    const methods = useForm<TValidationUpdatePost>({
        resolver: zodResolver(validationUpdatePost),
        defaultValues: {
            content: '',
            isAdminOnly: 0,
            title: ''
        },
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data: TValidationUpdatePost) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {

                "content": data.content,
                "title": data.title,
                "isAdminOnly": data.isAdminOnly
            }
            )
         enqueueSnackbar('Пост створено', { variant: 'success' })
        } catch (error: any) {
            if (error.status == 401) {
                router.replace('/signIn')
            } else if (error.status == 401) {
                enqueueSnackbar('Це доступно тільки для адмінів', { variant: 'warning' })
            } else {
                enqueueSnackbar('Сталась помилка', { variant: 'error' })
            }
        }
    };

    return (
        <Container sx={{ padding: '10px 14px 24px 14px' }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <RHFTextField name={'title'} label="Заголовок" />
                    <RHFTextField name={'content'} label="Опис" />
                    <RHFAutocomplete name={'isAdminOnly'} label="Для кого" options={roles.map((roleItem) => ({ title: roleItem.name, value: roleItem.id }))} />
                    <Button
                        loading={isSubmitting}
                        sx={{ marginTop: 3, width: '100%', padding: '10px' }}
                        type='submit'
                        variant='contained'>
                        {'Зберігти'}
                    </Button>
                </Stack>
            </FormProvider>
        </Container>
    );
}

export default Page