import React from 'react';

const ReviewDisplay = ({ content, opinion, anchor, creator = false, ...otherProps }) => {
    return (
        <tr>
            <td className="text-center">{anchor}</td>
            <td className="border-left">{content}</td>
            <td className={`border-left ${opinion === 'Positive' ? 'text-success' : 'text-danger'}`}>
                {opinion}
            </td>
            {
                creator ? (
                    <td className='border-left text-center'>
                        <button className="btn btn-danger" onClick={() => otherProps.action(otherProps.id)}>Delete</button>
                    </td>
                ) : null
            }
        </tr >
    )
}

export default ReviewDisplay;