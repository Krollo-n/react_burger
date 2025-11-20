import {useNavigate} from 'react-router-dom';
import {Navigate, useLocation} from "react-router-dom";
import resetPasswordStyles from './resetPassword.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFormData} from '../../utils/hooks/useFormData';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/useAppDispatch";
import {resetPassword} from '../../services/thunks/password';
import {FormEvent} from 'react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const {form, change} = useFormData({password: '', code: ''})
  const location = useLocation()
  const dispatch = useAppDispatch();
  const {resetPasswordSucceed, resetPasswordFailed} = useAppSelector(state => state.password)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword({password: form.password, code: form.code}))
  }

  if(location.state && location.state.from){
    if (location.state.from.pathname !== '/forgot-password')
        return <Navigate to={'/'}/>
  }
  else return <Navigate to={'/'}/>

  if (resetPasswordSucceed)
    return <Navigate to={'/profile'}/>

  return (
    <section className={resetPasswordStyles.wrapper}>
        <form className={resetPasswordStyles.form} onSubmit={onSubmit}>
            <header className={'mb-6'}>
                <h3 className={'text text_type_main-medium'}>
                    Восстановление пароля
                </h3>
            </header>
            <div className={'mb-20'}>
                <PasswordInput extraClass={'mb-6'}
                    name='password'
                    placeholder='Введите новый пароль'
                    //icon={hidden?'HideIcon' : 'ShowIcon'}
                    onChange={change}
                    value={form.password}/>
                <Input extraClass={'mb-6'}
                    name='code'
                    placeholder='Введите код из письма'
                    type='text'
                    onChange={change}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    value={form.code}/>
                <Button size='medium' type='primary' htmlType='submit'>
                    <span className={'text text_type_main-default'}>
                        Сохранить
                    </span>
                </Button>
                {resetPasswordFailed &&
                    <p className={'text text_type_main-default text_color_error pt-5'}>
                        Проверьте корректность введенных данных
                    </p>}
            </div>

            <div className={resetPasswordStyles.text}>
                <span>Вспомнили пароль?</span>
                <Button
                    extraClass={resetPasswordStyles.buttonLink}
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={() => navigate('/login')}
                >
                    Войти
                </Button>
            </div>
        </form>
    </section>
  )
}

export default ResetPassword;