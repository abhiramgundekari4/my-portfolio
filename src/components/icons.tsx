import type { SVGProps } from 'react';

export const Icons = {
  python: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13.2 9.5a2 2 0 1 1-2.4-3.2A2 2 0 0 1 13.2 9.5Z" />
      <path d="m10.5 15.5-2-1-2 1" />
      <path d="M10.8 12.5a2 2 0 1 0 2.4 3.2 2 2 0 0 0-2.4-3.2Z" />
      <path d="m13.5 8.5 2 1 2-1" />
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    </svg>
  ),
  sql: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  dsa: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v2" />
      <path d="m5 5 1.5 1.5" />
      <path d="M3 12h2" />
      <path d="m5 19 1.5-1.5" />
      <path d="M12 21v-2" />
      <path d="m19 19-1.5-1.5" />
      <path d="M21 12h-2" />
      <path d="m19 5-1.5 1.5" />
      <path d="M12 8a4 4 0 0 1 4 4" />
      <path d="M12 16a4 4 0 0 1-4-4" />
    </svg>
  ),
  leetcode: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.303c.467-.467 1.125-.647 1.837-.647.712 0 1.357.18 1.824.647l2.697 2.607c.466.467 1.111.662 1.823.662s1.357-.195 1.824-.662c.466-.467.662-1.111.662-1.823s-.195-1.357-.662-1.824l-2.697-2.607c-1.219-1.219-2.883-1.838-4.837-1.838s-3.618.619-4.837 1.838l-4.319 4.303c-1.219 1.219-1.838 2.883-1.838 4.837s.619 3.618 1.838 4.837l4.332 4.363c1.219 1.219 2.883 1.838 4.837 1.838s3.618-.619 4.837-1.838l2.697-2.607c.466-.467.662-1.111.662-1.823s-.195-1.357-.662-1.824c-.466-.467-1.111-.662-1.823-.662s-1.357.195-1.824.662zm-3.483-11.43l1.581-1.581c.467-.467 1.111-.662 1.824-.662s1.357.195 1.824.662l2.697 2.607c.466.467.662 1.111.662 1.823s-.195 1.357-.662 1.824l-1.581 1.581c-.467.467-1.111.662-1.824.662s-1.357-.195-1.824-.662c-.467-.467-.662-1.111-.662-1.823s.195-1.357.662-1.824z"/>
    </svg>
  )
};
