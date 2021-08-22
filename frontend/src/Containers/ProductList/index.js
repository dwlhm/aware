import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ProductList(props) {

    const [list, setList] = useState([
        {code: "aefkfk2o", name: "Advantech Pro 2gb Phone", location: "Rak 2:2-3"},
        {code: "aefkfsk2o", name: "Samsung A52 32GB", location: "Rak 2:3-3"},
        {code: "aefkfk2so", name: "realme Narzo 30A", location: "Rak 2:2-4"},
        {code: "aefkfk2so", name: "Samsung Galaxy A02s", location: "Rak 2:4-5"},
    ])

    const [ listData, setListData ] = useState([])

    useEffect(() => {

        async function fetchData() {
            
            await axios({
              method: 'get',
              url: 'https://awaresrv.herokuapp.com/v1/list?type=product',
              headers: { 
                'Content-Type': 'application/json'
              },
              responseType: 'stream'
            })
              .then(function (response) {
                console.log(response.data.data)
                setListData(response.data.data)
              }).catch(error => {
                console.log(error)
              })
        }

        fetchData()
    
    }, [listData])

    return(
        <div className="py-4">

            <div className="card m-0 p-0 border-0">

            <div className="card bg-light border-0" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">PRODUCT LIST</div>
            </div>

            <table class="table table-borderless table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Isi</th>
                    <th scope="col">Cart</th>
                </tr>
            </thead>
            <tbody>
                
                    {listData.map((value, index) => {
                        return(
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <Link to={`/${value.code}`} className='linkList'>
                                        {value.code}
                                    </Link>
                                </td>
                                <td>{value.class}</td>
                                <td>{value.cart}</td>
                            </tr>
                        )
                    })}
                    
                
            </tbody>
            </table>
            </div>
           

        </div>
    )
}