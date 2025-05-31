import { Grid, Stack, Typography } from "@mui/material"
import { ICONS } from "@root/layout/DashboardLayout/navbar/NavConfig"
import { PATH_DASHBOARD } from "@root/utils/paths"
import Link from "next/link"

const Page = () => {
    const navigation = [{
        title: 'Користувачі',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
        children: [
            { title: 'Список користувачів', path: PATH_DASHBOARD.users.root },
        ],
    },
    {
        title: 'Пости',
        path: PATH_DASHBOARD.applications.root,
        icon: ICONS.dashboard,
        children: [
            { title: 'Список всіх постів', path: PATH_DASHBOARD.applications.root },
            { title: 'Створити пост', path: PATH_DASHBOARD.applications.new },
            { title: 'Пости для адміністраторів', path: PATH_DASHBOARD.applications.admin },
        ],
    },]
    return (
        <Grid container spacing={4}>
            {navigation.map((navItem, navIndex) => (
                <Grid
                    key={navIndex + 'navIndex'}
                    size={{xs:12, sm:6}}
                    sx={{ border: 'solid 1px #3e464f', padding: 2, borderRadius: 1 }}>
                    <Stack spacing={4}>
                        <Typography variant="h2" color="primary.main">{navItem.title}</Typography>
                        <Stack spacing={2}>
                            {navItem.children.map((navChildrenitem, navChildrenIndex) => (
                                <Link
                                    style={{ textDecoration: 'none', color: "#FFFFFF" }}
                                    href={navChildrenitem.path}
                                    key={navChildrenIndex + 'navChildrenIndex'}>
                                    <Typography variant="body1" color="text.main">{navChildrenitem.title} {'->'}</Typography>
                                </Link>
                            ))}
                        </Stack>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    )
}

export default Page