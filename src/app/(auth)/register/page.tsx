'use client'
import { Input } from '../../../components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import React, { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";

import { Button } from 'image/components/ui/button'
import Image from 'next/image';
import *as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Page() {
    const Route=useRouter()
    const [showPassword,setShowPassword]=useState(false)
    const [showrePassword,setShowrePassword]=useState(false)
    const [loading ,setLoading]=useState(false)
    const scheme=z.object({
        name:z.string().nonempty("Name is required").min(3,"Name must be at least 3 characters"),
        email:z.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter valid email"),
        password:z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must include uppercase, lowercase, number, and special character"),
        rePassword:z.string().nonempty("Confirm Password is required"),
        phone:z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/,"Please enter Egyption Number...")
    }).refine((values)=>{
        return values.password===values.rePassword
    },{
        path:['rePassword'],
        error:"Confirm password not match.."
    })
     async function handleRegister(values:z.infer<typeof scheme>){
        setLoading(true)
        console.log(process.env.NEXT_PUBLIC_BASE_URL)
           const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
            method:"post",
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
              toast.success("User Register Successfully",{
                position:"top-center",
                className: "bg-white  ",
                duration: 1000, 
            });
           }
           console.log(data)
    }
   const registerForm=useForm({
    defaultValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
},
resolver:zodResolver(scheme)
   })
    return (
      <div className='w-3/4 mx-auto h-screen flex justify-centeritems-center'>

        <div className='grid grid-cols-12 w-full '>
        <div className='col-span-12 lg:col-span-6  content-center place-content-center place-items-center  p-8 focus:outline-0 focus:border-0    items-center w-full'>
  
           <Form {...registerForm} >

              <form className='bg-cyan-50/50   border-b-2 border-r-2  border-b-cyan-800 border-r-cyan-800 md:bg-transparent p-5 space-y-3 w-full rounded-2xl' onSubmit={registerForm.handleSubmit(handleRegister)}> 
                  <p className='text-center text-s md:text-2xl font-mono mb-5 mt-5'>Register Now...</p>
                   
                    <FormField 
                        control={registerForm.control}
                        name="name"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="absolute left-1  text-xs md:text-md top-3 text-gray-500">
                                    Name
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-black text-xs md:text-md">
                                    Name
                                    </FormLabel>
                                )}
                            <FormControl>
                               <Input type='text' {...field} className='
                              focus:ring-0 focus:outline-none text-xs md:text-md focus:border-none'></Input>
                            </FormControl>
                            <FormDescription />
                             <FormMessage className='ms-4  text-red-700 text-sm' />
                        </FormItem>
                        )}
                    />
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
                        name="password"
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
                               <Input type={`${showPassword?"text":"password"} `} className='text-xs md:text-md' {...field} ></Input>
                               <i className={`fa ${showPassword?"fa-eye":"fa-eye-slash"} text-xs md:text-md  text-cyan-800  absolute top-3 right-2`} onClick={()=>{setShowPassword(!showPassword)}}></i>
                            </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage className='ms-4  text-red-700 text-sm' />
                        </FormItem>
                        )}
                    />
                   <FormField 
                        control={registerForm.control}
                        name="rePassword"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="absolute text-xs md:text-md left-1 top-3 text-gray-500">
                                    Repassword
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-black text-xs md:text-md">
                                    Repassword
                                    </FormLabel>
                                )}
                            <FormControl>
                                <div className='w-full relative'>
                               <Input type={`${showrePassword?"text":"password"}`} className='text-xs md:text-md' {...field} ></Input>
                               <i className={`fa ${showrePassword?"fa-eye":"fa-eye-slash"}  text-xs md:text-md text-cyan-800  absolute top-3 right-2`} onClick={()=>{setShowrePassword(!showrePassword)}}></i>
                            </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage className='ms-4 text-red-700 text-sm' />
                        </FormItem>
                        )}
                    />
                    <FormField 
                        control={registerForm.control}
                        name="phone"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="absolute  text-xs md:text-md left-1 top-3 text-gray-500">
                                    Phone
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-xs md:text-md text-black">
                                    Phone
                                    </FormLabel>
                                )}
                            <FormControl>
                               <Input type='tel' {...field}   className='text-xs md:text-md'></Input>
                            </FormControl>
                            <FormDescription />
                             <FormMessage className='ms-4   text-red-700 text-sm' />
                        </FormItem>
                        )}
                    />
                    {!loading?<Button type='submit' className='w-full bg-cyan-800 rounded-2xl cursor-pointer text-white'>Register</Button>
                     : <Button type='submit' className='w-full bg-cyan-800 rounded-2xl cursor-pointer text-white'><i className='fa-solid fa-spinner fa-spin'></i></Button> }
                     
              </form>
           </Form>
          
        </div>
        <div className='lg:block lg:col-span-6 hidden relative'>
            <Image src='/Group 2014 (1).png' alt='registerImage' width={200} height={100} className='w-full'/>        </div>
        </div>
      </div>
    )
}

export default Page
