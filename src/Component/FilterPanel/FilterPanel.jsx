import React from 'react';

const FilterPanel = ({
  activeUser,
  setActiveUser,
  uniqueUsers,
  searchQuery,
  setSearchQuery,
  uniqueCategories,
  activeCategory,
  setActiveCategory,
  resetAllFilters,
}) => {
  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>
        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={activeUser === 'All' ? 'is-active' : ''}
            onClick={() => setActiveUser('All')}
          >
            All
          </a>
          {uniqueUsers.map(user => (
            <a
              key={user.id}
              data-cy="FilterUser"
              href="#/"
              className={activeUser === user ? 'is-active' : ''}
              onClick={() => setActiveUser(user)}
            >
              {user}
            </a>
          ))}
        </p>
        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
            {searchQuery && (
              <span className="icon is-right">
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                  onClick={() => setSearchQuery('')}
                />
              </span>
            )}
          </p>
        </div>
        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={`button mr-6 is-outlined ${activeCategory === 'All' ? 'is-success' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            All
          </a>
          {uniqueCategories.map(category => (
            <a
              key={category}
              data-cy="Category"
              className={`button mr-2 my-1 ${activeCategory === category ? 'is-info' : ''}`}
              href="#/"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </a>
          ))}
        </div>
        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={resetAllFilters}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};

export default FilterPanel;
