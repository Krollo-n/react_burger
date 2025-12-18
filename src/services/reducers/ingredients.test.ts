import ingredientsSlice from './ingredients';
import {getIngredients} from './ingredients';
import {IIngredient} from '../../utils/types';

const ingredient1: IIngredient = {
  "_id":"60666c42cc7b410027a1a9b5",
  "name":"Говяжий метеорит (отбивная)",
  "type":"main",
  "proteins":800,
  "fat":800,
  "carbohydrates":300,
  "calories":2674,
  "price":3000,
  "image":"https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v":0
};

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    requested: false,
    succeed: false,
    failed: false
  }

  it('should get ingredient - fulfilled', function () {
    const state = ingredientsSlice(initialState, {type: getIngredients.fulfilled.type, payload: {data: [ingredient1]}});
    expect(state).toEqual({...initialState, ingredients: [ingredient1], requested: false});
  });

  it('should get ingredient - pending', function () {
    const state = ingredientsSlice(initialState, {type: getIngredients.pending.type});
    expect(state).toEqual({...initialState, requested: true});
  });

  it('should get ingredient - rejected', function () {
    const state = ingredientsSlice(initialState, {type: getIngredients.rejected.type});
    expect(state).toEqual({...initialState, requested: false, failed: true});
  });
})
