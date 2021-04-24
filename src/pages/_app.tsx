import Header from "../components/Header";
import Player from '../components/Player';
import SharedContext from '../context/global';
import '../styles/global.scss';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SharedContext>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </SharedContext>
  )
}

export default MyApp
