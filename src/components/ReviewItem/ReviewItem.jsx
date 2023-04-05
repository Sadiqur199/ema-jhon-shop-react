import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css'

const ReviewItem = ({product , handelRemoveCart}) => {
  const {id , img, price ,quantity,name} = product;
  return (
    <div className='review-item'>
       <img src={img} alt="" />
       <div className='review-info'>
        <h5 className='product-title'>{name}</h5>
        <p>Price : <span className='orange-text'>${price}</span></p>
        <p>order-Quantity : <span className='orange-text'>{quantity}</span></p>
       </div>
       <button onClick={() => handelRemoveCart(id)} className='btn-delete'>
        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
        </button>
    </div>
  );
};

export default ReviewItem;