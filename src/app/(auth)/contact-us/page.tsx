'use client';

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ContactUsCredentialsValidator, TContactUsCredentialsValidator } from "@/lib/validators/contact-us-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const isLoading = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactUsCredentialsValidator>({
    resolver: zodResolver(ContactUsCredentialsValidator),
  })

  const onSubmit = ({
    email,
  }: TContactUsCredentialsValidator) => {
    console.log({ email })

    router.refresh()

    router.push('/verify-email')
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-32 w-40' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Contact us
            </h1>

            <Link
              aria-disabled={true}
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-in'>
              Already have an account? Sign in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500':
                        errors.email,
                    })}
                    placeholder='email@nimbloo.com'
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  Send
                  {isLoading && (
                    <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
