import UserSelect from '../UserSelect/UserSelect';
import styles from './Header.module.css';



function Header(){


  return(
    <>
      <img className={styles.logo} src="/logo.svg" alt="logo" />
      <UserSelect/>
    </>
  );

}

export default Header;