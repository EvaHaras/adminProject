import { GetPostoutputDto } from "@application/models/GetPostOutputDto";;
import { useUpdatePostNoodal } from "@application/store/useUpdatePostModal";
import UpdatePostModal from "@components/modal/UpdatePostModal";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "@root/utils/axios";
import { formatISODate } from "@root/utils/formatteDate";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { KeyedMutator, MutatorCallback, MutatorOptions } from "swr";

interface Props {
    dataPost: GetPostoutputDto[]
    mutate: KeyedMutator<GetPostoutputDto[]>
}

const PostTable = ({ dataPost, mutate }: Props) => {
    const router = useRouter()
    const { openModal, isModalOpen } = useUpdatePostNoodal();
    const handlerDelete = async (id: number) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${id}`)
            console.log({ response })
            mutate()
        } catch (error: any) {
            if (error.status == 401) {
                router.replace('/signIn')
            } else if (error.status == 401) {
                enqueueSnackbar('Це доступно тільки для адмінів', { variant: 'warning' })
            }
            enqueueSnackbar('Сталась помилка', { variant: 'error' })
        }
    }


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Заголовок</TableCell>
                            <TableCell>Контент</TableCell>
                            <TableCell>Пост лише для адмінів</TableCell>
                            <TableCell>Дата створення</TableCell>
                            <TableCell>Дата останього редагування</TableCell>
                            <TableCell>Автор</TableCell>
                            <TableCell>Кнопошки</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataPost.map((dataPostItem, dataPostIndex) => (
                            <TableRow key={dataPostIndex + 'dataPostrIndex'}>
                                <TableCell>{dataPostItem.id}</TableCell>
                                <TableCell>{dataPostItem.title}</TableCell>
                                <TableCell>{dataPostItem.content.slice(0,4)}...</TableCell>
                                <TableCell>{dataPostItem.isAdminOnly === 1 ?"Так" : "Ні"}</TableCell>
                                <TableCell>{formatISODate(dataPostItem.createdAt)}</TableCell>
                                <TableCell>{formatISODate(dataPostItem.updatedAt)}</TableCell>
                                <TableCell>{dataPostItem.username}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Button variant="outlined"
                                        onClick={()=>{openModal(dataPostItem)}}
                                        >Редагувати</Button>
                                        <Button
                                            sx={{ marginTop: 1 }} onClick={() => { handlerDelete(dataPostItem.id) }}
                                            variant="contained" color="error">Видалити</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isModalOpen && (<UpdatePostModal mutate={mutate }/>)}
        </Paper>
    )
}

export default PostTable