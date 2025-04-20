import React from 'react';
import Header from '../Header/Header';
import { useState } from 'react';
import { useEffect } from 'react';
import { db, auth } from '../Firebase/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';




const Home = () => {

  const [record, setRecord] = useState([]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setRecord(data))
      .catch(err => console.log(err)
      )
  }, []);
  const addtocart = async (product) => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        const userCartRef = doc(db, "carts", user.uid);
        const cartCollection = collection(userCartRef, "items");
  
        await setDoc(doc(cartCollection, product.id.toString()), {
          title: product.title,
          image: product.images[0],
          price: product.price,
          productId: product.id,
        });
  
        alert("Product added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      alert("Please login to add to cart.");
    }
  };
    

return (
  <div className='w-full overflow-x-hidden px-4'>
    <Header/>
    <ul className='flex flex-wrap gap-[20px] justify-center mx-[50px]'>
      {record.map((list, index) => {
        return (
          <li key={index} className='w-[200px]'>
            <img src={list.images[0]} alt="product" width="200" className='bg-cover' />
            {list.title}
            <p className='text-orange-700'>${list.price}</p>
            <button className='bg-red-600 outline-none rounded w-[100px] text-white font-bold px-1 mt-2 hover:bg-red-700' onClick={() => addtocart(list)}>Add To cart</button>
          </li>
        );
      })}
    </ul>
  </div>
);
};

export default Home;
