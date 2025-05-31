'use client'
import { GetPostoutputDto } from "@application/models/GetPostOutputDto"
import { CircularProgress, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import useSWR from "swr"

interface Props{
    id: number
}

const GetPostIdComponent = ({id}:Props) => {
    const router = useRouter()

     
    const handlerPostGetId = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`)
            return response.data
        } catch (error: any) {
            if (error.status == 401) {
                router.replace('/signIn')
            } else if (error.status == 401) {
                enqueueSnackbar('Це доступно тільки для адмінів', { variant: 'warning' })
            } else {
                enqueueSnackbar('Сталась помилка', { variant: 'error' })
            }
        }
    }


    const { data: getId, isLoading, mutate } = useSWR<GetPostoutputDto>(
        'handlerPostGetId',
        handlerPostGetId,
        {
            revalidateOnFocus: false,
            errorRetryCount: 1,
        }
    )

    if (isLoading) return <CircularProgress />

    return(
            getId ? (
           <Stack spacing={3}>
            <Typography>titlr</Typography>
            <Stack>
                <Typography>authot</Typography>
                <Typography>data</Typography>
            </Stack>
            <Typography>content</Typography>
           </Stack>
        ) : (
            <Typography>Немає данних для відображення</Typography>
        )
    )
}

export default GetPostIdComponent