import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'
import axios from 'axios'

export default function ProductOutput(props) {

    const [items, setItems] = useState({code: ""})
    const [scanner, setScanner] = useState({delay: 100, result: "Arahkan QR Code ke Kamera"})
    const [ listData, setListData ] = useState({
        class: '',
        cart: ''
    })
    const [ isDeleted, setIsDeleted ] = useState(false)

    const ambilClick = event => {
        event.preventDefault()

        async function fetchData() {
            
            await axios({
              method: 'delete',
              url: `https://awaresrv.herokuapp.com/v1/product?qr=${items.code}`,
              headers: { 
                'Content-Type': 'application/json'
              },
              responseType: 'stream'
            })
              .then(function (response) {
                console.log(response.data.data)
                setIsDeleted(true)
              }).catch(error => {
                console.log(error)
              })
        }

        fetchData()
    }
    
    const handleScan = data => {
        console.log(data != null ? data.text : data)
        if (data != null) {
            const dataParse = JSON.parse(data.text)
            setScanner({
                delay: 100,
                result: "Scan berhasil"
            })
            setItems(dataParse)

            console.log(dataParse)

            async function fetchData() {
            
                await axios({
                  method: 'get',
                  url: 'https://awaresrv.herokuapp.com/v1/product?qr=' + dataParse.code,
                  headers: { 
                    'Content-Type': 'application/json'
                  },
                  responseType: 'stream'
                })
                  .then(function (response) {
                    console.log(response.data.data)
                    setListData(response.data.data)
                    setIsDeleted(false)
                  }).catch(error => {
                    console.log(error)
                  })
            }
    
            fetchData()

        }
    }

    const handleError = err => {
        console.error(err);
    }  

    const previewStyle = {
        height: 240,
        width: 320,
    }

    return(
        <div className="py-4">
            <div className="card bg-dark text-white rounded">
                <div className="card-body fw-bold pt-3 pb-3">PRODUCT OUTPUT</div>
            </div>

            <div className="card mt-4 p-4">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                    <QrReader delay={scanner.delay} style={previewStyle} className="shadow-sm bg-body rounded" onError={handleError} onScan={handleScan} />
                    </div>
                    <div className="col">
                        <div class={`alert text-center ${scanner.result == "Scan berhasil" ? "alert-primary" : "alert-danger fw-bold"}`} role="alert">
                            {scanner.result}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Code</label>
                            <div className="col-sm-8">
                                {items.code}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Isi Paket</label>
                            <div className="col-sm-8">
                                {listData.class}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Cart</label>
                            <div className="col-sm-8">
                                {listData.cart}
                            </div>
                        </div>
                        {scanner.result == "Scan berhasil" && !isDeleted ? <div className="btn btn-danger" onClick={ambilClick}>Telah Diambil</div> : null}
                    </div>
                </div>
            </div>
           

        </div>
    )
}