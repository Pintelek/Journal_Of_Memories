import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import classNames from 'classnames';
import styles from './UserSelect.module.css';

function UserSelect(){

  const {userId, setUserId} = useContext(UserContext);
  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return(
    <>
      <select className={classNames(styles.input, styles['select-user'])} name="user" id="user" defaultValue={userId} onChange={changeUser}>
        <option value="1">Андрей</option>
        <option value="2">Натали</option>
      </select>
    </>
  );

}

export default UserSelect;