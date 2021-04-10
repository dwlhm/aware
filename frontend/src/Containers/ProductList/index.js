import React, { useState } from 'react'

export default function ProductList(props) {

    const [list, setList] = useState([
        {code: "aefkfk2o", name: "Advantech Pro 2gb Phone", location: "Rak 2:2-3"},
        {code: "aefkfsk2o", name: "Samsung A52 32GB", location: "Rak 2:3-3"},
        {code: "aefkfk2so", name: "Advantech Pro 2gb Phone", location: "Rak 2:2-4"},
        {code: "aefkfk2so", name: "Advantech Pro 2gb Phone", location: "Rak 2:4-5"},
    ])

    return(
        <div>
            <div className="card" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">PRODUCT LIST</div>
            </div>

            <div className="card mt-4 p-4">
            <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                
                    {list.map((value, index) => {
                        return(
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{value.code}</td>
                                <td>{value.name}</td>
                                <td>{value.location}</td>
                            </tr>
                        )
                    })}
                    
                
            </tbody>
            </table>
            </div>
           

        </div>
    )
}