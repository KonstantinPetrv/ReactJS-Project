import React from 'react';

const ProductForm = (props) => {
    const { title, description, image, price } = props.state;
    const { handleChange, handleSubmit, actionName } = props;
    let btnStyle = 'btn-primary';
    if (actionName === 'Edit') btnStyle = 'btn-warning';
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <div>
                <label className="label label-default" htmlFor="title">Title: </label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange} />
            </div>
            <div className="top-buffer">
                <label htmlFor="description">Description: </label>
                <textarea
                    type="description"
                    className="form-control"
                    rows="7"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange} />
            </div>
            <div>
                <label className="label label-default" htmlFor="price">Price: </label>
                <input
                    type="number"
                    min="1"
                    step="any"
                    className="form-control"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={handleChange} />
            </div>
            <div>
                <label className="label label-default" htmlFor="image">Image: </label>
                <input
                    type="text"
                    className="form-control"
                    name="image"
                    id="title"
                    placeholder="Image Url:"
                    value={image}
                    onChange={handleChange} />
            </div>
            <div className="float-right">
                <button type="submit" className={`btn ${btnStyle} top-buffer`}>{actionName}</button>
            </div>
        </form>
    )
}

export default ProductForm;