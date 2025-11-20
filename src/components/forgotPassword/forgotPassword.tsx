import {useNavigate} from 'react-router-dom';
import forgotPasswordStyles from './forgotPassword.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Navigate, useLocation} from "react-router-dom";
import {useFormData} from '../../utils/hooks/useFormData';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/useAppDispatch';
import {restorePassword} from '../../services/thunks/password';

export const ForgotPassword = () => {
  const navigate = useNavigate();  
  const {form, change} = useFormData({email: ''})
  const location = useLocation()
  const dispatch = useAppDispatch()

  const {restorePasswordSucceed} = useAppSelector(state => state.password)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(restorePassword(form.email))
  }

  if (restorePasswordSucceed)
     return <Navigate to={'/reset-password'} state={{from: location}}/>

  return (
    <section className={forgotPasswordStyles.wrapper}>
        <form className={forgotPasswordStyles.form} onSubmit={onSubmit}>
            <header className={'mb-6'}>
                <h3 className={'text text_type_main-medium'}>
                    Восстановление пароля
                </h3>
            </header>
            <div className={'mb-20'}>
                <EmailInput extraClass={'mb-6'}
                        placeholder='Укажите e-mail'
                        name='email'
                        onChange={change}
                        value={form.email}/>
                <Button
                    className={'button button_size_medium button_type_primary'}
                    htmlType={'submit'}>
                    <span className={'text text_type_main-default'}>
                        Восстановить
                    </span>
                </Button>
            </div>
            <div className={forgotPasswordStyles.text}>
                <span>Вспомнили пароль?</span>
                <Button extraClass={forgotPasswordStyles.buttonLink}
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

export default ForgotPassword;