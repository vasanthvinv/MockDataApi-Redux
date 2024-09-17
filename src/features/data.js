import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  removeItem,
  selectData,
  selectLoading,
  selectError,
} from "./dataSlice";

function Data() {
  const dispatch = useDispatch();
  const datas = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleRemove = (i) => {
    dispatch(removeItem(i));
  };

  if (loading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {datas.length > 0 && Object.keys(datas[0]).map((item) => (
              <th>{item.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((item, i) => (
            <tr key={item.id}>
              {Object.keys(item).map((key) => (
                <td key={key}>{String(item[key])}</td>
              ))}
              <td>
                <button onClick={() => handleRemove(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
