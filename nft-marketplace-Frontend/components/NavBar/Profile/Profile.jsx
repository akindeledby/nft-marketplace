import React from 'react'
import Style from './Profile.module.css'
import Image from 'next/image'
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa"
import { MdHelpCenter } from 'react-icons/md'  
import { TbDownloadOff, TbDownload } from "react-icons/tb"
import Link from 'next/link'
{/*import  images from '../../../img'*/}

const Profile = () => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image src={images.user1} alt="User Profile" width={50} height={50} className={Style.profile_account_img} />      
          <div className={Style.profile_account_info}>
            <p>Michael Stone</p>
            <small>x6584920020facd....</small>
          </div>
        </div>
        <div className={Style.profile_menu}>
          <div className={Style.profile_menu_one}>
            <div className={Style.profile_account_menu_one_item}>
              <FaUserAlt />
              <p>
                <Link href={{pathname: '/myprofile'}}>My Profile</Link>
              </p>
            </div>

            <div className={Style.profile_account_menu_one_item}>
              <FaRegImage />
              <p>
                <Link href={{pathname: '/my-item'}}>My items</Link>
              </p>
            </div>
            <div className={Style.profile_account_menu_one_item}>
              <FaUserEdit />
              <p>
                <Link href={{pathname: '/edit-profile'}}>Edit Profile</Link>
              </p>
            </div>
          </div>
          <div className={Style.profile_menu_two}>
            <div className={Style.profile_menu_two_item}>
              <MdHelpCenter/>
              <p>
                <Link href={{pathname: "/help"}}>Help</Link>
              </p>
            </div>
            <div className={Style.profile_menu_two_item}>
              <TbDownload/>
              <p>
                <Link href={{pathname: "/disconnect"}}>disconnect</Link>
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile
