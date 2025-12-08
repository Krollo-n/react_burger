import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {useEffect} from "react";
import {getIngredients} from "../../services/reducers/ingredients"; 
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {getUser} from "../../services/thunks/user";
import HomePage from '../../pages/home';
import OrderFeedPage from '../../pages/orderFeed';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import OrderFeedCard from '../orderFeedCard/orderFeedCard';
import {OnlyAuth, OnlyUnAuth} from '../protectedRoute';
import HeaderPage from '../../pages/header';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgotPassword';
import ResetPasswordPage from '../../pages/resetPassword';
import ProfilePage from '../../pages/profile';
import OrdersHistoryPage from '../../pages/ordersHistory';
import ProfileMenuPage from '../../pages/profileMenu';
import OrderFeedCardPage from '../../pages/orderFeedCard';
import IngredientDetailsPage from '../../pages/ingredientDetails';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
    dispatch(getIngredients())
  }, [dispatch])

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path={'/'} element={<HeaderPage/>}>
          <Route path={'/'} element={<HomePage/>}/>
          <Route path={'/ingredients/:id'} element={<IngredientDetailsPage/>}/>
          <Route path={'/login'} element={<OnlyUnAuth element={<LoginPage/>}/>}/>
          <Route path={'/feed'} element={<OrderFeedPage/>}/>
          <Route path={'/feed/:number'} element={<OrderFeedCardPage/>}/>
          <Route path={'/profile/orders/:number'}  element={<OnlyAuth element={<OrderFeedCardPage/>}/> }/>
          <Route path={'/register'} element={<OnlyUnAuth element={<RegisterPage/>}/>}/>
          <Route path={'/forgot-password'} element={<OnlyUnAuth element={<ForgotPasswordPage/>}/>}/>
          <Route path={'/reset-password'} element={<OnlyUnAuth element={<ResetPasswordPage/>}/>}/>
          <Route path={'/profile'} element={<OnlyAuth element={<ProfileMenuPage/>}/>}>
            <Route index element={<ProfilePage/>}/>
            <Route path={'orders'} element={<OrdersHistoryPage/>} />
          </Route>
        </Route>  
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal id='ingredientDetails' onClose={handleClose}>
                  <IngredientDetails/>
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal id='orderFeedCard' onClose={handleClose}>
                  <OrderFeedCard/>
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal id='userOrderFeedCard' onClose={handleClose}>
                  <OrderFeedCard/>
              </Modal>
            }
          />
        </Routes>)}
    </>
  );
}

export default App;