import React from 'react';
import { Dialog, IconButton, Container, Box, Stack, Button, MenuItem, } from '@mui/material';
import { useUpdateUserNoodal } from '@application/store/useupdateUserModal';
import { CloseModal } from '@application/styles/icons';
import { KeyedMutator } from 'swr';
import { GetUserItemOutputDto } from '@application/models/GetUserOutputDto';
import { TValidationUpdateUser, validationUpdateUser } from '@components/hook-form/validation/updateUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@root/utils/axios';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, RHFSelect, RHFTextField } from '@components/hook-form';
import RHFAutocomplete from '@components/hook-form/RHFAutocomplete';

interface Props {
    mutate: KeyedMutator<GetUserItemOutputDto[]>
}


export default function UpdateUserModal({ mutate }: Props) {
    const { isModalOpen, closeModal, data } = useUpdateUserNoodal();
    const { username, email, role, id } = data!
    const router = useRouter()
    const roles = ['admin', 'user']

    const methods = useForm<TValidationUpdateUser>({
        resolver: zodResolver(validationUpdateUser),
        defaultValues: {
            username: username,
            email: email,
            role: role
        },
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data: TValidationUpdateUser) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${id}`, {
              
                    "email": data.email,
                    "username": data.username,
                    "role": data.role
            }
            )
            mutate()
            closeModal()
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
        <Dialog
            open={isModalOpen}
            onClose={closeModal}
            PaperProps={{
                sx: { maxWidth: '464px', width: '100%', textAlign: 'center' },
            }}
        >
            <Container sx={{ padding: '10px 14px 24px 14px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={closeModal}>
                        <CloseModal />
                    </IconButton>
                </Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <RHFTextField name={'username'} label="Нік"/>
                        <RHFTextField name={'email'} label="Email"/>
                        <RHFAutocomplete name={'role'} label="Роль" options={roles.map((roleItem)=>({title:roleItem, value:roleItem}))}/>
                        <Button
                            loading={isSubmitting}
                            sx={{ marginTop: 3, width: '100%', padding: '10px' }}
                            type='submit'
                            variant='contained'>
                            {'Зберігти зміни'}
                        </Button>
                    </Stack>
                </FormProvider>
            </Container>
        </Dialog>
    );
}