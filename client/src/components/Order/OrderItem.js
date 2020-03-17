import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class OrderItem extends Component {
    deleteOrder = (_id) => {
        if(confirm('Ban co chac xoa?')){ //eslint-disable-line
            this.props.deleteOrder(_id);
        }
        
    }
    render() {
        var { _id, customer, product, quantity, price, cash, status } = this.props.order;
        var {index} = this.props;
        return (
                <tr key={_id}>
                    <th scope="row">{ index+1}</th>
                    <td>{customer}</td>
                    <td>{product}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td>{cash}</td>
                    <td>{status}</td>
                    <td>
                    <Button onClick = {() =>this.deleteOrder(_id)}>Xoa</Button>
                    <Link to={`/orders/${_id}/edit`} className="btn btn-success">Sua</Link>
                </td>
                </tr>
        );
    }
}

export default OrderItem;