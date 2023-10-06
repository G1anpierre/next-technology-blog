import {Bars3Icon} from '@heroicons/react/24/outline'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import Link from 'next/link'
import {MobileMenu} from './MobileMenu'
import Image from 'next/image'

const query = gql`
  query {
    homepage {
      data {
        attributes {
          header {
            tabs {
              label
              href
            }
          }
        }
      }
    }
  }
`

export const Header = async () => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const {tabs} = data.homepage.data.attributes.header

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Dev Notebook</span>
            <Image
              className="h-8 w-auto"
              src="/dev-notebook-high-resolution-logo-color-on-transparent-background.png"
              alt="Dev Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            // onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {tabs.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
      <MobileMenu tabs={tabs} />
    </header>
  )
}
