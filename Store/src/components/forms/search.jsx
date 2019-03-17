import React from 'react';

const Search = (props) => {
    return (
        <form className="search container col-8" action="/product/search/">
            <div className="active-cyan-4 mb-4">
                <input className="form-control" type="text" name="qr" placeholder="Search" aria-label="Search" />
            </div>
        </form>
    )
}

export default Search;