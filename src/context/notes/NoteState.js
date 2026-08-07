// import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => 
{
  const state = {
    name: "Ali",
    class: "BSSE"
  };
  // const [state2,setState2] = useState(state); 
  // // we can send a function also using context.
  // const update = () =>
  // {
  //   setTimeout(()=>{
  //     setState2({
  //       "name" : "Akbar",
  //       "class" : "None"
  //     })
  //   },2000);
  // }
  return (
    <noteContext.Provider value={{state}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;