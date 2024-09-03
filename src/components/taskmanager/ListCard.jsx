import React, { useState } from 'react';
import './ListCard.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowClick, deleteItem } from '../../redux/TaskSlice';
import { useDispatch } from 'react-redux';

const ListCard = ({ items }) => {
  const [showFullId, setShowFullId] = useState(false);
  const [showFullDeadLine, setShowFullDeadLine] = useState(false);
  const dispatch = useDispatch();

  const handleIdClick = () => {
    setShowFullId(!showFullId);
  };
  const handleDeadline = () => {
    setShowFullDeadLine(!showFullDeadLine);
  };
  const handleArrowClick = (direction) => {
    dispatch(ArrowClick(items, direction));

  }
  const handledelete = () => {
    dispatch(deleteItem(items._id))
  }
  return (
    <div className="list-card">
      <ul className={`${items.status === 'done' ? 'completed list-card__row' : 'list-card__row'}`}>

        <li
          className="list-card__cell"
          onClick={handleIdClick}
          style={{ cursor: 'pointer' }}
        >
          <p>{showFullId ? items._id : `${items._id.slice(0, 4)}...`}</p>
        </li>
        <li className="list-card__cell"><p>{items.task}</p></li>
        <li className="list-card__cell"><p>{items.status}</p></li>
        <li className="list-card__cell1" onClick={handleDeadline}
          style={{ cursor: 'pointer' }}>
          <p>{showFullDeadLine ? items.deadline : `${items.deadline.slice(0, 10)}..`}</p></li>
        <li className="list-card__cell">
          <button className="action-button" disabled={items.status === 'backlog'} onClick={() => handleArrowClick('left')}>
            <ArrowLeftIcon />
          </button>
          <button className="action-button" disabled={items.status === 'done'} onClick={() => handleArrowClick('right')}>
            <ArrowRightIcon />
          </button>
          <button className="trash" onClick={handledelete}>
            <DeleteIcon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
