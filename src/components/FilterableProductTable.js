import { Component } from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import SearchBar from './SearchBar';

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
  }

  handleFilterTextChange = (e) => {
    this.setState({ filterText: e.target.value });
  };

  handleInStockChange = (e) => {
    this.setState({ inStockOnly: e.target.checked });
  };

  render() {
    const rows = [];
    let currentCategory = null;

    this.props.products.forEach((product) => {
      if (
        product.name.toLowerCase().includes(this.state.filterText.toLowerCase()) &&
        (!this.state.inStockOnly || product.stocked)
      ) {
        if (product.category !== currentCategory) {
          rows.push(
            <ProductCategoryRow key={product.category} category={product.category} />
          );
          currentCategory = product.category;
        }
        rows.push(<ProductRow key={product.name} product={product} />);
      }
    });

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleFilterTextChange={this.handleFilterTextChange}
          handleInStockChange={this.handleInStockChange}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default FilterableProductTable;
