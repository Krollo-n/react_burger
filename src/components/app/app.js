import {useEffect} from 'react';
import {useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = 'https://norma.nomoreparties.space/api/ingredients '; 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setData(result.data);
        } 
        catch (err) {setError(err);} 
        finally {setLoading(false);}
      };

      fetchData();
    }, []); 

    if (loading) {
      return <div>Loading data...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <AppHeader />
        <main>
          <div className={appStyles.main}>
            <h1 className={appStyles.header}>Соберите бургер</h1>
            <div className={appStyles['order-selection']}>
              <BurgerIngredients data={data}/>
              <BurgerConstructor data={data} /> 
            </div>
         </div>
        </main>
      </div>
    );
}

export default App;