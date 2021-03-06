// * Styles
import styles from './style.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className='preloader-wrapper active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle' />
          </div>
          <div className='gap-patch'>
            <div className='circle' />
          </div>
          <div className='circle-clipper right'>
            <div className='circle' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
