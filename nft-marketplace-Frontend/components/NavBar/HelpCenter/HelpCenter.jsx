import React from 'react'
import Style from './HelpCenter.module.css'
import Link from 'next/link'

const HelpCenter = () => {

  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign In",
      link: "sign-up",
    },
    {
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Subscription",
      link: "subscription",
    }
  ]
  return (
    <div>
      {/* we will loop over the menu list by making every menu having a unique key*/}
      {helpCenter.map((el, i) => (
        <div key={i + 1} className={Style.helpCenter}><Link href={{ pathname: `$el.name`}}>{el.name}</Link></div>
      ))}
    </div>  
  )
}

export default HelpCenter


  {/*
  OR, Use the syntax below:
  
  <div className={Style.box}>
      we will loop over the menu list by making every menu having a unique key
      {helpCenter.map((el, i) => (
          <div className={Style.helpCenter}>
            <Link href={{ pathname: `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
    */}