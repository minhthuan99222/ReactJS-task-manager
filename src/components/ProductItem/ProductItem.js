import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    render() {
        var {product, index} = this.props;
        var statusChecked = product.status? ['Còn hàng', 'success']: ['Hết hàng', 'warning'];
        return (
            <tr>
                <td> {index+1} </td>
                <td> {product.id} </td>
                <td> {product.name} </td>
                <td> {product.price}$ </td>
                <td>
                    
                    <span className={`label label-${statusChecked[1]}`}> {statusChecked[0]}</span>
                </td>
                <td>
                    <Link
                        to={`/product/${product.id}/edit`}
                        className="btn btn-info mr-10"
                    >
                        Sửa
                    </Link>

                    <button 
                        type="button" 
                        className="btn btn-av btn-danger"
                        onClick = { ()=>this.onDelete(product.id) }
                    >
                        Xóa
                    </button>
                </td>

            </tr>
        );
    }
    onDelete = (id) =>{
        if(confirm("Bạn muốn xóa sản phẩm này ?")){//eslint-disable-line
            this.props.onDelete(id)
        }
    }
}

export default ProductItem;