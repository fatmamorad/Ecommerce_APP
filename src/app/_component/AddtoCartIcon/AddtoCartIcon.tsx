'use client'
import { CounterContext } from 'image/app/CounterProvider';
import { AddProductToCart, GetCartItems } from 'image/cartActions'
import { CartData } from 'image/types/cart.type';
import  { useContext } from 'react'
import { toast } from 'sonner'
function AddtoCartIcon({id}: {id:string}) {
    const countContext=useContext(CounterContext)
      async function getcartItems(){
            const data: CartData = await GetCartItems();
            let count = 0;
            data.data.products.forEach((item) => {
              count += item.count;
            });
           
            countContext.setCount(count);
        
        }
    async function  AddToCart(id:string){
        const data=await AddProductToCart(id)
        console.log(data)
        if(data.status==='success'){
            toast.success(data.message,{
                position:'top-center',
            })
            getcartItems()
        }
        else{
             toast.error(data.message,{
                position:'top-center',
            })
        }
        
    }
    return (
        <>
          <button onClick={()=>{AddToCart(id)}} className='cursor-pointer'>
             <i className="text-lg tec font-semibold fa fa-xl text-white fa-cart-shopping"></i>
          </button>
        </>
    )
}

export default AddtoCartIcon
