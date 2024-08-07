import './JournalItem.css';

function JournalItem ({title , date, post}){
 
  let formatterDate = new Intl.DateTimeFormat('ru').format(new Date(date));

  return (
    <>
      <h2 className='journal-item__header'>{title}</h2>
      <h2 className='journal-item__body'>
        <div className='journal-item__date'>{formatterDate}</div>
        <div className='journal-item__text'>{post}</div>
      </h2>

    </>
  );
}

export default JournalItem;