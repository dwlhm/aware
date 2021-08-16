import React, { useState, useEffect, useRef } from 'react'
import QrReader from 'react-qr-scanner'
import axios from 'axios'
import {  TileLayer, MapContainer, Popup, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Samy, SvgProxy } from 'react-samy-svg'

export default function Warehouse(props) {

    const [scanner, setScanner] = useState({delay: 100, result: "Arahkan QR Code ke Kamera"})
    const [scanCart, setScanCart] = useState(false)
    const [scanBarang, setScanBarang] = useState(false)
    const [troliId, setTroliId] = useState("")
    const [troliId1, setTroliId1] = useState("")
    const [cond, setCond] = useState({temp: 'loading', hum: 'loading'})
    const [beenScan, setBeenScan] = useState("-1")
    const [rak, setRak] = useState([
        {
            name: 'r1',
            empty: 'full'
        },
        {
            name: 'r2',
            empty: 'full'
        },
        {
            name: 'r3',
            empty: 'full'
        },
        {
            name: 'r4',
            empty: 'full'
        }
    ])
    
    const mapRef = useRef(null)

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
        
        const intervalId = setInterval(() => {

            async function fetchData() {
            
                let config = {
                  method: "get",
                  url:
                    "http://localhost:3000/v1/room"
                };

                await axios(config)
                  .then(function (response) {
                    setCond({temp: response.data.data.Temperature, hum: response.data.data.Humudity})
                  })
                  .catch(function (error) {
                    console.log(error);
                  })

                  await axios({
                    method: 'get',
                    url: 'http://localhost:3000/v1/cart?id=cart1',
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    responseType: 'stream'
                  })
                    .then(function (response) {
                      console.log(response.data.data)
                      setRak([
                          {
                              name: response.data.data[0].rak ? response.data.data[0].rak : undefined,
                              empty: response.data.data[0].rak ? 'full' : 'empty'
                          },
                          {
                            name: response.data.data.length > 1 ? response.data.data[1].rak :  undefined,
                            empty: response.data.data.length > 1 ? 'full' : 'empty'
                        },
                        {
                            name: response.data.data.length > 2 ? response.data.data[2].rak :  undefined,
                            empty: response.data.data.length > 2 ? 'full' : 'empty'
                        },
                        {
                            name: response.data.data.length > 3 ? response.data.data[3].rak :  undefined,
                            empty: response.data.data.length > 3 ? 'full' : 'empty'
                        }
                      ])
                    })

            }

            fetchData()
        }, 3000)

        return () => clearInterval(intervalId)
            
    }, [])

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
                <Samy 
                    id="centerMap"
                    path="./maps.svg"
                    width={50 + 'rem'}
                    height={40 + 'rem'}
                >
                    <SvgProxy selector="#r1" fill={rak[0].empty == 'full' ? 'blue' : 'black'} />
                    <SvgProxy selector="#r2" fill={rak[1].empty == 'full' ? 'blue' : 'black'} />
                    <SvgProxy selector="#r4" fill={rak[2].empty == 'full' ? 'blue' : 'black'} />
                    <SvgProxy selector="#r5" fill={rak[3].empty == 'full' ? 'blue' : 'black'} />

                </Samy>
                {/*<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
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
                    </div>*/}
            
           </div>

        </div>
    )
}