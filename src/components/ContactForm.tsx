'use client'
import React from 'react'
import {useFormik} from 'formik'
import {toFormikValidationSchema} from 'zod-formik-adapter'
import {SendEmailSchema} from '@/types'
import classNames from 'classnames'
import {toast} from 'react-toastify'
import {sendeEmailToServer} from '@/utils/api'

export const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
    validationSchema: toFormikValidationSchema(SendEmailSchema),
    onSubmit: async values => {
      const result = await sendeEmailToServer(values)
      if (result.id) {
        toast.success('Email successfully sent')
        return
      } else {
        toast.error('Error sending email')
        return
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="mt-16">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            First name <span className="text-red-500">*</span>
            {formik.touched.firstName && formik.errors.firstName ? (
              <span className="text-xs text-red-500">
                {formik.errors.firstName}
              </span>
            ) : null}
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              id="firstName"
              autoComplete="given-name"
              className={classNames(
                'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                {
                  'ring-red-500': formik.errors.firstName,
                },
              )}
              {...formik.getFieldProps('firstName')}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Last name <span className="text-red-500">*</span>
            {formik.touched.lastName && formik.errors.lastName ? (
              <span className="text-xs text-red-500">
                {formik.errors.lastName}
              </span>
            ) : null}
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              id="lastName"
              autoComplete="family-name"
              className={classNames(
                'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                {
                  'ring-red-500': formik.errors.lastName,
                },
              )}
              {...formik.getFieldProps('lastName')}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email <span className="text-red-500">*</span>
            {formik.touched.email && formik.errors.email ? (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            ) : null}
          </label>
          <div className="mt-2.5">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={classNames(
                'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                {
                  'ring-red-500': formik.errors.email,
                },
              )}
              {...formik.getFieldProps('email')}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Company <span className="text-red-500">*</span>
            {formik.touched.company && formik.errors.company ? (
              <span className="text-xs text-red-500">
                {formik.errors.company}
              </span>
            ) : null}
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              id="company"
              autoComplete="organization"
              className={classNames(
                'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                {
                  'ring-red-500': formik.errors.company,
                },
              )}
              {...formik.getFieldProps('company')}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between text-sm leading-6">
            <label
              htmlFor="phone"
              className="block font-semibold text-gray-900"
            >
              Phone
            </label>
            <p id="phone-description" className="text-gray-400">
              Optional
            </p>
          </div>
          <div className="mt-2.5">
            <input
              type="tel"
              id="phone"
              autoComplete="tel"
              aria-describedby="phone-description"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('phone')}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between text-sm leading-6">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              How can we help you? <span className="text-red-500">*</span>
              {formik.touched.message && formik.errors.message ? (
                <span className="text-xs text-red-500">
                  {formik.errors.message}
                </span>
              ) : null}
            </label>
            <p id="message-description" className="text-gray-400">
              Max 500 characters
            </p>
          </div>
          <div className="mt-2.5">
            <textarea
              id="message"
              rows={4}
              aria-describedby="message-description"
              className={classNames(
                'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                {
                  'ring-red-500': formik.errors.message,
                },
              )}
              {...formik.getFieldProps('message')}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send message
        </button>
      </div>
    </form>
  )
}
