import React from 'react';
import { Dialog, IconButton, Container, Box, Stack, Button, MenuItem, } from '@mui/material';
import { CloseModal } from '@application/styles/icons';
import { KeyedMutator } from 'swr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@root/utils/axios';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, RHFTextField } from '@components/hook-form';
import RHFAutocomplete from '@components/hook-form/RHFAutocomplete';
import { useUpdatePostNoodal } from '@application/store/useUpdatePostModal';
import { TValidationUpdatePost, validationUpdatePost } from '@components/hook-form/validation/updatePost';
import { GetPostoutputDto } from '@application/models/GetPostOutputDto';

interface Props {
    mutate: KeyedMutator<GetPostoutputDto[]>
}


export default function UpdatePostModal({ mutate }: Props) {
    const { isModalOpen, closeModal, data } = useUpdatePostNoodal();
    const { content, isAdminOnly, title, id } = data!
    const router = useRouter()
    const roles = [{id:1, name:'admin'}, {id:0, name:'user'}]

    const methods = useForm<TValidationUpdatePost>({
        resolver: zodResolver(validationUpdatePost),
        defaultValues: {
           content: content,
           isAdminOnly: isAdminOnly,
           title: title
        },
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data: TValidationUpdatePost) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
              
                    "content": data.content,
                    "title": data.title,
                    "role": roles.find((roleItem)=> roleItem.id === data.isAdminOnly)?.name,
                    "isAdminOnly": data.isAdminOnly
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
                        <RHFTextField name={'title'} label="Заголовок"/>
                        <RHFTextField name={'content'} label="Опис"/>
                        <RHFAutocomplete name={'isAdminOnly'} label="Для кого" options={roles.map((roleItem)=>({title:roleItem.name, value:roleItem.id}))}/>
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