import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import  Link  from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

import Button from '../components/Button';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="min-h-screen bg-gray-900 text-slate-50">
        <Nav />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

function Nav() {
  const { data: session } = useSession()
  const { name, image } = session?.user || {};

  return (
    <nav className={"w-100 py-2 px-4 flex items-center justify-between"}>
      <div className="flex items-end gap-4">
        <Link href="/"><a className="text-xl font-bold">Dinoku</a></Link>
        <Link href="/builder"><a className="font-semibold">Build</a></Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {image && (
            <img src={image} alt={name} className="rounded-full" width="30" height="30" />
          )}

          {name && (
            <div>
              {name}
            </div>
          )}
        </div>

        {session ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </nav>
  )

}

export default MyApp
