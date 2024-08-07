import './Button.css';

function Button ({text, onClick}){

  return (
    <>
      <button onClick={onClick} className='btn accent'>{text}</button>
    </>
  );
}

export default Button;