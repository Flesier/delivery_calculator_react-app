import React from 'react'
import { useState } from 'react'
//import calendarIcon from '/images/calendar.png'
import './Calculator.css'
import { handleCartValue, handleDeliveryDistance, handleNumberOfItems, handleTime } from '../utils/utils'


const Calculator = () => {
  const [cartValue, setCartValue] = useState<number>()
  const [deliveryDistance, setDeliveryDistance] = useState<number>()
  const [amountOfItems, setAmountOfItems] = useState<number>()
  const [time, setTime] = useState<Date>()
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0)

  const handleDeliveryCharge = (e: any) => {
    e.preventDefault()
    let surCharge = handleCartValue(Number(cartValue))
    let deliveryCharge = handleDeliveryDistance(Number(deliveryDistance))
    let itemsSurCharge = handleNumberOfItems(Number(amountOfItems))
    const isRushTime = handleTime(String(time))

    let finalDeliveryCharge = surCharge + deliveryCharge + itemsSurCharge


    if (isRushTime) {
      finalDeliveryCharge = finalDeliveryCharge * 1.2 // 20% extra charge will be added if the time is rush time
    }

    if (Number(cartValue) === 100 || Number(cartValue) > 100) {
      finalDeliveryCharge = 0  // when the cart value is 100€ or more than that no charge will be added
    }

    if(finalDeliveryCharge > 15) {
      finalDeliveryCharge = 15 //delivery charge won't cross more than 15€
    }

    setDeliveryCharge(finalDeliveryCharge)
  }

  return (
    <div className="calculator">
      <div className="calculator-div">
        <h4 className="calculator-title">Calculator</h4>
        <form className="calculator-form">
          <div className="calculator-form-div">
            <div className="form-input form-label">
              <div>
                <label htmlFor="cartValue">Cart Value</label>
              </div>
              <div>
                <label htmlFor="deliveryDistance">Delivery distance</label>
              </div>
              <div>
                <label htmlFor="amountOfItems">Amount of items</label>
              </div>
              <div>
                <label htmlFor="time">Time</label>
              </div>
            </div>
            <div className="form-input">
              <div>
                <input
                  required
                  type="number"
                  id="cartValue"
                  min="0"
                  placeholder="0"
                  onChange={({ target }) => setCartValue(Number(target.value))}
                  onBlur={({ target }) => setCartValue(Number(target.value))}
                />
                <span>€</span>
              </div>
              <div>
                <input
                  required
                  type="number"
                  id="deliveryDistance"
                  placeholder="0"
                  onChange={({ target }) =>
                    setDeliveryDistance(Number(target.value))
                  }
                  onBlur={({ target }) =>
                    setDeliveryDistance(Number(target.value))
                  }
                />
                <span>m</span>
              </div>
              <div>
                <input
                  required
                  type="number"
                  min="0"
                  id="amountOfItems"
                  placeholder="0"
                  onChange={({ target }) =>
                    setAmountOfItems(Number(target.value))
                  }
                  onBlur={({ target }) =>
                    setAmountOfItems(Number(target.value))
                  }
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  id="time"
                  onChange={({ target }) => setTime(new Date(target.value))}
                  onBlur={({ target }) => setTime(new Date(target.value))}
                  required
                />
                
              </div>
            </div>
          </div>
          <button
            onClick={handleDeliveryCharge}
            type="submit"
            className="submit-btn"
          >
            Calculate delivery price
          </button>
        </form>

        <div className="delivery-price">
          <p>Delivery price: {deliveryCharge} € </p>
        </div>
      </div>
    </div>
  )
}

export default Calculator;
