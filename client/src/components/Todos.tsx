import { todoSchema } from '../Pages/Home';
import TodoMenu from './TodoMenu';

type todoProps = {
  todos: todoSchema[];
};

const Todos: React.FC<todoProps> = ({ todos }) => {
  let status = '';
  let level = '';

  return (
    <>
      <ul className="flex flex-col gap-4">
        {todos.map((todo: todoSchema) => {
          switch (todo.status) {
            case 'Pending':
              status = 'pending';
              break;
            case 'In Progress':
              status = 'in-progress';
              break;
            case 'Completed':
              status = 'completed';
              break;
            case 'Cancelled':
              status = 'cancelled';
              break;
            default:
              status = 'pending';
              break;
          }
          switch (todo.level) {
            case 'Minor':
              level = 'minor';
              break;
            case 'Normal':
              level = 'normal';
              break;
            case 'Critical':
              level = 'critical';
              break;
            default:
              level = 'minor';
              break;
          }
          return (
            <li
              className="flex items-center text-sm pr-7 pb-5 border-b"
              key={todo._id}
            >
              <div className="bullet">
                <div className="bullet-inside"></div>
              </div>
              <p className="ml-3 mr-20 flex-1">{todo.title}</p>
              <div className={`${status} status mr-20`}>
                {todo.status || 'Pending'}
              </div>
              <div className="mr-20 flex items-center gap-1 w-20">
                <span className={`${level} level`}></span>
                <p className="text-slate-700">{todo.level}</p>
              </div>
              <TodoMenu todoId={todo._id} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Todos;
