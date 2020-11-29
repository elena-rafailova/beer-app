import React from 'react';
import LoaderGif from '../../images/loader.gif';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loading}>
            <img className={styles.loader} src={LoaderGif}/>
        </div>
    );
};

export default Loader;