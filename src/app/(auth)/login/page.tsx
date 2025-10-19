'use client'
import { Input } from '../../../components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {  signIn } from "next-auth/react"
import { Button } from 'image/components/ui/button'
import *as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

function Page() {
    const Route=useRouter()
    let [loading,setloading]=useState<boolean>(false)
    let [showPassword,setShowPassword]=useState(false)
    const scheme=z.object({
        email:z.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter valid email"),
        password:z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must include uppercase, lowercase, number, and special character"),
        })
     async function handleLogin(values:z.infer<typeof scheme>){
        setloading(true)
     const dtat=await  signIn('credentials',{
          email: values.email,
           password: values.password,
           redirect: false,
     })
     if(dtat?.ok){
        toast.success("User login Successfully",{
                position:"top-center",
                duration: 1000, 
            })
        window.location.href='/'
     }
     else {
        toast.error("Invalid username or password ",{
                position:"top-center",
                duration: 1000, 
            })
     }
     setloading(false)
    }
   const registerForm=useForm({
    defaultValues:{
    
    "email":"",
    "password":"",
   
},
resolver:zodResolver(scheme)
   })
    return (
      <div className='w-11/12 md:w-3/4 mx-auto min-h-screen flex justify-center items-center'>

        <div className='content-center  p-8 focus:outline-0 focus:border-0    items-center w-full'>
  
           <Form {...registerForm} >

              <form className='  border-b-2 border-r-2  border-b-cyan-800 border-r-cyan-800  p-5 space-y-2 rounded-2xl' onSubmit={registerForm.handleSubmit(handleLogin)}> 
                  <p className='text-center text-x sm:text-xl md:text-2xl font-mono mb-5 mt-5'>Login Now...</p>

                     {/* Email Input  */}
                    <FormField 
                        control={registerForm.control}
                        name="email"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="absolute text-xs sm:text-s md:text-x left-1 top-3  text-gray-500 ">
                                    Email
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-black text-xs sm:text-s md:text-x">
                                    
                                    Email
                                    </FormLabel>
                                )}
                            <FormControl>
                               <Input {...field} className='text-xs sm:text-s md:text-x' ></Input>
                            </FormControl>
                            <FormDescription />
                           <FormMessage className='ms-4 text-xs  text-red-700 ' />
                        </FormItem>
                        )}
                    />
 


  {/* password Input  */}
                    <FormField 
                        control={registerForm.control}
                        name="password"
                        render={({field}) => (
                        <FormItem className='relative'>
                            {!field.value? (
                                    <FormLabel className="text-xs sm:text-s md:text-x absolute left-1 top-3 text-gray-500">
                                    Password
                                    </FormLabel>
                                ):(
                                    <FormLabel className="text-xs sm:text-s md:text-x text-black">
                                    Password
                                    </FormLabel>
                                )}
                            <FormControl>
                                <div className='w-full  relative'>
                               <Input type={`${showPassword? "text":"password"}`} className='text-xs sm:text-s md:text-x' {...field} ></Input>
                               <i className={`fa ${showPassword?"fa-eye":"fa-eye-slash"}   text-xs sm:text-s md:text-x  text-cyan-800  absolute top-3 right-2`} onClick={()=>{setShowPassword(!showPassword)}}></i>
                            </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage className=' text-red-700 text-xs sm:text-s md:text-x' />
                        </FormItem>
                        )}
                    />



                    <Link href='/forgetPassword' className='text-cyan-800'> 
                    <p className='text-center text-xs sm:text-s md:text-x font-mono'>Forget Password ?
                    </p>

                    </Link>
                    {loading?<Button disabled className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'> <i className='fa fa-spinner fa-spin'></i> </Button>
             :<Button type='submit' className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'> LOGIN </Button>
             }
                    </form>
           </Form>
          
        </div>
     
      </div>
    )
}

export default Page
