import {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import type {Identifier, XYCoord} from 'dnd-core';
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {sortingIngredient} from '../../services/reducers/currentIngredients';
import currentBurgerIngredientStyles from './currentBurgerIngredient.module.css';
import {IIngredientKey} from '../../utils/types';
import {FC} from 'react';

interface ICurrentBurgerIngredientProps {
  ingredient: IIngredientKey;
  index: number;
  deleteIngredient: () => void;
}

interface IDropItem {
  id: string;
  index: number;
  type: string;
}

const CurrentBurgerIngredient: FC<ICurrentBurgerIngredientProps> = ({ingredient, index, deleteIngredient}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const {_id} = ingredient;

  const [{isDrag}, drag] = useDrag({
    type: 'ingredient-sort',
    item: {_id, index},
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{handlerId}, drop] = useDrop<IDropItem, void, {handlerId: Identifier | null}>
    ({
      accept: 'ingredient-sort',
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
    }),
    hover(item:IDropItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      dispatch(sortingIngredient({dragIndex, hoverIndex}));
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      className={`${currentBurgerIngredientStyles.item}${(isDrag && ` ${currentBurgerIngredientStyles.itemDragging}`) || ''}`}
      key={`container-${ingredient.key}`}
      ref={ref}
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

export default CurrentBurgerIngredient;
