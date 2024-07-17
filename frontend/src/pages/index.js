import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/actions';
import Modal from '../components/Models';
import { stockMapping } from '../stockMapping';
import { useTable, useSortBy, usePagination } from 'react-table';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const [symbol, setSymbol] = useState('GOOG'); // Initial symbol
  const [selectedSymbol, setSelectedSymbol] = useState(symbol); // State for selected symbol

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchData(selectedSymbol)); // Fetch data for selected symbol
    }, 60000);

    dispatch(fetchData(selectedSymbol)); // Fetch data initially for selected symbol

    return () => clearInterval(interval);
  }, [dispatch, selectedSymbol]);

  const handleChangeSymbol = (newSymbol) => {
    setSelectedSymbol(newSymbol); // Update selected symbol state
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Symbol',
        accessor: 'symbol'
      },
      {
        Header: 'Price(in USD)',
        accessor: 'price'
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
        Cell: ({ value }) => new Date(value).toLocaleString()
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Stock Price Data</h1>
      <div className="flex items-center mb-4">
        <label htmlFor="symbolSelect" className="mr-2">Select Stock:</label>
        <select
          id="symbolSelect"
          className="bg-white border border-gray-300 rounded py-2 px-4"
          value={selectedSymbol}
          onChange={(e) => handleChangeSymbol(e.target.value)}
        >
          <option value="GOOG">Alphabet Inc.</option>
          <option value="AAPL">Apple Inc.</option>
          <option value="MSFT">Microsoft Corporation</option>
          <option value="AMZN">Amazon.com, Inc.</option>
          <option value="TSLA">Tesla, Inc.</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <br/><br/><br/><br/><br/>
      <h3>Showing Stock Prices for {stockMapping[selectedSymbol]}</h3>
      <br/>
      <div className="overflow-x-auto">
        <center>
        <table {...getTableProps()} className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b border-gray-300">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-left py-3 px-4 cursor-pointer"
                    style={{paddingLeft:"80px"}}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-gray-300 hover:bg-gray-50" style={{paddingLeft:"100px"}}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="py-3 px-4" style={{paddingLeft:"80px"}}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </center>
      </div>
      <Modal setSymbol={setSymbol} />
    </div>
  );
};

export default Home;
