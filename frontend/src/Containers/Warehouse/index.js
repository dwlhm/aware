import React, { useState, useEffect, useRef } from 'react'
import QrReader from 'react-qr-scanner'
import axios from 'axios'
import { Samy, SvgProxy } from 'react-samy-svg'

export default function Warehouse(props) {

    const [cond, setCond] = useState({temp: 'loading', hum: 'loading'})
    const [ data, setData ] = useState([])

    useEffect(() => {
        
        const intervalId = setInterval(() => {

            async function fetchData() {
            
                let config = {
                  method: "get",
                  url:
                    "https://awaresrv.herokuapp.com/v1/room"
                };

                await axios(config)
                  .then(function (response) {
                    setCond({temp: response.data.data.Temperature, hum: response.data.data.Humudity})
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
            }

            fetchData()
        }, 3000)

        axios({
            method: 'get',
            url: 'https://awaresrv.herokuapp.com/v1/cart?id=cart1',
            headers: { 
              'Content-Type': 'application/json'
            },
            responseType: 'stream'
          })
            .then(function (response) {
                setData(response.data.data)
            })

        return () => clearInterval(intervalId)
            
    }, [cond])

    const position = [51.505, -0.09]

    return(
        <div className="py-4">
            <div className="card bg-dark text-white rounded">
                <div className="card-body fw-bold pt-3 pb-3">WAREHOUSE</div>
            </div>

            <div className="card mt-4 bg-danger" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">Room Conditions</div>
                <div className="container pb-3 px-5">
                    <div className="row">
                        <div className="col d-flex align-items-center">Temperature: <span className="text-primary fs-3 ml-2 fw-bold">{cond.temp}</span></div>
                        <div className="col d-flex align-items-center">Humidity: <span className="text-primary fs-3 ml-2 fw-bold">{cond.hum}</span></div>
                    </div>
                </div>
                
            </div>

            <div className="card mt-4 p-4 d-flex justify-content-center">
                <p className="alert alert-warning">
                    *warna <span style={{color: 'royalblue'}}>biru</span> menandakan bagian tersebut menyimpan barang<br/>
                    *warna <span style={{color: 'red'}}>merah</span> menandakan bagian tersebut tempat barang yang harus diambil
                    </p>
                <Samy 
                    id="centerMap"
                    path="./MAPSrev.svg"
                    width={50 + 'rem'}
                    height={40 + 'rem'}
                >
                    {data.map((value, index) => {
                            let colors = value.status == 'pengambilan' ? 'red' : value.status == 'disimpan' ? 'royalblue' : 'white'
                            return(
                                <SvgProxy selector={`#${value.rak}`} fill={colors} />
                            )
                    })}

                </Samy>
                <div>
                    <h5 className="mb-3">List Barang</h5>
                    <table class="table table-borderless table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Lokasi</th>
                            <th scope="col">Isi</th>
                            <th scope="col">Code</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((value, index) => {
                            return(
                                <tr>
                                    <td>{value.rak}</td>
                                    <td>{value.class}</td>
                                    <td>{value.code}</td>
                                    <td>{value.status}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>            
           </div>

        </div>
    )
}