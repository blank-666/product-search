import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <td colSpan='2' className='product-category'>{category}</td>
            </tr>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name :
            <span style={{ color: 'red', textShadow: '0.5px 0.5px 1px black' }}>{product.name}</span>;
        const price = product.price;
        return (
            <tr>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const rows = [];
        let lastCategory;
        this.props.products.forEach((product) => {
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return
            }
            if (inStockOnly && !product.stocked) {
                return
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                )
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            )
            lastCategory = product.category;
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        return (
            <form>
                <input
                    type='text'
                    placeholder='Search...'
                    value={filterText}
                    onChange={this.props.filterTextChange}
                />
                <p>
                    <input
                        type='checkbox'
                        checked={inStockOnly}
                        onChange={this.props.inStockChange}
                    />
                 Only show products in stock
                </p>
            </form>
        )
    }
}

export default class FilterableProductTable extends React.Component {
    state = {
        filterText: '',
        inStockOnly: false
    }

    filterTextChange = (event) => {
        this.setState({
            filterText: event.target.value
        })
    }

    inStockChange = () => {
        this.setState((state) => ({
            inStockOnly: !state.inStockOnly
        }))
    }
    render() {
        console.log(this.state)
        return (
            <div className='productTableContainer'>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    filterTextChange={this.filterTextChange}
                    inStockChange={this.inStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}