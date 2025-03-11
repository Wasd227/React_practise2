const ProductTable = ({
  sortedProducts,
  handleSort,
  getSortIcon,
  getCategoryEmoji,
}) => {
  return (
    <div className="box table-container">
      {sortedProducts.length === 0 ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  ID
                  <a href="#/" onClick={() => handleSort('id')}>
                    <span className="icon">
                      <i data-cy="SortIcon" className={getSortIcon('id')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Product
                  <a href="#/" onClick={() => handleSort('name')}>
                    <span className="icon">
                      <i data-cy="SortIcon" className={getSortIcon('name')} />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Category
                  <a href="#/" onClick={() => handleSort('category')}>
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={getSortIcon('category')}
                      />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  User
                  <a href="#/" onClick={() => handleSort('user')}>
                    <span className="icon">
                      <i data-cy="SortIcon" className={getSortIcon('user')} />
                    </span>
                  </a>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map(product => (
              <tr key={product.id} data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>
                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {getCategoryEmoji(product.category?.title)} -{' '}
                  {product.category?.title}
                </td>
                <td
                  data-cy="ProductUser"
                  className={
                    product.user?.sex === 'f'
                      ? 'has-text-danger'
                      : 'has-text-link'
                  }
                >
                  {product.user?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
