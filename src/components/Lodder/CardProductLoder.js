import { getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";

const CardproductLoder = async () =>{
   const loadProducts = await fetch('products.json')
   const products  = await loadProducts.json()
//  if card is in database , you have to use async and await
    const storedCard = getShoppingCart();
    const savedCart = [];
    for (const id in storedCard)
    {
      const addedProduct = products.find(product => product.id === id)
      if(addedProduct){
        const quantity =  storedCard[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }

   return savedCart;
}

export default CardproductLoder