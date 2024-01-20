import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleRemoveProduct, incrementCartItem } from '../utils/utils'
import './Cart.css'
import CartItemCard from './CartItemCard'


const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([])
  const navigate = useNavigate()

  const decreaseQuantity = (id: number, quantity: number, stock: number) => {
    if (1 >= quantity) return

    incrementCartItem(id, quantity - 1, stock)
    setCartItems(JSON.parse(sessionStorage.getItem('products') || '{}'))
  }

  const increaseQuantity = (id: number, quantity: number, stock: number) => {
    if (stock < quantity + 1) return

    incrementCartItem(id, quantity + 1, stock)
    setCartItems(JSON.parse(sessionStorage.getItem('products') || '{}'))
  }

  const handleCheckout = () => {
    if(!cartItems?.length) return window.alert('You have no cart items')
    navigate('/')
  }

  const removeFromCart = (id: number) => {
    handleRemoveProduct(id)
    setCartItems(JSON.parse(sessionStorage.getItem('products') || '{}'))
  }

  useEffect(() => {
    setCartItems(JSON.parse(sessionStorage.getItem('products') || '{}'))
  }, [])

  return (
    <div className="cart-page">
      <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      {cartItems?.map((item: any) => (
        <div className="cartContainer" key={item.id}>
          <CartItemCard item={item} removeFromCart={removeFromCart} />
          <div className="cartInput">
            <button
              onClick={() =>
                decreaseQuantity(item.id, item.quantity, item.stock)
              }
            >
              <RemoveIcon />
            </button>
            <input type="number" readOnly={true} value={item?.quantity} />
            <button
              onClick={() =>
                increaseQuantity(item.id, item.quantity, item.stock)
              }
            >
              <AddIcon />
            </button>
          </div>
          <p className="cartSubtotal">
            <b>{`€ ${item.price * item.quantity}`}</b>
          </p>
        </div>
      ))}

      <div className="cartGrossProfit">
        <div></div>
        <div className="cartGrossProfitBox">
          <p>Gross Total:</p>
          <p>
            <b>
              €{' '}
              {cartItems?.reduce(
                (acc: any, item: any) => acc + item.quantity * item.price,
                0
              )}
            </b>
          </p>
        </div>
        <div></div>
        <div className="checkoutBtn">
          <button onClick={handleCheckout}>Proceed To Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;