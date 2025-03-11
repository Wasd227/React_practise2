/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import FilterPanel from './Component/FilterPanel/FilterPanel';
import ProductTable from './Component/ProductTable/ProductTable';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [activeUser, setActiveUser] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const products = productsFromServer.map(product => {
    const category = categoriesFromServer.find(
      c => c.id === product.categoryId,
    );
    const user = usersFromServer.find(u => u.id === category?.ownerId);

    return { ...product, category, user };
  });

  const getFilteredProducts = () => {
    return products.filter(product => {
      const userMatch =
        activeUser === 'All' || product.user?.name === activeUser;
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatch =
        activeCategory === 'All' || product.category?.title === activeCategory;

      return userMatch && searchMatch && categoryMatch;
    });
  };

  const filteredProducts = getFilteredProducts();

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    let valueA;
    let valueB;

    if (sortField === 'id') {
      valueA = a.id;
      valueB = b.id;
    } else if (sortField === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (sortField === 'category') {
      valueA = a.category?.title.toLowerCase() || '';
      valueB = b.category?.title.toLowerCase() || '';
    } else if (sortField === 'user') {
      valueA = a.user?.name.toLowerCase() || '';
      valueB = b.user?.name.toLowerCase() || '';
    }

    if (valueA === valueB) return 0;
    const direction = sortDirection === 'asc' ? 1 : -1;

    return valueA > valueB ? direction : -direction;
  });

  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = field => {
    if (sortField !== field) return 'fas fa-sort';

    return sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  const resetAllFilters = () => {
    setActiveUser('All');
    setSearchQuery('');
    setActiveCategory('All');
    setSortField(null);
    setSortDirection('asc');
  };

  const getCategoryEmoji = categoryTitle => {
    switch (categoryTitle) {
      case 'Drinks':
        return '🍺';
      case 'Grocery':
        return '🍞';
      case 'Electronics':
        return '💻';
      case 'Clothes':
        return '👚';
      case 'Fruits':
        return '🍏';
      default:
        return '📦';
    }
  };

  const uniqueUsers = products
    .map(p => p.user?.name)
    .filter(Boolean)
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }

      return acc;
    }, []);

  const uniqueCategories = products
    .map(p => p.category?.title)
    .filter(Boolean)
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }

      return acc;
    }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <FilterPanel
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          uniqueUsers={uniqueUsers}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          uniqueCategories={uniqueCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          resetAllFilters={resetAllFilters}
        />
        <ProductTable
          sortedProducts={sortedProducts}
          handleSort={handleSort}
          getSortIcon={getSortIcon}
          getCategoryEmoji={getCategoryEmoji}
        />
      </div>
    </div>
  );
};
