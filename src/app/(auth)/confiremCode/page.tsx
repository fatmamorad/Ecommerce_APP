'use client'

import { Form, FormField, FormItem, FormMessage } from '../../../components/ui/form'

import { useForm } from "react-hook-form";
import { Button } from 'image/components/ui/button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'image/components/ui/input-otp';
import { useState } from 'react';

function Page() {
  const [loading,setLoading]=useState(false)
  const Route = useRouter()
  const scheme = z.object({
    resetCode: z.string()
      .regex(/^\d+$/, "Reset code must contain only numbers"),
  })

  async function handleLogin(values: z.infer<typeof scheme>) {
    setLoading(true)
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
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
                 Route.push('/resetPasswprd')
                   toast.success("User Login Successfully",{
                     position:"top-center",
                     className: "bg-white  ",
                     duration: 1000, 
                 });
                }
     console.log(data)
  }

  const registerForm = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(scheme)
  })

  return (
    <div className="md:w-1/2 w-11/12  min-h-screen flex justify-center items-center bg-gradient-to-b from-cyan-50 to-white px-4">
      <div className="w-full  bg-white shadow-lg border border-cyan-100 rounded-2xl p-6 sm:p-8">
        
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleLogin)}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-lg sm:text-2xl font-mono text-cyan-900 text-center">
              Enter Reset Code
            </p>

            <FormField
              control={registerForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="w-full flex justify-center items-center ">
                  <InputOTP maxLength={6} {...field} >
                    <InputOTPGroup >
                      <InputOTPSlot index={0} className='h-8 w-8' />
                      <InputOTPSlot index={1} className='h-8 w-8' />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} className='h-8 w-8' />
                      <InputOTPSlot index={3} className='h-8 w-8' />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4}className='h-8 w-8'  />
                      <InputOTPSlot index={5} className='h-8 w-8' />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage className="text-red-600 text-sm mt-2 text-center" />
                </FormItem>
              )}
            />
            {!loading? <Button
              type="submit"
              
              className="w-full sm:w-2/3 bg-cyan-800 hover:bg-cyan-700 text-white font-medium py-2 rounded-xl transition-all duration-200"
            >
              Verify
            </Button>:
             <Button disabled className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'> <i className='fa fa-spinner fa-spin'></i> </Button>}
           
          </form>
        </Form>

      </div>
    </div>
  );
}

export default Page
