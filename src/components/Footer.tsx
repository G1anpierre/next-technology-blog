import Link from 'next/link'
import React from 'react'
import {socialMediaProfiles} from '@/components/SocialMedia'

export const Footer = () => {
  const navigation = [
    {
      title: 'Work',
      links: [
        {title: 'FamilyFund', href: '/work/family-fund'},
        {title: 'Unseal', href: '/work/unseal'},
        {title: 'Phobia', href: '/work/phobia'},
        {
          title: (
            <>
              See all <span aria-hidden="true">&rarr;</span>
            </>
          ),
          href: '/work',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {title: 'About', href: '/about'},
        {title: 'Process', href: '/process'},
        {title: 'Blog', href: '/blog'},
        {title: 'Contact us', href: '/contact'},
      ],
    },
    {
      title: 'Connect',
      links: socialMediaProfiles,
    },
  ]

  return (
    <footer className=" bg-gray-900 my-8">
      <div className="py-8 container mx-auto p-2">
        <nav>
          <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {navigation.map(section => (
              <li key={section.title}>
                <div className="font-display text-sm font-semibold tracking-wider text-white">
                  {section.title}
                </div>
                <ul role="list" className="mt-4 text-sm text-white">
                  {section.links.map(link => (
                    <li key={link.href} className="mt-4">
                      <Link
                        href={link.href ?? '/'}
                        className="transition hover:text-blue-800"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  )
}
