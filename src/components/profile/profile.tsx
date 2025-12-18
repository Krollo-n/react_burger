import {useFormData} from '../../utils/hooks/useFormData';
import {Button, Input, PasswordInput, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from './profile.module.css'
import {useAppDispatch, useAppSelector} from "../../utils/hooks/useAppDispatch";
import {editUser} from '../../services/thunks/user';
import {Link} from "react-router-dom";
import {FormEvent} from 'react';
import {IUserLogin} from '../../utils/types';

export const Profile = () => {
  const user = useAppSelector(state => state.user.user);

  const {form, change, reset} = useFormData({
    name: user!.name,
    email: user!.email,
    password: ''
  })

  const dispatch = useAppDispatch()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(editUser(form as IUserLogin))
  }

  return (
    <form className={profileStyles.form} onSubmit={onSubmit}>
        <div className={'mb-20'}>
            <Input extraClass={'mb-6'}
                placeholder='Имя'
                name='name'
                type='text'
                icon='EditIcon'
                onChange={change}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                value={form?.name}/>
            <EmailInput extraClass={'mb-6'}
                placeholder='E-mail'
                name='email'
                onChange={change}                  
                value={form?.email}/>
            <PasswordInput extraClass={'mb-6'}
                placeholder='Пароль'
                name='password'
                icon='EditIcon'
                onChange={change}
                value={form?.password || ''}/>
            {
                (form.name !== user?.name || form.email !== user.email || form.password) &&
                <div className={profileStyles.buttons}>
                    <Button htmlType="button" type="secondary" >
                      <Link to={'/profile'} className={`text text_type_main-default text_color_accent mr-7 ${profileStyles.buttonCancel}`} onClick={reset}>
                        Отмена
                      </Link>             
                    </Button>
                    <Button className={'button button_size_medium button_type_primary'} htmlType={'submit'}>
                      <span className={'text text_type_main-default'}>
                        Сохранить
                      </span>
                    </Button>
                </div>
            }
        </div>
    </form>)
}

export default Profile;