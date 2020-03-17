import React, { Component, Fragment } from 'react';
import OrdersList from '../components/Order/OrdersList';
import { connect } from 'react-redux';
import * as actions from '../actions/orderActions';
import * as actionsProduct from '../actions/productActions';
import OrderItem from '../components/Order/OrderItem';
class OrderListContainer extends Component {

    UNSAFE_componentWillMount() {
        this.props.listAll();
        this.props.getAllProduct();
    }
    componentWillReceiveProps(){
        console.log('did update')
    }

    render() {
        var { orders } = this.props;
        return (
            <Fragment>
                <OrdersList>
                    {this.showOrders(orders)}
                </OrdersList>
            </Fragment>
        );
    }
    showOrders = (orders) => {
        var result = null;
        var {deleteOrder, products} = this.props;
        if (orders.length > 0) {
            result = orders.map((order, index) => {
                return <OrderItem
                    key={index}
                    order={order}
                    index={index}
                    products = {products}
                    deleteOrder = {deleteOrder}
                >
                </OrderItem>
            })
        }
        return result;
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        orders: state.orders.orders
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listAll: () => {
            dispatch(actions.listAll())
        },
        getAllProduct: () => {
            dispatch(actionsProduct.getAllProduct())
        },
        deleteOrder: (_id) => {
            dispatch(actions.deleteOrder(_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer);