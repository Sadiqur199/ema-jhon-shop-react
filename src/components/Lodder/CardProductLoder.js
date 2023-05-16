import { getShoppingCart } from "../../utilities/fakedb";

//  if card is in database , you have to use async and await


const CardproductLoder = async () => {
  const storedCard = getShoppingCart();
  const ids = Object.keys(storedCard)
  console.log(ids)
  const loadProducts = await fetch(`https://ema-john-sopping-server.vercel.app/productsByIds`, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(ids)
  });

  const products = await loadProducts.json()
  console.log('product by id:', products)
  
  const savedCart = [];
  for (const id in storedCard) {
    const addedProduct = products.find(product => product._id === id)
    if (addedProduct) {
      const quantity = storedCard[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  return savedCart;
}

export default CardproductLoder