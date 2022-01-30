import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function IngredientsCheckDrinks({ ingredient, measure, index }) {
  const [stateClass, setStateClass] = useState('');
  const { id } = useParams();

  const addLocalStorage = () => { // meals ou cocktails
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage.cocktails[id].concat(ingredient);
    getLocalStorage.cocktails[id] = getArrLocal;
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  };

  const removeLocalStorage = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage.cocktails[id].filter((i) => i !== ingredient);
    getLocalStorage.cocktails[id] = getArrLocal;
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  };

  const handleChange = () => {
    if (stateClass === 'inProgress') {
      removeLocalStorage();
      setStateClass('');
    } else {
      setStateClass('inProgress');
      addLocalStorage();
    }
  };

  const verifyUseEffect = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getLocalStorage) {
      const obj = { cocktails: { [id]: [] }, meals: {} };
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (getLocalStorage.cocktails && !getLocalStorage.cocktails[id]) {
      getLocalStorage.cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
    }
  };

  const verifyLocal = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalStorage.cocktails[id].includes(ingredient)) {
      setStateClass('inProgress');
    }
  };

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    verifyUseEffect();
    if (getLocalStorage.cocktails[id]) {
      verifyLocal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={ stateClass === '' ? {} : { textDecorationLine: 'line-through' } }>
      <p
        data-testid={ `data-testid=${index}-ingredient-step` }
      >
        {`${measure} - ${ingredient}`}
      </p>
      <label htmlFor="check">
        <input
          type="checkbox"
          id="check"
          checked={ stateClass !== '' }
          onChange={ () => handleChange() }
        />
      </label>
    </div>);
}

IngredientsCheckDrinks.propTypes = {
  index: PropTypes.any,
  ingredient: PropTypes.any,
  measure: PropTypes.any,
}.isRequired;
