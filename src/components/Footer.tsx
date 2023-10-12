import Link from 'next/link'
import React from 'react'
import {socialMediaProfiles} from '@/components/SocialMedia'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {FooterSchema} from '@/types'
import {Subscribe} from './Subscribe'

export const Footer = async () => {
  // const navigation = [
  //   {
  //     title: 'Work',
  //     links: [
  //       {title: 'FamilyFund', href: '/work/family-fund'},
  //       {title: 'Unseal', href: '/work/unseal'},
  //       {title: 'Phobia', href: '/work/phobia'},
  //       {
  //         title: (
  //           <>
  //             See all <span aria-hidden="true">&rarr;</span>
  //           </>
  //         ),
  //         href: '/work',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Company',
  //     links: [
  //       {title: 'About', href: '/about'},
  //       {title: 'Process', href: '/process'},
  //       {title: 'Blog', href: '/blog'},
  //       {title: 'Contact us', href: '/contact'},
  //     ],
  //   },
  //   {
  //     title: 'Connect',
  //     links: socialMediaProfiles,
  //   },
  // ]

  const query = gql`
    query {
      homepage {
        data {
          attributes {
            footer {
              newsletter {
                title
                description
              }
              sections {
                id
                title
                links {
                  id
                  label
                  href
                }
              }
            }
          }
        }
      }
    }
  `

  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const validatedFooter = FooterSchema.safeParse(
    data.homepage.data.attributes.footer,
  )

  if (!validatedFooter.success) {
    throw new Error('Failed to fetch Footer')
  }

  const {sections, newsletter} = validatedFooter.data

  return (
    <footer className=" bg-gray-900 mt-8">
      <div className="py-8 container mx-auto p-2">
        <nav>
          <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {sections.map(section => (
              <li key={section.id}>
                <div className="font-display text-sm font-semibold tracking-wider text-white">
                  {section.title}
                </div>
                <ul role="list" className="mt-4 text-sm text-white">
                  {section.links.map(link => (
                    <li key={link.id} className="mt-4">
                      <Link
                        href={link.href ?? '/'}
                        className="transition hover:text-blue-800"
                      >
                        {link.label}
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
              {newsletter.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              {newsletter.description}
            </p>
          </div>
          <Subscribe />
        </div>
      </div>
    </footer>
  )
}
