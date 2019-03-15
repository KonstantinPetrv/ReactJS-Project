import React from 'react';

const ProductForm = (props) => {
    const { title, description, image, price } = props.state;
    const { handleChange, handleSubmit, actionName } = props;
    let btnStyle = 'btn-primary';
    if (actionName === 'Edit') btnStyle = 'btn-warning';
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="title">Title: </label>
                <input
                    type="text"
                    className="form-control col-8"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange} />
            </div>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="description">Description: </label>
                <textarea
                    type="description"
                    className="form-control col-8"
                    rows="7"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange} />
            </div>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="price">Price: </label>
                <input
                    type="number"
                    min="1"
                    step="any"
                    className="form-control col-8"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={handleChange} />
            </div>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="image">Image: </label>
                <input
                    type="text"
                    className="form-control col-8"
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