import loadingGif from '../loading.gif'

//Component used when loading customer orders
const LoadingSpinner = () => {
    return ( 
        <img
        src={loadingGif}
        alt='Loading...'
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
     );
}
 
export default LoadingSpinner;