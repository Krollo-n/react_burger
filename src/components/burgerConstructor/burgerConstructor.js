import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css'; 
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {IngredientType} from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';

function BurgerConstructor({data}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();

    if (e.type === 'click') {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
     <> 
      <section>
        <div className={burgerConstructorStyles.order}>
            <ConstructorElement extraClass={burgerConstructorStyles.fix}
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
            />
            <div className={burgerConstructorStyles.components}> 
                {data.filter(({type}) => type !== 'bun')
                .map((d) => (
                    <div key={`burgerConstructor-${d._id}`} className={burgerConstructorStyles.ingredient}>
                        <DragIcon type={"primary"}/>
                        <ConstructorElement 
                          text={d.name} 
                          price={d.price} 
                          thumbnail={d.image_mobile} 
                        />
                    </div>
                ))}
            </div>
            <ConstructorElement
                    extraClass={burgerConstructorStyles.fix}
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
            />
        </div>
        <div className={burgerConstructorStyles.final}>
            <div className={burgerConstructorStyles.total}>
                <span className="text text_type_digits-medium">{13666}</span>
                <CurrencyIcon/>
            </div>
            <Button htmlType="submit" type="primary" size="large" onClick={handleOpen}>
                Оформить заказ
            </Button>
        </div>
      </section>

      <Modal id="orderDetails" isOpen={isOpen} onClose={handleClose}>
        <OrderDetails />
      </Modal>
     </> 
    );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType)).isRequired
}

export default BurgerConstructor;