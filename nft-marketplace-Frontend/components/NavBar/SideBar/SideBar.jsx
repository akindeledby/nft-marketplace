import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GrClose } from "react-icons/gr"
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Style from './SideBar.module.css'
{/*import images from "../../../img"*/}
import Button from '../../Buttons/Button'

const SideBar = ({ setOpenSideMenu }) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  // DISCOVER NAVIGATION MENU
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

  // HELPCENTER NAVIGATION MENU
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
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Subscription",
      link: "subscription",
    }
  ];

  const openDiscoverMenu = () => {
    if(!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if(!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
      <div className={Style.sideBar}>
        <GrClose className={Style.sideBar_closeBtn} onClick ={() => closeSideBar()}/>
        <div className={Style.sideBar_box}>
          {/*<Image src = {images.logo} alt="logo" width={150} height={150}/>*/}
          <p>
            Discover the most outstanding articles on all topics of NFT and tell your own story as well share them.
          </p>

          <div className={Style.sideBar_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
          </div>
        </div>
        
        <div className={Style.sideBar_menu}>
          <div>
              <div className={Style.sideBar_menu_box} onClick={() => openDiscoverMenu()}>
                <p>Discover</p>
                <TiArrowSortedDown />
              </div>
              {openDiscover && (
              <div className={Style.sideBar_discover}> 
                {discover.map((el, i) => (
                <p key={i + 1} className={Style.discover}><Link href={{ pathname: `$el.name`}}>{el.name}</Link></p>
                ))}
              </div>
              )}
          </div>
            <div>
              <div className={Style.sideBar_menu_box} onClick={() => openHelpMenu()}>
                <p>Help Center</p>
                <TiArrowSortedDown />
              </div>
                {openHelp && (
                  <div className={Style.sidebar_helpCenter}>
                    {helpCenter.map((el, i) => (
                    <p key={i + 1} className={Style.helpCenter}><Link href={{ pathname: `$el.name`}}>{el.name}</Link></p> 
                      ))}
                  </div>
                )}
            </div> 
          </div>

          {/*We will create two buttons here, one for connecting wallet and one for creating NFT */}
          <div className={Style.sideBar_button}>
            {/* The function we will pass here will be built on the smart contract(backend side) and pass into here*/}
              <Button btnName="Create NFT" />
              <Button btnName="Connect wallet" handleClick={() => {}}/>
          </div>
        </div>

  );
};

export default SideBar;
