import React from "react";
import PropTypes from 'prop-types';
import style from './Filter.module.css';

export const Filter = ({ filterValue, onChangeFilter }) => {
  return (
    <label>
      Find contact by name
      <br />
      <input className={style.FilterFormInput} type="text" value={filterValue} onChange={onChangeFilter} />
    </label>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};
