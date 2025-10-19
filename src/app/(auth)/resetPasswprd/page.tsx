'use client'
import { Input } from '../../../components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { useState } from 'react'
import { useForm } from "react-hook-form";

import { Button } from 'image/components/ui/button'

import *as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
    const Route=useRouter()
    const [loading,setLoading]=useState(false)
    let [showPassword,setShowPassword]=useState(false)
    const scheme=z.object({
        email:z.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter valid email"),
        newPassword:z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must include uppercase, lowercase, number, and special character"),
        })
     async function handleLogin(values:z.infer<typeof scheme>){
        setLoading(true)
           const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,{
            method:"put",
            body:JSON.stringify(values),
            headers:{
                "Content-type":"application/json"
            }
           })
           const data=await res.json()
           setLoading(false)
           if(data.statusMsg==="fail"){
            toast.error(data.message,{
                position:"top-center",
                 classNames: {
                      toast: "bg-cyan-800/80 text-white border-none",
                     
                     },
                duration: 1000, 
            });
            
           }
           else{
            Route.push('/login')
              toast.success("Password Updated Successfully",{
                position:"top-center",
                className: "bg-white  ",
                duration: 1000, 
            });
           }
    }
   const registerForm=useForm({
    defaultValues:{
    
    "email":"",
    "newPassword":"",
   
},
resolver:zodResolver(scheme)
   })
    return (
      <div className='w-11/12 md:w-3/4 mx-auto h-screen flex justify-center items-center'>

        <div className='w-full  content-center  p-8 focus:outline-0 focus:border-0  justify-center   items-center '>
  
           <Form {...registerForm} >

              <form className='  border-b-2  border-b-cyan-800 shadow-2xl  md:bg-transparent p-5 space-y-2 rounded-2xl' onSubmit={registerForm.handleSubmit(handleLogin)}> 
                  <p className='text-center text-s md:text-2xl font-mono mb-5 mt-5'>Reset Password...</p>
                    <FormField 
                        control={registerForm.control}
                        name="email"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="absolute text-xs md:text-md left-1 top-3  text-gray-500 ">
                                    Email
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-black text-xs md:text-md">
                                    
                                    Email
                                    </FormLabel>
                                )}
                            <FormControl>
                               <Input type='email' {...field} className='text-xs md:text-md' ></Input>
                            </FormControl>
                            <FormDescription />
                           <FormMessage className='ms-4 text-xs  text-red-700 ' />
                        </FormItem>
                        )}
                    />
                    <FormField 
                        control={registerForm.control}
                        name="newPassword"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className=" text-xs md:text-md absolute left-1 top-3 text-gray-500">
                                    Password
                                    </FormLabel>
                                ):(
                                    <FormLabel className=" text-xs md:text-md text-black">
                                    Password
                                    </FormLabel>
                                )}
                            <FormControl>
                                <div className='w-full relative '>
                               <Input type={`${showPassword?"text":"password"} `} className='text-xs md:text-md ' {...field} ></Input>
                               <i className={`fa ${showPassword?"fa-eye":"fa-eye-slash"} text-xs md:text-md  text-cyan-800  absolute top-3 right-2`} onClick={()=>{setShowPassword(!showPassword)}}></i>
                            </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage className=' text-red-700 text-sm' />
                        </FormItem>
                        )}
                    />
                    {!loading?<Button type='submit' className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'>Reset</Button>:
                    <Button className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white' disabled><i className='fa-solid fa-spinner faspind'></i></Button>}
 
              </form>
           </Form>
          
        </div>
        </div>

    )
}

export default Page
