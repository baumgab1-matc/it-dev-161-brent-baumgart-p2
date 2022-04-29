
//Component used to show a single past order item
//CustomerOrders uses this component when it loops through all past orders   
const OrderItem = ({ orderItem }) => {

// orderObject is an Order from the database, it's structure is 
// {
//     createdAt: String,
//     customer: String,
//     order: [{
//             _id: String,
//             name: String,
//             img: String
//             amount: Number
//             price: Number
//         }]
// }


    return (
        <div className="past-order-container">
            <h4>Placed: {orderItem.createdAt}</h4>

            {orderItem?.order && orderItem.order.map((current, j) => (
                <div key={j} className="past-order-item">
                    <h1>{current.name}</h1>
                    <img src={current.img} />
                    <p>price: {current.price}</p>
                    <p>amount: {current.amount}</p>
                </div>
            ))}
        </div>
    )
}

export default OrderItem;