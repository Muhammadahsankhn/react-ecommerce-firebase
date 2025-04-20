import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc } from 'firebase/firestore/lite'
import { auth, db } from '../Firebase/firebase'



const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems  = async() => {
            
        const user = auth.currentUser;
        if(user){
            try {
                const itemRef = collection(doc(db, "carts", user.uid), "items");
                const snapshot = await getDocs(itemRef);

                const items = snapshot.docs.map(doc => ({
                    id : doc.id,
                    ...doc.data(),
                }));

                setCartItems(items)
            } catch (error) {
                console.log('Fetch error :',error)
            }
        }
        }
        fetchCartItems()
    },[]);

    
    return (
        <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="flex flex-wrap gap-4">
        {cartItems.map(item => (
          <div key={item.id} className="border p-4 rounded shadow w-[200px]">
            <img src={item.image} alt={item.title} className="w-full h-[150px] object-cover mb-2" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-green-600 font-bold">${item.price}</p>
          </div>
        ))}
        {cartItems.length === 0 && <p>No items in cart.</p>}
      </div>
    </div>
    )
}

export default Cart