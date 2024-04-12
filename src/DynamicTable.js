import React from 'react';

function DynamicTable({ headers, data, onEdit, onDelete }) {
    return (
        <div>
            <div className='card-body'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tableData, index) => (
                            <tr key={index}>
                                {Object.keys(tableData).map((key, cellIndex) => (
                                    <td key={cellIndex}>{tableData[key]}</td>
                                ))}
                                <td>
                                    <button className='btn btn-sm btn-success' onClick={() => onEdit(tableData)}>
                                        Edit
                                    </button>
                                    <button className='btn btn-sm btn-danger' onClick={() => onDelete(tableData.Id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DynamicTable;
