import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBrands } from '../brandSlice';

function BrandManagementPage() {
  const listBrands = useSelector((state) => state.brand.listBrand)
  const dispatch = useDispatch()
  console.log(listBrands);
  useEffect(() => {
    const action = getAllBrands();
    dispatch(action);
  }, [])
  
  return (
    <>
      <div>BrandManagementPage</div>
      {listBrands.data && listBrands.data.map((item, index) => {
        return(
          <h3 key={index}>{item.name}</h3>
        )
      })}
    </>
  )
}

export default BrandManagementPage