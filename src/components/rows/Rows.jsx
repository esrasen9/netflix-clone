import React from 'react';
import Row from './Row';
import { useStateValue } from '../../Context';
import './Rows.css';

function Rows() {
  const { rowCategories } = useStateValue();
  return (
    <div className="rows">
      {
        rowCategories.map((category) => (
          <Row
            isFirstRow={category.isFirstRow}
            key={category.id}
            title={category.title}
            fetchUrl={category.fetchUrl}
          />
        ))
      }
    </div>
  );
}

export default Rows;
