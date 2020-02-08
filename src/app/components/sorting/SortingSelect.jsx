// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ASCENDING, DESCENDING } from 'app/constants';

const SortOrderButton = styled.button`
  :focus {
    box-shadow: none !important;
  }
`;

const SortingOptionsSelect = styled.select`
  :focus {
    box-shadow: none !important;
  }
`;

type Props = {
  sortingOptions: Object,
  sortKey: string,
  sortOrder: string,
  onSortKeyChange: Function,
  setSortOrder: Function,
};

const SortingSelect = ({
  sortingOptions,
  sortKey,
  sortOrder,
  onSortKeyChange,
  setSortOrder,
}: Props) => {
  const isAscendingOrder = sortOrder === ASCENDING;

  const onOrderClick = React.useCallback(() => {
    const newOrder = isAscendingOrder ? DESCENDING : ASCENDING;
    setSortOrder(newOrder);
  }, [isAscendingOrder, setSortOrder]);

  const orderIconClassName = isAscendingOrder ? 'fa-arrow-up' : 'fa-arrow-down';

  return (
    <div className="input-group">
      <div>
        <span>Sort by:</span>
        <SortingOptionsSelect
          className="form-control ml-1"
          value={sortKey}
          onChange={onSortKeyChange}
        >
          {sortingOptions.map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </SortingOptionsSelect>
      </div>
      <div
        className="input-group-append"
        data-toggle="tooltip"
        title={sortOrder}
      >
        <SortOrderButton className="btn btn-secondary" onClick={onOrderClick}>
          <i className={`fa ${orderIconClassName}`} />
        </SortOrderButton>
      </div>
    </div>
  );
};

export default SortingSelect;
