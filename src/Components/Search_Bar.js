
import React, {useState} from 'react'
// Backend Functions NEED TO BE IMPLEMENTED (setSearchQuery, preventDefault, onSearch, handleSearchSubmit, handleSearchChange)
export default function SearchBar({onSearch}) {
    /* const [searchQuery, setSearchQuery] = useState(‘’);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    }; */
    return (
        <form /*onSubmit={handleSearchSubmit}*/>
            <input
                type = "text"
                placeholder = "...search"
                /*value = {searchQuery} */
                /*onChange = {handleSearchChange} */
            />
            <button type='submit'> Search </button>
        </form>
    );
}
  // SearchBar functionality: “Searchbar” component takes on “onSearch” prop, which is a callback function that is called when the user submits a search form.
  // The search query is stored in the component’s state using the ‘useState’ hook. When the user types into the input field and submits the form, the ‘handleSearchSubmit’
  // function is triggered. This function prevents the default form submission behavior, calls the ‘onSearch’ callback w/ the current search query, and you can use this query
  // to implement your own search logic.
  /*
  import SearchBar from ‘./SearchBar’;
  const handleSearch = (q) => {
      console.log(‘Search query:’, q);
  };*/