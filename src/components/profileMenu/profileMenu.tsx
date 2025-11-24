import profileMenuStyles from './profileMenu.module.css'
import {Link, NavLink, Outlet} from "react-router-dom";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {logout} from '../../services/thunks/user';

export const ProfileMenu = () => {
  const dispatch = useAppDispatch()
  const onLogout=()=>{dispatch(logout())}

  return (
    <div className={profileMenuStyles.wrapper}>
      <div className={profileMenuStyles.info}>
        <nav className={'mb-20'}>
            <ul>
                <li className={profileMenuStyles.link}>
                    <NavLink to={'/profile'} end className={({isActive}) => isActive?'text text_type_main-medium text_color_primary':'text text_type_main-medium text_color_inactive'}>
                        Профиль
                    </NavLink>
                </li>
                <li className={profileMenuStyles.link}>
                    <NavLink to={'orders'} className={({isActive}) => isActive?'text text_type_main-medium text_color_primary':'text text_type_main-medium text_color_inactive'}>
                        История заказов
                    </NavLink>
                </li>
                <li className={profileMenuStyles.link}>
                    <Link to={'/profile'} onClick={onLogout} className={'text text_type_main-medium text_color_inactive'}>
                        Выход
                    </Link>
                </li>
            </ul>
        </nav>
        <p className={`${profileMenuStyles.description} text text_type_main-small text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={'ml-15'}>
         {<Outlet/>}
      </div>
    </div>
 )
}

export default ProfileMenu;