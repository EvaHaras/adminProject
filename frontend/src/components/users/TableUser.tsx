import { GetUserItemOutputDto } from "@application/models/GetUserOutputDto";
import { useUpdateUserNoodal } from "@application/store/useupdateUserModal";
import UpdateUserModal from "@components/modal/UpdateUserModal";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "@root/utils/axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { KeyedMutator, MutatorCallback, MutatorOptions } from "swr";

interface Props {
    datauser: GetUserItemOutputDto[]
    mutate: KeyedMutator<GetUserItemOutputDto[]>
}

const TableUser = ({ datauser, mutate }: Props) => {
    const router = useRouter()
    const { openModal, isModalOpen } = useUpdateUserNoodal();
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
                            <TableCell>Нік користувача</TableCell>
                            <TableCell>Еmail</TableCell>
                            <TableCell>Роль</TableCell>
                            <TableCell>Кнопошки</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datauser.map((dataUserItem, dataUserIndex) => (
                            <TableRow key={dataUserIndex + 'dataUserIndex'}>
                                <TableCell>{dataUserItem.id}</TableCell>
                                <TableCell>{dataUserItem.username}</TableCell>
                                <TableCell>{dataUserItem.email}</TableCell>
                                <TableCell>{dataUserItem.role}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Button variant="outlined"
                                        onClick={() => {openModal(dataUserItem)}}
                                        >Редагувати</Button>
                                        <Button
                                            sx={{ marginTop: 1 }} onClick={() => { handlerDelete(dataUserItem.id) }}
                                            variant="contained" color="error">Видалити</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isModalOpen && (<UpdateUserModal mutate={mutate }/>)}
        </Paper>
    )
}

export default TableUser