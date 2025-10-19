'use client'

import { Input } from '../../../components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../components/ui/form'

import { useForm } from "react-hook-form";
import { Button } from 'image/components/ui/button'
import Image from 'next/image';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const [loading,setLoading]=useState(false)
  const Route = useRouter()
  const scheme = z.object({
    email: z.string()
      .nonempty("Email is required")
      .email("Please enter valid email")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email"),
  })
  async function handleforgetPassword(values: z.infer<typeof scheme>) {
    setLoading(true)
    try {
      
      console.log(process.env.NEXT_PUBLIC_BASE_URL)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
       setLoading(false)
      if (data.statusMsg === "success") {
        Route.push('/confiremCode')
        toast.success("Reset code sent to your email", {
          position: "top-center",
          className: "bg-white",
          duration: 1000,
        })
      }

      console.log(data)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
       setLoading(false)
    }
  }

  const registerForm = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(scheme)
  })

  return (
    <div className='w-11/12 md:w-3/4 mx-auto h-screen flex justify-center items-center'>
      <div className='w-full  mx-auto content-center p-8'>

        <Form {...registerForm}>
          <form
            className=' border-b-2 border-r-2 border-b-cyan-800 border-r-cyan-800 md:bg-transparent p-5 space-y-2 rounded-2xl'
            onSubmit={registerForm.handleSubmit(handleforgetPassword)}
          >
            <p className='text-center text-s md:text-2xl font-mono text-cyan-800'>
              Forget Password...
            </p>

            <div className='flex justify-center items-center'>
              <Image
                src='/confirmcode-removebg-preview.png'
                alt='confirmcode'
                width={200}
                height={200}
              />
            </div>

            {/* Email Input */}
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className='relative mt-5'>
                  {!field.value ? (
                    <FormLabel className="absolute text-xs md:text-md left-1 top-3 text-gray-500">
                      Enter email address
                    </FormLabel>
                  ) : (
                    <FormLabel className="text-black text-xs md:text-md">
                      Email
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input type='email' {...field} className='text-xs md:text-md' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className='ms-4 text-xs text-red-700' />
                </FormItem>
              )}
            />
          {
            !loading?
            <Button
              type='submit'
              className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'
            >
              Send code
            </Button>:
            <Button
              disabled
              className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'
            >
              <i className='fa-solid fa-spinner fa-spin'></i>
            </Button>
          }
            
          </form>
        </Form>

      </div>
    </div>
  )
}

export default Page
