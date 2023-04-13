import { useState, useRef, useEffect } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { CHANGE_TODO_STATUS, DELETE_TODO, GET_TODOS } from '../queries/queries';
import { useMutation } from '@apollo/client';

type TodoMenuProps = {
  todoId: string;
};

const TodoMenu: React.FC<TodoMenuProps> = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  const [changeStatus] = useMutation(CHANGE_TODO_STATUS);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menuElement = menuRef.current;
      if (menuElement && !menuElement.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const handleStatusChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement;
    const statusText = target.textContent?.trim();
    try {
      if (statusText === 'Completed' || statusText === 'Cancelled') {
        await changeStatus({
          variables: {
            _id: props.todoId,
            status: statusText,
            category: 'Completed',
          },
        });
      } else if (statusText === 'Delete') {
        await deleteTodo({
          variables: {
            _id: props.todoId,
          },
        });
      } else {
        await changeStatus({
          variables: {
            _id: props.todoId,
            status: statusText,
            category: 'On Hold',
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <button
        ref={menuRef}
        className="todo-menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <EllipsisHorizontalIcon />
      </button>
      <div
        className={`${
          menuOpen ? 'absolute' : 'hidden'
        } right-0 top-[110%] transition-all ease-in z-10`}
      >
        <div className="px-5 py-3 bg-gray-200 rounded-md w-40 flex flex-col gap-1 items-start">
          <button className="todo-menu-btn" onClick={handleStatusChange}>
            <span className="h-2 w-2 rounded-full bg-orange-400"></span>
            <p>Pending</p>
          </button>
          <button className="todo-menu-btn" onClick={handleStatusChange}>
            <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
            <p>In Progress</p>
          </button>
          <button className="todo-menu-btn" onClick={handleStatusChange}>
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <p>Completed</p>
          </button>
          <button className="todo-menu-btn" onClick={handleStatusChange}>
            <span className="h-2 w-2 rounded-full bg-red-400"></span>
            <p>Cancelled</p>
          </button>
          <button
            className="pl-4 text-red-600 hover:translate-x-2 transition-all ease-in-out"
            onClick={handleStatusChange}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoMenu;
