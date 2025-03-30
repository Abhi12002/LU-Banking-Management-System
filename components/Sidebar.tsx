'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react'
import Footer from './Footer'
import { useState , useEffect} from 'react';
import { usePlaidLink } from "react-plaid-link";
import Alert from './Alert';
const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/sign-in' });
};
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [alertKey, setAlertKey] = useState<number>(0);
  useEffect(() => {
    // Fetch link token from API
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid", { method: "POST" });
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };
    fetchLinkToken();
  }, []);

   const { open, ready } = usePlaidLink({
      token: linkToken!,
      onSuccess: async (publicToken, metadata) => {
        const userId = session?.user.id; // Replace with actual user ID, possibly from context or state
  
        // Extract relevant data from metadata
        const institution = metadata.institution;
        const accounts = metadata.accounts;
        const transfer_status = metadata.transfer_status;
        const link_session_id = metadata.link_session_id;
  
        // Send data to your API
        const res = await fetch("/api/plaid-exchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,         // Add userId to the request body
            publicToken,    // Send public token here
            institution,    // Send institution info
            accounts,       // Send accounts info
            transfer_status, // Send transfer status
            link_session_id // Send link session ID
          }),
        });
  
        const data = await res.json();
        if(data.error){
            setAlertKey(prevKey => prevKey + 1);
        }
        else{
          await signOut({ redirect: true, callbackUrl: '/sign-in' });
        }
    
  
      },
      onExit: (error, metadata) => console.log("User exited Plaid:", error, metadata),
    });

  return (
    <section className="sidebar">
      <nav className="flex md:flex-col h-[6rem] space-between mb-[2rem] md:mb-[0]">
        <Link href="/" className="mb-12 mr-[4rem] cursor-pointer flex-col items-center gap-2">
          <Image 
            src="/icons/logo.png"
            width={600}
            height={600}
            alt="LU Banking Management logo"
            className="w-[16rem] h-[8rem] md:w-[15rem] md:h-[6rem] mb-4 lg:w-[20rem]"
          />
          <h1 className="sidebar-logo">LU Banking Management</h1>
        </Link>
        <div className='flex-col hidden md:block'>
        {sidebarLinks.map((item) => {
          
          const isActive = pathname === item.route || pathname?.startsWith(`${item.route}/`)

          return (
            <div key={item.label} className={!session?.user.isAdmin && item.label ==="Admin Dashboard"? "hidden" :  ""}>
            <Link href={item.route} key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive }, )}
            >
              <div className="relative size-6 ">
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
            </div>
          )
        })}
        </div>
      <button
        className="md:hidden p-2 bg-gray-800 text-white absolute rounded-md top-4 right-4 z-50 w-[3rem] h-[4rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-48 bg-gray-900 shadow-lg flex flex-col items-start p-4 space-y-4 text-white z-50">
          <button className="text-white my-4 self-end ml-auto" onClick={() => setIsOpen(false)}>X</button>
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname?.startsWith(`${item.route}/`);
            return (
              <div key={item.label} className={!session?.user.isAdmin && item.label ==="Admin Dashboard"? "hidden" :  "py-2 px-4 w-full rounded-md"}>
              <Link href={item.route} key={item.label}
                className={cn('sidebar-link ', { 'bg-bank-gradient': isActive })}
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-6 h-6">
                  <Image 
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn({ 'brightness-[3] invert-0': isActive })}
                  />
                </div>
                <p className={cn("sidebar-label", { "!text-white": isActive })}>{item.label}</p>
              </Link>
              </div>
            );
            
          })}
          <div className='block md:hidden m-auto text-white'><Footer user = {session?.user as User}/></div> 
            <button onClick={() => open()} disabled={!ready} className="flex  mx-auto gap-2 text-[0.8rem]">
              <Image src="/icons/plus.svg" width={20} height={20} alt="plus"/>
                <h2 className=" font-semibold text-white">Add Bank</h2>
            </button>  
           </div>
      )}
   
      </nav>

      <div className='hidden md:block'><Footer user = {session?.user as User}/></div>    
      { alertKey > 0 && (
        <Alert key={alertKey} message="All bank accounts are already linked." type="error" />
      )}
    </section>
  )
}

export default Sidebar