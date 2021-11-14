import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const { user } = useAuth();


    useEffect(() => {
        fetch(`http://localhost:5000/myOrders/${user?.email}`)
            .then(res => res.json())
            .then(data => setMyOrder(data));
    }, [user.email]);
    // console.log(myOrder);

    const myOrderDelete = (id) => {

        fetch(`http://localhost:5000/orders/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.deletedCount) {
                    alert('admin order delete ')
                    const remaining = myOrder.filter(order => order._id !== id);
                    setMyOrder(remaining);
                }
            })
    }
    return (
        <div>
            <h2 className="text-center mb-5">My Order: {myOrder?.length}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>phone</th>
                        <th>Email</th>
                        {/* <th>Price</th>
                    <th>Address</th> */}
                        <th>Date</th>


                        <th>Action</th>
                    </tr>
                </thead>
                {myOrder?.map((order, index) => (
                    <tbody>
                        <tr>
                            <td>{index}</td>
                            <td>{order?.name}</td>
                            <td>{order?.phoneNumber}</td>
                            <td>{order?.email}</td>
                            {/* <td>{order?.Charge}</td>
                        <td>{order?.address}</td> */}
                            <td>{order?.address}</td>
                            <button className="btn bg-danger p-2" onClick={() => myOrderDelete(order?._id)} >Cancel Order</button>
                        </tr >
                    </tbody >
                ))}
            </Table >
        </div>
    );
};

export default MyOrder;