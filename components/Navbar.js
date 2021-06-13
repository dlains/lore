import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav>
      <Link href='/'>
        <a className='text-2xl mb-2 block text-center uppercase'>David Lains</a>
      </Link>
      <div className="flex space-x-3 justify-center mb-6 m-x-auto">
        <Link href='/about'>
          <a className='hover:underline'>About</a>
        </Link>
        <Link href='/projects'>
          <a className='hover:underline'>Projects</a>
        </Link>
        { !isLoading && !user && (
          <Link href='/api/auth/login'>
            <a className='hover:underline'>Login</a>
          </Link>
        )}
        { !isLoading && user && (
          <>
            <Link href='/posts/create'>
              <a className='hover:underline'>Create Post</a>
            </Link>
            <Link href='/api/auth/logout'>
              <a className='hover:underline'>Logout</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}