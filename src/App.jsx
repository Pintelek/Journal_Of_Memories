
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import {  UserContextProvider } from './context/userContext';
import { useState } from 'react';




const INITIAL_DATA = [
  {
    id: 1,
    title: 'Поход в горы',
    post: 'Горные походы открывают удивительные природные ландшафт',
    date: new Date(),
    userId: 1
  },
  {
    id: 2,
    title: 'Подготовка к обновлению курсов',
    post: 'Думал, что очень много времени',
    date: new Date(),
    userId : 2
  }
];


if(!localStorage.getItem('data')){
  localStorage.setItem('data' , JSON.stringify(INITIAL_DATA));
}

function App() {

  const [journalData, setJournalData] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState({});


  const newItem = () => {

    setSelectedItem(null);
  };

  const addItem = item => {

    if(!item.id){
      setJournalData([...journalData, {
        ...item,
        date: new Date(item.date? item.date: Date.now()),
        id: journalData.length? Math.max(...journalData.map(el => (el.id))) + 1: 1
      }]);
    }
    else{
      setJournalData([...journalData.map(elem => {
        if(elem.id == item.id){
          return item;
        }
        else return elem;
      })]);
    }
  };


  const onDelete = (id) => {
    setJournalData([...journalData.filter(el => (el.id !== id))]);
  };
  
  return (
    <UserContextProvider>
      <div className='app'>
        <LeftPanel>
          <Header />
          <JournalAddButton newItem={newItem} className={'AddButton'}/>
          <JournalList data={journalData} setItem={setSelectedItem}/>
        </LeftPanel>
        <Body>
          <JournalForm myCallback={addItem} data={selectedItem} onDelete={onDelete}/>
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
