import ReactCarouselQuery from '../'

const pictures = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
]

const getData = async () => ({
  items: pictures.map((picSrc, index) => ({ id: index, picSrc, name: `Picture ${index + 1}` })),
  offset: 3,
  limit: 3,
  total: 3,
})

const renderItem = ({ item }) => (
  <img
    draggable={false}
    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    alt={item.name}
    src={item.picSrc}
  />
)

const renderArrow = ({ variant, onClick }) => (
  <button
    onClick={onClick}
    style={{
      height: 40,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: 4,
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      [variant]: '10px',
    }}
  >
    {variant === 'left' ? '←' : '→'}
  </button>
)

export default {
  title: 'Examples/Custom Arrows',
  component: ReactCarouselQuery,
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

export const CustomArrows = {
  render: () => (
    <ReactCarouselQuery renderItem={renderItem} getData={getData} renderArrow={renderArrow} />
  ),
}
