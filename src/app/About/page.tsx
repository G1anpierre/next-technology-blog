import React from 'react'
import {HeroAbout} from '@/components/HeroAbout'
import {HeroValues} from '@/components/HeroValues'

export const metadata = {
  title: 'About',
  description: 'About us',
}

export default async function About() {
  return (
    <>
      <HeroAbout />
      <HeroValues />
    </>
  )
}
