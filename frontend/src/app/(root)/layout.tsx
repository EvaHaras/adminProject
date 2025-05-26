import DashboardLayout from "@root/layout/DashboardLayout";




interface Props{
    children:React.ReactNode;
}

const MainLayout = ({children}:Props) =>{
    return(
           <DashboardLayout>
            {children}
           </DashboardLayout>
    )
}

export default MainLayout