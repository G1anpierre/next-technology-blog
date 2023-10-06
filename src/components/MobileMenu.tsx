'use client'

import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

export const MobileMenu = ({tabs}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Dev Notebook</span>
            <Image
              className="h-8 w-auto"
              src="/dev-notebook-high-resolution-logo-color-on-transparent-background.png"
              alt="Dev Logo"
              width={200}
              height={200}
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/25">
            <div className="space-y-2 py-6">
              {tabs.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              {/* <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
            >
              Log in
            </a> */}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
