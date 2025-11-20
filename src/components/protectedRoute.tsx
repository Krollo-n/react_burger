
import {Navigate, useLocation} from "react-router-dom";
import {FC, ReactElement} from 'react';
import {useAppSelector} from '../utils/hooks/useAppDispatch';

interface IProtectedProps {
    onlyAuth?: boolean;
    element: ReactElement;
}

const Protected: FC<IProtectedProps> = ({onlyAuth = true, element}) => 
{
  const isAuthChecked = useAppSelector(store => store.user.isAuthChecked);
  const user = useAppSelector(store => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyAuth && user) {
    const {from} = location.state || {from: { pathname: "/"}};
    return <Navigate to={from}/>
  }

  if (onlyAuth && !user) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return element;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = (props: IProtectedProps) => <Protected onlyAuth={false} {...props} />