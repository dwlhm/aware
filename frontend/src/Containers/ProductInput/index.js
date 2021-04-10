import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import QRCode from "qrcode.react";

export default function ProductInput(props) {
    
    const [itemsCode, setItemsCode] = useState("")
    const [itemsName, setItemsName] = useState("")
    const [itemsPrice, setItemsPrice] = useState("")
    const [itemsCaption, setItemsCaption] = useState("")
    const [itemsAmount, setItemsAmount] = useState("")
    const [itemsStatus, setItemsStatus] = useState("")

    const addItem = event => {
        event.preventDefault();
        

        const items = {
            code: itemsCode,
            name: itemsName,
            price: itemsPrice,
            caption: itemsPrice,
            status: itemsStatus,    
            amount: itemsAmount
        }

        alert(JSON.stringify(items))
        
      };
    
    return(
        <div>
            <div className="card" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">PRODUCT INPUT</div>
            </div>

            <form className="card mt-4 p-4" onSubmit={addItem}>
                <div className="row">
                    <div className="col">
                        <div className="row mb-3">
                            <label for="inputCode" className="col-sm-4 col-form-label">Code<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputCode" 
                                    value={itemsCode}
                                    onChange={e => setItemsCode(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputName" className="col-sm-4 col-form-label">Name<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputName" 
                                    value={itemsName}
                                    onChange={e => setItemsName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputPrice" className="col-sm-4 col-form-label">Price<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputPrice" 
                                    value={itemsPrice}
                                    onChange={e => setItemsPrice(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputCaption" className="col-sm-4 col-form-label">Caption<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputCaption" 
                                    value={itemsCaption}
                                    onChange={e => setItemsCaption(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <legend class="col-form-label col-sm-4 pt-0">Status<span className='text-danger'>*</span></legend>
                            <div className="col-sm-8">
                                <select class="form-select" aria-label="Status" 
                                    value={itemsStatus}
                                    onChange={e => setItemsStatus(e.target.value)}>
                                    <option selected>Open this select menu</option>
                                    <option value="publish">Publish</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row mb-3">
                            <label for="inputAmount" className="col-sm-4 col-form-label">Amount<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" id="inputAmount" 
                                    value={itemsAmount}
                                    onChange={e => setItemsAmount(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="inputAmount" className="fw-bold col-form-label text-center">QR Code</label>
                            <div className="col d-flex justify-content-center">
                                <QRCode value={`{code:${itemsCode},name:${itemsName},amount:${itemsAmount}}`} size={200} />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Input Product</button>
            </form>
           

        </div>
    )
}