/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */

// import fetch from 'isomorphic-fetch';
import React, { useCallback, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

// Polyfill Promises for IE and older browsers.
// require('es6-promise').polyfill();

/* example-start */
const SEARCH_URI = 'http://localhost:8000/api/symptoms';

const AsyncExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const [multiple, setMultiple] = useState(false);
  const [selected, setSelected] = useState([]);

  // setOptions(['test'])
  const handleSearch = useCallback((query) => {
    // setOptions(['test'])
    fetch(`${SEARCH_URI}`)
      .then((resp) => resp.json())
      .then((symptoms) => {
        // const optio

        
        
      });
  })
  // const handleSearch = useCallback((query) => {
  //   setIsLoading(true);

  //   fetch(`${SEARCH_URI}`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const options = ['test']
  //       setOptions(options)
  //     });
  // });

  return (
    <Typeahead
        id="basic-typeahead-example"
        labelKey="name"
        multiple={multiple}
        onChange={setSelected}
        onFocus={handleSearch}
        options={options}
        placeholder="Choose a state..."
        selected={selected}
        renderMenuItemChildren={(option, props) => (
            <div>{option}</div>
        )}
      />
  );
};
/* example-end */

export default AsyncExample;