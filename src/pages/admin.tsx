
import { AppBar, CustomRoutes, Layout, LoadingIndicator, Admin as RAdmin, Resource, TitlePortal, ToggleThemeButton } from "react-admin";
import { firebaseConfig } from "@/utils/firebase";
import { RAFirebaseOptions, FirebaseDataProvider,FirebaseAuthProvider} from 'react-admin-firebase';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';

import { CategoryProps } from "@/components/ui/categories-resource";
import { ItemProps } from "@/components/ui/item-resource";
import { OrderProps } from "@/components/ui/order-resource";
import { Route } from "react-router";
import { Info } from "@/components/ui/info";

const options: RAFirebaseOptions = {
  logging: true,
  persistence: "session",
  lazyLoading: { enabled: true },
  watch: ["orders"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig,{});


 const MyAppBar = () => (
    <AppBar toolbar={
        <>
            <TitlePortal title="Admin" /> 
            <IconButton color="inherit" onClick={() => {
                window.location.href = '/admin/info';
              }}>
              <SettingsIcon />
            </IconButton>       
            <ToggleThemeButton />
            <LoadingIndicator />
        </>
    } />
);
export const MyLayout = ({ children }: { children: React.ReactNode }) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);


export const Admin = ()=> {
    return (
        <RAdmin layout={MyLayout} authProvider={authProvider} basename ="/admin" dataProvider={dataProvider}>
          <Resource {...CategoryProps} />
          <Resource {...ItemProps} />
          <Resource {...OrderProps} />
          <CustomRoutes>
            <Route path="/info" element={<Info />} />
          </CustomRoutes>
        </RAdmin>
    )
    }
