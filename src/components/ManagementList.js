import { ArrowForwardIos } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Colors from '../constants/Colors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ManagementList({ items, title }) {
  const history = useHistory();
  return (
    <div className="flex flex-col items-start pt-2 mx-2 text-primaryColor cursor-pointer">
      <h6>{`Home Page > ${title}`}</h6>
      <div className="h-16" />
      {items.map((item, index) => (
        <div
          onClick={
            () => { history.push(item.route) }
          }
          key={index}
          className="w-full px-4 py-3 my-1 border border-gray-500 border-1  bg-gray-100 flex justify-between items-center"
        >
          <span className='text-primaryColor font-bold'>{item.label}</span>
          <ArrowForwardIos style={{ color: Colors.primary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ManagementList;
