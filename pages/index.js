import UserForm from "@/components/Userform";
import { useSession, signIn, signOut } from "next-auth/react"

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()
  if(session) {
    return <>
     <UserForm/>
      
    </>
  }

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen  items-center max-w-4xl m-auto">
        <h1 className="text-4xl font-bold max-w-lg text-center">
          WELCOME TO THE WEBSITE
        </h1>
        <p className="font-medium my-4 ">
          A account is required to view the page
        </p>
        <button  onClick={() => signIn('google')}
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3
             text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none 
             focus:ring active:text-indigo-500"
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}
