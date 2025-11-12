import {useNavigate} from 'react-router-dom';
import registerStyles from './register.module.css'
import {Button, Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFormData} from '../../utils/hooks/useFormData';
import {useDisclosure} from '../../utils/hooks/useDisclosure';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../services/thunks/user';

export const Register = () => {
  const navigate = useNavigate();  
  const {form, change} = useFormData({name: '',email: '', password: ''})
  const {isOpen: hidden, toggle} = useDisclosure(false)
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form))
  }
  return (
    <section className={registerStyles.wrapper}>
        <form className={registerStyles.form} onSubmit={onSubmit}>
            <header className={'text text_type_main-medium mb-6'}>
                Регистрация
            </header>
            <div className={'mb-20'}>
                <Input extraClass={'mb-6'}
                    placeholder='Имя'
                    name='name'
                    type='text'
                    onChange={change}
                    value={form?.name}/>
                <EmailInput extraClass={'mb-6'}
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    onChange={change}
                    value={form?.email}/>
                <PasswordInput extraClass={'mb-6'}
                    placeholder='Пароль'
                    name='password'
                    type={hidden ? 'password' : 'text'}
                    icon={hidden ? 'HideIcon' : 'ShowIcon'}
                    onIconClick={toggle}
                    onChange={change}
                    value={form?.password}/>
                <Button className={'button button_size_medium button_type_primary'} htmlType={'submit'}>
                    <span className={'text text_type_main-default'}>
                        Зарегестрироваться
                    </span>
                </Button>
            </div>
            <div className={registerStyles.text}>
                <span>Уже зарегистрированы?</span>
                <Button
                    extraClass={registerStyles.buttonLink}
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

export default Register;