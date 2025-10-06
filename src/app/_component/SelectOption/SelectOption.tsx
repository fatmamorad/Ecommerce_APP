'use State'
import { brandItem } from 'image/types/Brands'
import React, { useState } from 'react'
import {
  fetchProducts,
  setCategory,
  fetchAllCate,
  setBrand,
  fetchAllBrands
} from "image/Redux/Filteration";
function SelectOption({options,selectItem}:{options:brandItem[],selectItem:string}) {
    const [showManue,setShowManue]=useState(false)
    
   return (<>
     <div className='relative'>
        <button className='border cursor-pointer border-gray-400 py-1 px-4 rounded-2xl' onClick={()=>{setShowManue(!showManue)}}> {selectItem}</button>
        <ul  className="custom-scrollbar scrollbar-left absolute overflow-y-scroll z-[100] 
                     border bg-white border-gray-400 rounded-2xl w-fit px-4 py-2 top-9 left-2 
                     max-h-52">
            {options.map((item)=>(
                <li onClick={()=>{
                    
                }} className='p-1' value={item._id} >{item.name}</li>
            ))}
            
        </ul>
     </div> 
   </>)
}

export default SelectOption
