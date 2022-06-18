import * as React from 'react'
import Layout from '../components/layout'
import '../css/content.css'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <Layout>
      <article>
        <h1>About</h1>
        <p>I'm a Swedish illustrator and comic creator mainly drawing in traditional ink. 
          I'm currently working on personal projects but I'm open for business inquiries. 
          You can also contact me for commission status. I can be reached through social 
          media direct messaging, I'm most active on twitter and tumblr.</p>
        <h1>Recent projects</h1>
        <div class="project">
          <Link to="https://twitter.com/oscarwestberg/status/1512479034717790211">
            <StaticImage alt="RPG items" src="../images/projects/items.png"/>
          </Link>
        </div>
        <div class="project">
          <Link to="/comics/magics-descent">
            <StaticImage alt="Magic's Descent" src="../images/projects/magicsdescent.png"/>
          </Link>
        </div>
        <div class="project">
          <Link to="https://www.inprnt.com/gallery/oscarwestberg/">
            <StaticImage alt="Print" src="../images/projects/malenia.png"/>
          </Link>
        </div>
      </article>
    </Layout>
  )
}

export default IndexPage
