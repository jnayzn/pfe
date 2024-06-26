import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className='flex min-h-screen items-center justify-center '>
        <div className='w-full max-w-md rounded-xl bg-white p-10 shadow-xl'>
          <h2 className='text-primary mb-10 text-center text-3xl font-bold'>
            Register
          </h2>
          <form>
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block text-sm font-semibold text-gray-700'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                className='focus:ring-primary focus:border-primary mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='focus:ring-primary focus:border-primary mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-semibold text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='focus:ring-primary focus:border-primary mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-semibold text-gray-700'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirm-password'
                className='focus:ring-primary focus:border-primary mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none'
                required
              />
            </div>
            <Button className=' w-full bg-gray-700 text-white'>Register</Button>
          </form>
          <p className='mt-6 text-center text-gray-600'>
            Already have an account?{" "}
            <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
