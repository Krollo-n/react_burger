import doneIcon from '../../images/done.jpg';
import orderDetailsStyles from './orderDetails.module.css';

function OrderDetails() {
  return (
    <div className={orderDetailsStyles.main}>
      <span className={orderDetailsStyles.orderNumber}>034536</span>
      <h3 className={orderDetailsStyles.header}>идентификатор заказа</h3>
      <img className={orderDetailsStyles.image} src={doneIcon} alt="Заказ принят"/> 
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
