import { useEffect, useState } from 'react';


export function useLocalStorage (key){

  const [data, setData] = useState([]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    if(res){
      setData(res.map(el => ({...el, date: new Date(el.date)})));
    }
  },[key]);

  const saveData = (newData)=> {
    if(newData.length) { 
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    }
  };
  return [data, saveData];
}