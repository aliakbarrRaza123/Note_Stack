// useContext is a Hook to use states present in the context.
import React , {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
 
export default function About() 
{
  const a = useContext(noteContext);
  // useEffect runs after return 
  // useEffect(() => {
  //   a.update();
  // }, []);

  return (
    <div>
      <h2 className="text-center mt-4">
        This is About {a.state.name} and he is in class {a.state.class}
      </h2>
    </div>
  )
}
