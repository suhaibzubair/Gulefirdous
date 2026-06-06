import { FC } from 'react';
import { useAppSelector } from '../hooks/useTypedSelector'; 
import { Navigate } from 'react-router-dom';

interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const { accessToken } = useAppSelector((state:any) => state?.user);
    const {user}=useAppSelector((state:any)=>state.user)
console.log("user",user)
    if (accessToken) return <Component />;
    return <Navigate to='/login' />;
};

export default PrivateRoute;