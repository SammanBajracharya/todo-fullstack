import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { CREATE_TODO, GET_TODOS } from '../queries/queries';
import { useMutation } from '@apollo/client';

type SelectOption = {
  value: string;
  label: string;
};

type AddTodoProps = {
  onClose: () => void;
  addTodoError: (error: boolean) => void;
  error: boolean;
};

const levelOptions: SelectOption[] = [
  { value: 'Minor', label: 'Minor' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Critical', label: 'Critical' },
];

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'none' : provided.backgroundColor,
    color: 'black',
  }),
  control: (provided: any) => ({
    ...provided,
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#d1d5db',
    },
  }),
};

const AddTodo = ({ onClose, addTodoError, error }: AddTodoProps) => {
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSelectChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      const value = (selectedOption as SelectOption).value;
      setSelectedOption({ value, label: value });
    } else {
      setSelectedOption(null);
    }
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && selectedOption?.value) {
      await createTodo({
        variables: {
          title: title,
          level: selectedOption?.value,
        },
      });
      setTitle('');
      setSelectedOption(null);
      addTodoError(false);
    } else {
      addTodoError(true);
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute top-8 right-8 cursor-pointer hover:text-red-600"
        onClick={() => {
          onClose();
          addTodoError(false);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <h1 className="text-4xl font-bold text-red-600 mb-6">Add Todo</h1>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="add-todo-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          options={levelOptions}
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full"
          styles={customStyles}
        />
        <p className={`${error ? 'block' : 'hidden'} text-red-600 text-center`}>
          Invalid Entry
        </p>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white transition-all ease-in rounded-md mt-2"
        >
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
