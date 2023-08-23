import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './page.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from './slices/counterSlice'

const API = 'http://localhost:3001'

const mockData = [
    {
      "id": 0,
      "image": "https:\/\/extracts.panmacmillan.com\/site\/extr\/static\/jacketimages\/9780230771406.jpg",
      "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "id": 1,
      "image": "https:\/\/extracts.panmacmillan.com\/site\/extr\/static\/jacketimages\/9781509896998.jpg",
      "data": "Pellentesque nec felis sed ligula cursus hendrerit."
    },
]

export default function Counter() {
    const count = useSelector((state) => state.counter.cart)
    const dispatch = useDispatch()

    

    const getTotalQuantity = () => {
        let total = 0
        count?.forEach(item => {
            total += item.quantity
        })
        return total
    }

    const handleClick = (item, action) => {
        let data = item.data
        let id = item.id
         if (count[item.id]) {
            action == 'increment' ? dispatch(incrementQuantity(item.id)) : dispatch(decrementQuantity(item.id))
        }
        else {
            dispatch(addToCart({ data, id }))
        }
    }
    
    return (
        <main className={styles.main}>

            <div className={styles.center}>
                Total number of Items in Cart is {getTotalQuantity()}
            </div>

            <div className={styles.grid}>
                {mockData.map((item, index) =>

                    <div className={styles.card} key={item.id}>
                        <img src={item.image} />
                        <h2>
                            {item.data}
                        </h2>
                        <div className={styles.buttonDiv}>
                            <button onClick={() => handleClick(item, 'decrement')} disabled={count[index]?.quantity > 0 ? false : true}>-</button>
                            <p>{count[index]?.quantity || 0}</p>
                            <button onClick={() => handleClick(item, 'increment')}>+</button>
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}

Counter.prototype = {
    count: PropTypes.number.isRequired
}