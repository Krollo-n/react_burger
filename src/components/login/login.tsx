import { useNavigate} from 'react-router-dom';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFormData} from '../../utils/hooks/useFormData';
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {loginUser} from '../../services/thunks/user';
import loginStyles from './login.module.css';
import {IUserLogin} from '../../utils/types';

export const LoginPage = () => {
  const navigate = useNavigate();
  const {form, change} = useFormData({email: '', password: ''})
  const dispatch = useAppDispatch()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(loginUser(form as IUserLogin))
    }

  return (
    <section className={loginStyles.wrapper}>
        <form className={loginStyles.form} onSubmit={onSubmit}>
            <header className={'mb-6'}>
                <h3 className={'text text_type_main-medium'}>
                    Вход
                </h3>
            </header>
            <div className={'mb-20'}>
                <EmailInput extraClass={'mb-6'}
                    placeholder='E-mail'
                    name='email'
                    onChange={change}
                    value={form.email}/>
                <PasswordInput extraClass={'mb-6'}
                    placeholder='Пароль'
                    name='password'
                    onChange={change}
                    value={form.password}/>
                <Button className={'button button_size_medium button_type_primary'} htmlType={'submit'}>
                    <span className={'text text_type_main-default'}>
                        Войти
                    </span>
                </Button>
            </div>
            <div>
                <div className={loginStyles.text}>
                    <span>Вы — новый пользователь?</span>
                    <Button extraClass={loginStyles.buttonLink}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={() => navigate('/register')}
                    >
                    Зарегистрироваться
                    </Button>
                </div>

                <div className={loginStyles.text}>
                    <span>Забыли пароль?</span>
                    <Button extraClass={loginStyles.buttonLink}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={() => navigate('/forgot-password')}
                    >
                    Восстановить пароль
                    </Button>
                </div>
            </div>
        </form>
    </section>
  )
}
export default LoginPage;