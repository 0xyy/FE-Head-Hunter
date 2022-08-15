import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Auth } from './views/Auth/Auth';
import { Hr } from './views/Hr/Hr';
import { StudentCV } from './views/Student/StudentCV';
import { Admin } from './views/Admin/Admin';
import { ActivateUser } from "./views/User/ActivateUser";
import { InfoModal } from "./common/components/InfoModal/InfoModal";
import { LoadingSpinner } from "./common/components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "./common/hooks/auth-hook";
import { RecoverPassword } from "./views/User/RecoverPassword";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPages";
import './App.css';

export const App = () => {
        const {isLoading, error, isLoggedIn, userRole, clearError} = useAuth()
        let routes;
        if (!isLoggedIn) {
            routes = <Route path="/" element={<Auth/>}/>;
        } else {
            switch (userRole) {
                case 0:
                    routes = (<Route path="/" element={<Admin/>}/>);
                    break;
                case 1:
                    routes = (<Route path="/" element={<StudentCV/>}/>);
                    break;
                case 2:
                    routes = (<Route path="/" element={<Hr/>}/>);
                    break;
                default:
                    routes = <Route path="/" element={<Auth/>}/>;
            }
        }
        return (
            <>
                {isLoading && <LoadingSpinner/>}
                {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
                {isLoggedIn && <Header/>}
                <Routes>
                    {routes}
                    <Route path="/activate/:userId/:activeToken" element={<ActivateUser/>}/>
                    <Route path="/recover-password" element={<RecoverPassword/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>
            </>
        );
    }
;
