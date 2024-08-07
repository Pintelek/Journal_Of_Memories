import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

function JournalList ({data, setItem}){

  const {userId} = useContext(UserContext);

  const filterData = data.filter(item => {
    return item.userId == userId;
  });

  const sortItem = (a,b) => {
    if(a.date < b.date) return 1;
    else return -1;
  };
  if(filterData.length === 0) {
    return <p>Воспоминаний еще нет, добавте новое.</p>;
  }

  return (
    <div className='journal-list'>
      {filterData.sort(sortItem).map(el => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem
            title={el.title}
            post={el.post}
            date={el.date}
          />
        </CardButton>
      ))}
    </div>
  );
}

export default JournalList;