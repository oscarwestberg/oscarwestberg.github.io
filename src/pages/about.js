import * as React from 'react'
import Layout from '../components/layout'
import '../css/content.css'
import { Link } from 'gatsby'

const AboutPage = () => {
  return (
    <Layout>
      <div class="content">
        <p>Oscar Westberg is a Swedish freelance illustrator and comic creator. Currently open for business inquiries and <Link to="/commission">personal commissions.</Link></p>
        <p>You can reach me at <a href="mailto:westbergbusiness@gmail.com">westbergbusiness@gmail.com</a> or through social media.</p>
      </div>
    </Layout>
  )
}

export default AboutPage
