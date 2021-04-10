import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'

export default function ProductOutput(props) {

    const [itemsCode, setItemsCode] = useState("")
    const [itemsName, setItemsName] = useState("")
    const [itemsAmount, setItemsAmount] = useState("")
    const [scanner, setScanner] = useState({delay: 100, result: "Arahkan QR Code ke Kamera"})
    
    const handleScan = data => {
        console.log(data != null ? data.text : data)
        if (data != null) {
            const dataParse = JSON.parse(data.text)
            setScanner({
                delay: 100,
                result: "Scan berhasil"
            })
            alert(dataParse)
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
        <div>
            <div className="card" style={{color: 'black'}}>
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
                                {itemsCode}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                {itemsName}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Amount</label>
                            <div className="col-sm-8">
                                {itemsAmount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           

        </div>
    )
}