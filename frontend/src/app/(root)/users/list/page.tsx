'use client';

import getSession from "@application/actions/getSession"
import { GetUserItemOutputDto } from "@application/models/GetUserOutputDto";
import TableUser from "@components/users/TableUser";
import { Button, CircularProgress, Typography } from "@mui/material"
import axios from "@root/utils/axios"
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import useSWR from "swr";


const Page = () => {

  const router = useRouter()
  const handlerUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`)
      return response.data
    } catch (error: any) {
      if (error.status == 401) {
        router.replace('/signIn')
      }
      enqueueSnackbar('Сталась помилка', { variant: 'error' })
    }
  }


  const { data: dateList, isLoading, mutate } = useSWR<GetUserItemOutputDto[]>(
    'dateList',
    handlerUser,
    {
      revalidateOnFocus: false,
      errorRetryCount: 1,
    }
  )

  if (isLoading) return <CircularProgress />


  return (
    dateList && dateList.length > 0 ? (
      <TableUser datauser={dateList} mutate={mutate}/>
    ) : (
      <Typography>Немає данних для відображення</Typography>
    )
  )


}

export default Page

