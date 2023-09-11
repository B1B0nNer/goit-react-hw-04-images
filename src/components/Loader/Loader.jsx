import { MagnifyingGlass } from 'react-loader-spinner';
import './loader.css';

const Loader = () => {
  return (
    <div className="loaderPlaceholder">
      <MagnifyingGlass
        visible={true}
        height="150"
        width="150"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;