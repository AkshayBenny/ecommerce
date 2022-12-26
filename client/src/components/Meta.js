
import { Helmet } from 'react-helmet'

const Meta = ({ title, content, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='decription' content={content} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Gauss',
  content: 'Get the latest tech products here',
  keywords: 'tech, cheap, online, products',
}

export default Meta
