import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/userContext';


function JournalForm ({myCallback, data, onDelete}){

  const [dataState, dispatch] = useReducer( formReducer, INITIAL_STATE);
  const {isValid, values, isFormReadyToSubmit} = dataState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const {userId} = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true){
    case !isValid.title :{
      titleRef.current.focus();
      break;
    }
    case !isValid.date :{
      dateRef.current.focus();
      break;
    }
    case !isValid.post :{
      postRef.current.focus();
      break;
    }
    }
    
  };


  useEffect(() => {
    if(isFormReadyToSubmit){
      myCallback(values);
      dispatch({type: 'CLEAR_VALUE'});
      dispatch({type: 'SET_VALUE', payload : {userId}});
    }
  },[isFormReadyToSubmit, values, myCallback, userId]);

  useEffect(()=> {
    dispatch({type: 'SET_VALUE', payload : {userId}});
    dispatch({type: 'CLEAR_VALUE'});
  },[userId]);

  useEffect(()=> {
    if(!data) {
      dispatch({type: 'CLEAR_VALUE'});
    }
    dispatch({type: 'SET_VALUE', payload : {...data}});
  },[data]);

  const onSubmit = (e) => {
    e.preventDefault();
    focusError(isValid);
    dispatch({type: 'SUBMIT' });
  };

  const handChange = (e) => {
    dispatch({type: 'SET_VALUE', payload : {[e.target.name] : e.target.value}});
    dispatch({type: 'RESET_VALIDITY'});
    dispatch({type: 'SET_VALUE', payload : {userId}});
  };

  const deleteJournalItem = (id) => {
    onDelete(id);
    dispatch({type: 'CLEAR_VALUE'});
  };






 

  return (
    <form onSubmit={onSubmit}  className={cn(styles['journal-form'])}>
      <div className={styles['forms-row']}>
        <Input ref={titleRef} type="text" name='title' value={values.title} onChange={handChange} isValid = {isValid.title} className={'input'} appearance='title'/>
        {data?.id && <button className={styles['delete']} type='button' onClick={() => {deleteJournalItem(data.id);}}><img src="/archive.svg" alt="delete"/></button>}
      </div>
      <div className={styles['forms-row']}>
        <label className={cn(styles['forms-label'])} htmlFor="date">
          <img src="/calendar.svg" />
          <span>Дата</span>
        </label>
        <Input ref={dateRef} value={values.date? new Date(values.date).toISOString().slice(0,10): ''} onChange={handChange} type="date" name='date' id='date'  isValid = {isValid.date} className={'input'} />
      </div>
      <div className={styles['forms-row']}>
        <label className={cn(styles['forms-label'])} htmlFor="tag">
          <img src="/folder.svg" />
          <span>Метки</span>
        </label>
        <Input type="text" name='tag' id='tag' value={values.tag} onChange={handChange} className={'input'}/>
      </div>
      <textarea ref={postRef} value={values.post} onChange={handChange} className={cn(styles.input , {[styles.invalid]: !isValid.post})} name="post" id="" cols="30" rows="10"></textarea>
      <Button text={'Сохранить'}/>
    </form>
      
  );
}

export default JournalForm;