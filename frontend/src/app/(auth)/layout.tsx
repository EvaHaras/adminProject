import SignInLayout from "@root/layout/SignInLayout";

interface Props{
    children:React.ReactNode;
}
const SingInLayout = ({children}:Props) =>{
    return(
        <SignInLayout>
            {children}
        </SignInLayout>
    )
}

export default SingInLayout