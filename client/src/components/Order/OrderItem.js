import React, { Component, Fragment } from 'react';
import { Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
class OrderItem extends Component {
    deleteOrder = (_id) => {
        if (confirm('Ban co chac xoa?')) { //eslint-disable-line
            this.props.deleteOrder(_id);
        }

    }
    render() {
        var { _id, customer, product, quantity, price, cash, status } = this.props.order;
        var { index } = this.props;
        return (<Fragment>
            <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td ><span className =  "bg-primary text-white rounded-bottom">{customer}</span> </td>
                <td>{product}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{cash}</td>
                <td >
                <span className =  "bg-success text-white rounded-bottom">{status}</span>
                </td>
                <td>
                    <Button className="btn btn-danger" onClick={() => this.deleteOrder(_id)}> <i className="fas fa-trash-alt fa-1x"></i></Button> &nbsp;
                    <Link to={`/orders/${_id}/edit`} className="btn btn-success"><i className="fas fa-info fa-1x"></i></Link>
                </td>
            </tr>
            </Fragment>
        );
    }
}

export default OrderItem;