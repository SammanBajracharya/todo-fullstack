import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../queries/queries';
import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';

export interface todoSchema {
  _id: string;
  title: string;
  level: string;
  status: string;
  category: string;
}

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [createTodoError, setCreateTodoError] = useState<boolean>(false);
  const overlayAddTodo = useRef<HTMLDivElement>(null);
  const addTodo = useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery(GET_TODOS);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleError = (error: boolean) => {
    setCreateTodoError(error);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (
        overlayAddTodo.current?.contains(event?.target as Node) &&
        !addTodo.current?.contains(event?.target as Node)
      ) {
        handleClose();
        setCreateTodoError(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [overlayAddTodo]);

  if (loading) return <p>Loading..</p>;
  if (error)
    return (
      <p className="text-center py-1 px-8 bg-red-600 text-red-300 inline mx-auto rounded-full mt-4">
        {error.message}
      </p>
    );

  let onHold = data.todos?.filter(
    (todo: todoSchema) => todo.category === 'On Hold'
  );

  let completed = data.todos?.filter(
    (todo: todoSchema) => todo.category === 'Completed'
  );

  return (
    <section className="py-12 px-16 flex-1">
      <main className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          {onHold > 0 ? (
            <h1 className="text-4xl font-bold">
              You've got{' '}
              <span className="text-red-600">{onHold.length} task</span> today
            </h1>
          ) : (
            <h1 className="text-4xl font-bold">
              No <span className="text-red-600">Todos</span>
            </h1>
          )}
          <button
            className="bg-indigo-700 py-2 px-8 rounded-lg text-white text-xs hover:bg-indigo-800 transition-all ease-in"
            onClick={handleOpen}
          >
            Add New
          </button>
        </div>
        <div>
          <h4 className="mt-10 mb-6 text-lg">On Hold</h4>
          {onHold.length > 0 ? (
            <Todos todos={onHold} />
          ) : (
            <p className="text-sm text-center">
              No Todos. Start creating your plans
            </p>
          )}
        </div>
        <div>
          <h4 className="mt-10 mb-6 text-lg">Completed</h4>
          {completed.length > 0 ? (
            <Todos todos={completed} />
          ) : (
            <p className="text-sm text-center">None Completed</p>
          )}
        </div>
      </main>
      <div
        ref={overlayAddTodo}
        className={`${
          isOpen ? 'absolute' : 'hidden'
        }  top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30 z-20 transition-all ease-in`}
      >
        <div
          ref={addTodo}
          className="py-7 px-32 shadow-md bg-white flex flex-col items-center relative mx-auto mt-32 max-w-2xl"
        >
          <AddTodo
            onClose={handleClose}
            addTodoError={handleError}
            error={createTodoError}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
