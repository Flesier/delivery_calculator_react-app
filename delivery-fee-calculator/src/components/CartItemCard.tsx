import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'


const CartItemCard = (props: any) => {
  const { item, removeFromCart } = props

  return (
    <div>
      <div className="cartItemCard">
        <img src={item.thumbnail} alt="" />
        <div>
          <Link to={`/product/${item.product}`}>{item.title}</Link>
          <span>{`Price: € ${item.price}`}</span>
          <p onClick={() => removeFromCart(item.id)}>Remove</p>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard