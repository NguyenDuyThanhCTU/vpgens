'use client';
import React from 'react';

const Input = ({ text, Value, setValue, Input, PlaceHolder }: any) => {
  return (
    <div className="w-full">
      <div className="mb-2">
        <label className="block  text-sm font-bold mb-2">{text}</label>

        {Input ? (
          <>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight duration-300 hover:shadow-lg outline-none"
              value={Value}
              placeholder={` ${PlaceHolder ? PlaceHolder : `Nhập ${text}`}`}
              onChange={(e) => setValue(e.target.value)}
            />
          </>
        ) : (
          <>
            {' '}
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              value={Value}
              placeholder={` ${PlaceHolder ? PlaceHolder : `Nhập ${text}`}`}
              onChange={(e) => setValue(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
