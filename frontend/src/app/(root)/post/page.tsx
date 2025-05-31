'use client';

import { GetPostoutputDto } from "@application/models/GetPostOutputDto";
import PostTable from "@components/post/PostTable";
import { CircularProgress, Typography } from "@mui/material"
import axios from "@root/utils/axios"
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";


const Page = () => {

  const router = useRouter()
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const handlerPost = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`)
      return response.data
    } catch (error: any) {
      if (error.status == 401) {
        router.replace('/signIn')
      }
      enqueueSnackbar('Сталась помилка', { variant: 'error' })
    }
  }


  const { data: postList, isLoading, mutate } = useSWR<GetPostoutputDto[]>(
    'postList',
    handlerPost,
    {
      revalidateOnFocus: false,
      errorRetryCount: 1,
    }
  )

  if (isLoading) return <CircularProgress />
  console.log(postList)


  return (
    postList && postList.length > 0 ? (
    <PostTable dataPost={postList} mutate={mutate}/>
    ) : (
      <Typography>Немає данних для відображення</Typography>
    )
  )


}

export default Page

