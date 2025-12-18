export const getCurrentBun = (state) => state.currentIngredients.bun;
export const getCurrentIngredients = (state) => state.currentIngredients.ingredients;
export const getCurrentIngredientSum = (state) => state.currentIngredients.ingredients.reduce((sum, current) => sum + current?.price, 0);
