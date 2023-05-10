import React from 'react'
import Style from './Discover.module.css'
import Link from 'next/link';

const Discover = () => {

// We  will create the menu list for the Discover page
  const  discover = [
    {
      name: "Collection",
      link: "collection"
    },
    {
      name: "Search",
      link: "search"
    },
    {
      name: "Author Profile",
      link: "author-profile"
    },
    {
      name: "NFT Details",
      link: "nft-details"
    },
    {
      name: "Account Settings",
      link: "account-settings"
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet"
    },
    {
      name: "Blog",
      link: "blog"
    },
  ];
  return (
    <div>
      {/* we will loop over the menu list by making every menu having a unique key*/}
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}><Link href={{ pathname: `$el.name`}}>{el.name}</Link></div>
      ))}
    </div>
  )
}

export default Discover
