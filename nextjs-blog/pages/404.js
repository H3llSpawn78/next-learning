import utilStyles from '../styles/Utils.module.css';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <h1 className={utilStyles.textCenter}>
        404 - Ooops! Something's not quite right.
      </h1>
        <div className={`${styles.backToHome} ${utilStyles.textCenter}`}>
          <Link href="/">← Back to home</Link>
        </div>
    </>
  ); 
}