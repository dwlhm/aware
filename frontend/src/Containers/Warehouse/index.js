import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-scanner'
import axios from 'axios'

export default function Warehouse(props) {

    const [scanner, setScanner] = useState({delay: 100, result: "Arahkan QR Code ke Kamera"})
    const [scanCart, setScanCart] = useState(false)
    const [scanBarang, setScanBarang] = useState(false)
    const [troliId, setTroliId] = useState("")
    const [troliId1, setTroliId1] = useState("")
    const [cond, setCond] = useState({temp: undefined, hum: undefined})
    const [beenScan, setBeenScan] = useState("-1")
    const [rak, setRak] = useState({
        rakId: [], 
        rakStatus: [],
        barangName: [],
        barangCode: []
    })

    const openCartScanner = event => {
        event.preventDefault();

        setScanCart(!scanCart)

    }

    const inputCartId = event => {
        event.preventDefault()

        setTroliId1(troliId)
        setRak({
            rakId: [["1", "2", "3"], ["4", "5", "6"]], 
            rakStatus: [[true, false, false], [true, false, true]],
            barangName: [
                        [
                            [{code: "aefkfk2o", name: "Advantech Pro 2gb Phone", amount: 2}], 
                            null, 
                            null
                        ],
                        [[{code: "aefkfsk2o", name: "Samsung A52 32GB", amount: 3}, {code: "aefkfk2so", name: "realme Narzo 30A", amount: 1}], null, [{code: "aefkfk2so", name: "Samsung Galaxy A02s", amount: 10}]]
            ],
            barangCode: [
                [
                    ["aefkfk2o"], 
                    null, 
                    null
                ],
                [["aefkfsk2o", "aefkfk2so"], null, ["aefkfk2so"]]
    ]
        })
        
    }
    
    const handleScan = data => {
        console.log(data != null ? data.text : data)
        if (data != null) {
            //const dataParse = JSON.parse(data.text)
            setScanner({
                delay: 100,
                result: "Scan berhasil"
            })
            setScanCart(false)
            alert(data.text.code)
        }
    }

    const openBarangScanner = event => {
        event.preventDefault();

        setScanBarang(!scanBarang)

    }
    
    const handleScanBarang = data => {
        setBeenScan("0")
        console.log(data != null ? data.text : data)
        if (data != null) {
            const dataParse = JSON.parse(data.text)
            const code = dataParse.code
            let rak1 = rak
            setScanner({
                delay: 100,
                result: "Scan berhasil"
            })
            setScanBarang(false)
            rak1.barangName.map((val, index) => {
                if (val !== null) {
                    val.map((val1, index1) => {
                        if (val1 !== null) {
                            val1.map((val2, index2) => {
                                if (val2.code == code) {
                                    val1.splice(index2, 1) 
                                    rak1.rakStatus[index][index1] = false
                                    setBeenScan("1")
                                }
                            })                            
                        }
                    })    
                }
                
            })

            

            setRak(rak)
        }
    }

    const handleError = err => {
        console.error(err);
    }  

    const previewStyle = {
        height: 240,
        width: 320,
    }

    useEffect(() => {
        
        var config = {
            method: "get",
            url:
              "https://platform.antares.id:8443/~/antares-cse/antares-id/AutomaticWarehouse/A-Ware/la",
            headers: {
                "X-M2M-Origin": "86de344c2859f09e:4fbf992fe0ca59d3",
                'Content-Type': "application/json;ty=4",
                'Accept': "application/json",
                'Cache-Control': "no-cache",
                'Postman-Token': "0314aaab-c1bf-4b4c-90c8-7b2865e26965"
            }
          };
          
          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
            
    })
    return(
        <div>
            <div className="card" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">WAREHOUSE</div>
            </div>

            <div className="card mt-4" style={{color: 'black'}}>
                <div className="card-body fw-bold pt-3 pb-3">Room Conditions</div>
                <div className="container pb-3 px-5">
                    <div className="row">
                        <div className="col d-flex align-items-center">Temperature: <span className="text-primary fs-3 ml-2 fw-bold">32.3</span></div>
                        <div className="col d-flex align-items-center">Humidity: <span className="text-primary fs-3 ml-2 fw-bold">88.9</span></div>
                    </div>
                </div>
                
            </div>

            <div className="card mt-4 p-4">
                <div>
                    <div className="row">
                        <div className="col">
                            <h3>Cart: {troliId1}</h3>
                            <p className="fw-bold">List:</p>
                            <ol className="list-group list-group-numbered">
                                {rak.barangName.map((item, index) => {
                                    return(
                                        <>
                                            {
                                                item.map((values, index1) => {
                                                    if (values !== null) {
                                                        return(<>
                                                            {
                                                                values.map((items, indexs) => {
                                                                    {console.log(items + "aba")}
                                                                    return(<li className="list-group-item" key={items.code}>{items.name}</li>)
                                                                })
                                                            }
                                                            </>
                                                        )
                                                        
                                                    }
                                                    
                                                    
                                                    //return(<li className="list-group-item" key={value} id={rak.barangCode[index][index1]}>{value}</li>)
                                                })
                                            }
                                        </>
                                    )
                                    
                                    
                                })}
                            </ol>
                        </div>
                        <div className="col">
                            <div className="row mb-3 px-4">
                                <input type="text" value={troliId} 
                                    onChange={e => setTroliId(e.target.value)}
                                    placeholder="CartID" 
                                    className="col"/>
                                <button type="button" onClick={inputCartId} className="btn btn-primary col-md-auto ml-2">+</button>
                            </div>
                            <div className="col">
                                {!scanCart ? <button type="button" className="btn btn-primary py-1 px-4 my-1" onClick={openBarangScanner}>Scan Barang</button> : <QrReader delay={scanner.delay} style={previewStyle} className="shadow-sm bg-body rounded" onError={handleError} onScan={handleScan} />}
                                
                                {!scanBarang ? null : <QrReader delay={scanner.delay} style={previewStyle} className="shadow-sm bg-body rounded" onError={handleError} onScan={handleScanBarang} />}

                                <div className={`alert text-center ${beenScan == "-1" ? "alert-primary" : beenScan == "0" ? "alert-danger fw-bold" : "alert-success"}`} role="alert">
                                    {beenScan == "-1" ? "Tekan Scan Barang untuk menscan barang" : beenScan == "0" ? "Arahkan QR Code ke Kamera" : "Pengambilan barang berhasil"}
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <h3 className="mt-4 mb-0">Denah</h3>
                    <p>Keterangan: Warna biru menandakan rak yang harus dikunjungi</p>
                    <div className="text-center"><span className="badge badge-primary">Warehouse Front</span></div>
                    <div className="container my-3">
                        <div className="row">
                        {rak.rakId.map((value, index) => {
                            {console.log(index)}
                            return(<div className="col">
                                {rak.rakId[index].map((value1, index1)=> {
                                    {console.log(index1)}
                                    return(<div className={`py-4 fw-bold text-center ${rak.rakStatus[index][index1] ? 'bg-primary' : 'bg-white'}`}>{value1}</div>)
                                })}
                            </div>)
                        })}
                        </div>
                    </div>
                    <div className="text-center"><span className="badge badge-primary">Warehouse Back</span></div>
                </div>
            </div>
           

        </div>
    )
}