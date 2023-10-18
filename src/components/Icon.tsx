import React from 'react'
import {
  AcademicCapIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'

export const Icon = ({icon}: {icon: string}) => {
  const icons = {
    rocket: <RocketLaunchIcon />,
    hand: <HandRaisedIcon />,
    people: <UserGroupIcon />,
    cap: <AcademicCapIcon />,
    stars: <SparklesIcon />,
    sun: <SunIcon />,
  }

  return (
    <div
      className="absolute left-1 top-1 h-5 w-5 text-primary"
      aria-hidden="true"
    >
      {icons[icon as keyof typeof icons]}
    </div>
  )
}
