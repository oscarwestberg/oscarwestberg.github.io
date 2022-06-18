import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const LinksPage = () => {
  return (
    <Layout>
      <article>
        <h2>Art resources</h2>
        <ul>
          <li>
            <Link to="https://www.inprnt.com/gallery/oscarwestberg/">Prints</Link>
          </li>
          <li>
            <Link to="https://www.inprnt.com/gallery/oscarwestberg/">Prints</Link>
          </li>
          <li>
            <Link to="https://www.inprnt.com/gallery/oscarwestberg/">Prints</Link>
          </li>
          <li>
            <Link to="https://www.inprnt.com/gallery/oscarwestberg/">Prints</Link>
          </li>
        </ul>
      </article>
    </Layout>
  )
}

export default LinksPage
