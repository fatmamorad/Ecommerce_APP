'use client'

import { Form, FormField, FormItem, FormMessage } from '../../../components/ui/form'

import { useForm } from "react-hook-form";
import { Button } from 'image/components/ui/button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'image/components/ui/input-otp';

function Page() {
  const Route = useRouter()
  const scheme = z.object({
    resetCode: z.string()
      .length(6, "Reset code must be 6 digits")
      .regex(/^\d+$/, "Reset code must contain only numbers"),
  })

  async function handleLogin(values: z.infer<typeof scheme>) {
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      })
     const data=await res.json()
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
    <div className='w-3/4 mx-auto h-screen flex justify-center items-center'>
      <div className='w-full lg:w-1/2  content-center p-8'>

        <Form {...registerForm}>
          <form
            className='bg-cyan-50/50 space-y-7 flex justify-center items-center flex-col border-b-2 border-r-2 border-b-cyan-800 border-r-cyan-800 md:bg-transparent p-5 rounded-2xl'
            onSubmit={registerForm.handleSubmit(handleLogin)}
          >
            <p className='text-center text-s md:text-2xl font-mono mb-5 mt-5'>
              Enter Reset Code
            </p>

          
            <FormField
              control={registerForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <InputOTP maxLength={6}  {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage className="text-red-600 text-sm mt-2" />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full mt-3 bg-cyan-800 rounded-2xl cursor-pointer text-white'>
              Verify
            </Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default Page
