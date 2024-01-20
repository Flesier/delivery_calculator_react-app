export const handleCartValue = (value: number) => {
  let surcharge = 0

  if (value < 10) {
    surcharge = 1.1 //when cart value is less than 10€ surcharge will be 1.10€
  }

  return surcharge
}

export const handleDeliveryDistance = (value: number) => {
  let deliveryFee = 0
  let extraMeter

  if (value < 500) {
    deliveryFee = 1 //when distance is shorter than 500m
  } else if (500 < value && value < 1000) {
    deliveryFee = 2 //distance is shorter than 1km
  } else if (value > 1000) {
    extraMeter = value - 1000 // counted additional meter

    deliveryFee = 2 + Math.ceil(extraMeter / 500) * 1 // fee will be base charge 2€ + 1€ more for every 500m
  }

  return deliveryFee
}

export const handleNumberOfItems = (items: number) => {
  let surcharge = 0

  if (items <= 4) {
    surcharge = 0 // number of item is 4 or less than that no extra charge
  } else if (items > 4) {
    surcharge = (items - 4) * 0.5 // 50 cents will be added if number of item is 5
  }

  return surcharge
}

export const handleTime = (time: string) => {
  const inputDate = new Date(time)
  const getDay = inputDate.getDay()
  const getTime = inputDate.getHours()

  if (getDay === 5 && getTime >= 15 && getTime <= 19) { // rush time during 3pm-7pm
    return true
  } else {
    return false
  }
}

export const incrementCartItem = (
  id: number,
  quantity: number,
  stock: number
) => {
  let cartItems = sessionStorage.getItem('products')
    ? JSON.parse(sessionStorage.getItem('products') || '{}')
    : []

  const isItemExist = cartItems?.find((i: any) => i.id === id)

  if (isItemExist) {
    const item = {
      ...isItemExist,
      quantity,
    }

    cartItems = cartItems.map((i: any) => (i.id === isItemExist.id ? item : i))
    sessionStorage.setItem('products', JSON.stringify(cartItems))
  }
}

export const handleRemoveProduct = (id: number) => {
  let cartItems = sessionStorage.getItem('products')
    ? JSON.parse(sessionStorage.getItem('products') || '{}')
    : []
  cartItems = cartItems.filter((item: any) => item.id !== id)
  sessionStorage.setItem('products', JSON.stringify(cartItems))
}
