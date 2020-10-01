import React, { Component } from 'react';
import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProduct, actUpdateProductRequest } from '../../actions';
import products from '../../reducers/products';

class ProductActionPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            txtName: '',
            numPrice: '',
            chkbStatus: false
        }
    }

    componentDidMount(){
        
        var {match} = this.props;
        
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id)
            
        }
    }

    componentDidUpdate(prevProps, prevStates){
        var {itemEditing} = this.props
        if ((prevProps!==null && itemEditing.id !== prevProps.itemEditing.id)|| itemEditing.id === prevStates.id){
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                numPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            })
        }
        
    }

    onChange=(e)=>{
        
        var target = e.target;
        var name = target.name;
        var value = target.type==='checkbox'?  target.checked: target.value;
        this.setState({
            [name]:value
        })
    }
    onSave = (e) =>{
        e.preventDefault();
        var {id, txtName, numPrice, chkbStatus} = this.state;
        var product = {
            id: id,
            name: txtName,
            price: numPrice,
            status: chkbStatus
        }

        var {history} = this.props;

        if(id!==''){//update
            console.log("UPdate")
            this.props.onUpdateProduct(product)
            this.setState({
                id: '',
                txtName: '',
                numPrice: '',
                chkbStatus: false
            })
        }
        else{
            this.props.onAddProduct(product)
           
        }
        history.goBack()
    }
    render() {
    
        var {id,txtName, numPrice, chkbStatus} = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                
                <form onSubmit={this.onSave}>
                    <legend>{id!==''? 'Cập Nhật Sản Phẩm': 'Thêm Sản Phẩm'}</legend>
                    <div className="form-group">
                        <label>Tên Sản Phẩm:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='txtName' 
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá Sản Phẩm:</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name='numPrice'
                            value={numPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái:</label>
                        
                        <div className="checkbox">
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={chkbStatus}
                                    name='chkbStatus'
                                    onChange={this.onChange}
                                    checked={chkbStatus}
                                />
                                Còn hàng
                            </label>
                        </div>
                        
                    </div>

                    
                    <button type="submit" className="btn btn-primary mr-10">Lưu lại</button>
                    <Link onClick={this.clearState()} to='/product-list' className='btn btn-danger '>
                        Hủy bỏ
                    </Link> 
                </form>
                
            </div>
            
        );
    }

}


const mapStateToProps = (state) =>{
    return{
        itemEditing: state.itemEditing
    }
}


const mapDispatchToProps = (dispatch, props) =>{
    return{
        onAddProduct: (product)=>{
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: (id)=>{
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: (product)=>{
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);