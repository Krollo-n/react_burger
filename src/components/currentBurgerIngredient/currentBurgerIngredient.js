import {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {SORTING_INGREDIENT} from '../../services/reducers/currentIngredients';
import currentBurgerIngredientStyles from './currentBurgerIngredient.module.css';
import {IngredientType} from '../../utils/types';

function CurrentBurgerIngredient({ingredient, index, deleteIngredient}) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const {_id} = ingredient;

  const [{isDrag}, drag] = useDrag({
    type: 'ingredient-sort',
    item: {_id, index},
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{handlerId}, drop] = useDrop({
    accept: 'ingredient-sort',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      dispatch(SORTING_INGREDIENT({dragIndex, hoverIndex}));
      item.index = hoverIndex;
    },
  });

  return (
    <div
      className={`${currentBurgerIngredientStyles.item}${(isDrag && ` ${currentBurgerIngredientStyles.itemDragging}`) || ''}`}
      key={`container-${ingredient.key}`}
      ref={drag(drop(ref))}
      data-handler-id={handlerId}
    >
      <DragIcon key={`icon-${ingredient.key}`} type="primary" />
      <ConstructorElement
        key={ingredient.key}
        extraClass={currentBurgerIngredientStyles.constructorElement}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteIngredient}
      />
    </div>
  );
}

CurrentBurgerIngredient.propTypes = {
  ingredient: PropTypes.shape(IngredientType),
  index: PropTypes.number.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
}; 

export default CurrentBurgerIngredient;
