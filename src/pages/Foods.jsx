import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';
import FoodCard from '../components/FoodCard';
import FoodsId from '../components/FoodsId';
import Footer from '../components/Footer';
import Header from '../components/Header';
import context from '../context/context';
import { ingredientsSearch, nameSearch } from '../services/fetch';

export default function Foods() {
  const { searchByFilter,
    foodCategory, setSearchByFilter } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;
  const fetchRecipes = async () => {
    const result = await nameSearch('', '/foods');
    setSearchByFilter(result);
  };

  const verifyStateLocation = async () => {
    const { location: { state } } = history;
    if (state) {
      const result = await ingredientsSearch(state, '/drinks');
      setSearchByFilter(result);
    }
  };

  useEffect(() => {
    const { location: { state } } = history;
    if (!searchByFilter[0] && !state) {
      fetchRecipes();
    } else {
      verifyStateLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByFilter]);
  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname !== '/foods') return <FoodsId />;

  return (
    <div>
      <h1 data-testid="page-title">
        Foods
      </h1>
      <Header />
      {foodCategory
        .map((i, index) => (
          <CategoryBtn
            category={ i }
            pathname={ pathname }
            index={ index }
            key={ index }
          />))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setSearchByFilter([]) }
      >
        All
      </button>
      <section>
        {searchByFilter !== null && searchByFilter
          .map((food, index) => (
            <FoodCard
              key={ index }
              index={ index }
              food={ food }
            />))}
      </section>
      <Footer />
    </div>
  );
}
