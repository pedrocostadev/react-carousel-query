import PropTypes from 'prop-types'
import { ReactCarousel } from '../'

const pictures = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
]

const Img = ({ src, alt }) => (
  <img
    alt={alt}
    draggable={false}
    style={{
      display: 'block',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    }}
    src={src}
  />
)

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default {
  title: 'Examples/Without Query Manager',
  component: ReactCarousel,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '80vw', height: '60vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const StaticItems = {
  render: () => (
    <ReactCarousel>
      {pictures.map((imgSrc, index) => (
        <Img key={index} src={imgSrc} alt={`Picture ${index + 1}`} />
      ))}
    </ReactCarousel>
  ),
}

export const WithArrows = {
  render: () => (
    <ReactCarousel showArrows>
      {pictures.map((imgSrc, index) => (
        <Img key={index} src={imgSrc} alt={`Picture ${index + 1}`} />
      ))}
    </ReactCarousel>
  ),
}
