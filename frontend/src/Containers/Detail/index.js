import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-scanner'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'

export default function ProductOutput(props) {

    let { code } = useParams()

    const [ listData, setListData ] = useState({
        class: '...',
        cart: '...'
    })
    
    useEffect(() => {
            
        axios({
              method: 'get',
              url: 'https://awaresrv.herokuapp.com/v1/product?qr=' + code,
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

    }, [listData])

    return(
        <div className="py-4">
            <div className="card bg-dark text-white rounded">
                <div className="card-body fw-bold pt-3 pb-3">DETAIL</div>
            </div>

            <div className="card mt-4 p-4">
                <div className="row">
                    <div className="col-md-auto">
                    <QRCode value={`{"code":"${code}"}`} />
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className="font-weight-bold">Code</p>
                            <p>{code}</p>
                        </div>
                        <div className="row">
                            <p className="font-weight-bold">Isi Paket</p>
                            <p>{listData.class}</p>
                        </div>
                        <div className="row">
                            <p className="font-weight-bold">Cart</p>
                            <p>{listData.cart}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}