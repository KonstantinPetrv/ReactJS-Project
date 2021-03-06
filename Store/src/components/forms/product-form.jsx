import React from 'react';

const ProductForm = (props) => {
    const { title, description, image, price } = props.state;
    const { handleChange, handleSubmit, actionName } = props;
    console.log(props)
    let btnStyle = 'btn-primary';
    if (actionName === 'Edit') btnStyle = 'btn-warning';
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="title">Title&#58; </label>
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
                <label className="label label-default col-2" htmlFor="description">Description&#58; </label>
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
                <label className="label label-default col-2" htmlFor="price">Price&#58; </label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control col-8"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={handleChange} />
            </div>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="image">Image&#58; </label>
                <input
                    type="text"
                    className="form-control col-8"
                    name="image"
                    id="title"
                    placeholder="Image Url"
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