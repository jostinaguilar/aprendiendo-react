import { useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters() {
  const { filters, setFilters } = useFilters();

  const categoryId = useId();
  const minPriceId = useId();

  const handleMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceId}>Price</label>
        <input
          type="range"
          name="price"
          id={minPriceId}
          min="0"
          max="1000"
          onChange={handleMinPrice}
        />
        <span>{filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryId}>Categoría</label>
        <select onChange={handleCategory} id={categoryId}>
          <option value="all">Todo</option>
          <option value="laptops">Portátiles</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  );
}
