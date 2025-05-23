import * as React from 'react'
import { Link } from 'gatsby'
import {
  container,
  mainWrapper,
  navDivider,
  navLinks,
  navLinkItem,
  navLinkTextCurrent,
  navLinkItemSocial,
  navLinkItemStore,
  navLinkText,
  siteTitle,
  navigator,
  social,
  dropdownBtn,
  headerImage,
} from './layout.module.css'
import { StaticImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet';

function navClick() {
  var nav = document.getElementById("nav");
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
  console.log("navclick")
}

const Layout = ({ children }) => {
  return (
    <div className={container}>
      <Helmet>
        <title>Oscar Westberg</title>
      </Helmet>
      <div className={navigator}>
        <header className={siteTitle}>
          <Link to="/" className={navLinkText}>OSCAR WESTBERG</Link>
          <div className={headerImage}>
            <StaticImage alt="Logo" src="../images/logo.png" loading="eager"/>
          </div>
        </header>
        <button className={dropdownBtn} onClick={() => navClick()}>
          <StaticImage alt="dropdown" src="../images/three-bars.svg"/>
        </button>
        <nav id="nav">

          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link getProps={({isCurrent}) => isCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}} to="/">
                Home
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link getProps={({isPartiallyCurrent}) => isPartiallyCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}} to="/comics/">
                Comics
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/ink" getProps={({isPartiallyCurrent}) => isPartiallyCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}}>
                Ink
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/illustration" getProps={({isPartiallyCurrent}) => isPartiallyCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}}>
                Illustration
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" getProps={({isPartiallyCurrent}) => isPartiallyCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}}>
                About
              </Link>
            </li>

            <hr className={navDivider}/>
            
            <li className={navLinkItemStore}>
              <Link to="/commission" getProps={({isPartiallyCurrent}) => isPartiallyCurrent ? {className: navLinkTextCurrent} : {className: navLinkText}}>
                Commission
              </Link>
            </li>
            <li className={navLinkItemStore}>
              <Link to="https://ko-fi.com/oscarwestberg" className={navLinkText}>
                Store (ko-fi)
              </Link>
            </li>
            <li className={navLinkItemStore}>
              <Link to="https://oscarwestberg.gumroad.com" className={navLinkText}>
                Store (Gumroad)
              </Link>
            </li>
            <li className={navLinkItemStore}>
              <Link to="https://www.inprnt.com/gallery/oscarwestberg/" className={navLinkText}>
                Prints
              </Link>
            </li>
            <li className={navLinkItemStore}>
              <Link to="https://www.drivethrurpg.com/browse.php?artist=Oscar%20Westberg" className={navLinkText}>
                Stock Art
              </Link>
            </li>
          </ul>

          <ul className={social}>
            <li className={navLinkItemSocial}>
              <a href="https://x.com/oscarwestberg" className={navLinkText}>
                <StaticImage alt="X" src="../images/x.svg"/>
              </a>
            </li>
            <li className={navLinkItemSocial}>
              <a href="https://gudgurkan.tumblr.com" className={navLinkText}>
                <StaticImage alt="Tumblr" src="../images/tumblr.svg"/>
              </a>
            </li>
            <li className={navLinkItemSocial}>
              <a href="https://instagram.com/oscar_westberg/" className={navLinkText}>
                <StaticImage alt="Instagram" src="../images/instagram.svg"/>
              </a>
            </li>
            <li className={navLinkItemSocial}>
              <a href="https://bsky.app/profile/oscarwestberg.bsky.social" className={navLinkText}>
                <StaticImage alt="Bluesky" src="../images/bluesky.svg"/>
              </a>
            </li>
          </ul>

        </nav>
      </div>
      <div className={mainWrapper}>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
