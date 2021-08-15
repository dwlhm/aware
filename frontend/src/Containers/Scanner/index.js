import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'
import WebCam from 'react-webcam'
import fs from 'fs'
import { decode } from 'base64-arraybuffer'
import axios from 'axios'
import { v4 as uuidV4 } from 'uuid'
import QRCode from 'qrcode.react'
import { Component } from 'react/cjs/react.production.min'

export default function Scanner(props) {

    const [ imgSrc, setImgSrc ] = useState(null)
    const [ listProduct, setListProduct ] = useState([])
    const [ specialCode, setSpecialCode ] = useState(null)
    const [ dataSaved, setDataSaved ] = useState(true)
    const imgRef = useRef(null)

    const videoconstraint = {
        width: 1280,
        height: 720,
        facingMode: "user"
    }   
    
    const camRef = useRef(null)

    const saveData = async event => {
        event.preventDefault()

        let data = JSON.stringify({
            code: specialCode,
            class: listProduct,
            cart: 'cart1'
          })

        await axios({
          method: 'post',
          url: 'http://localhost:3000/v1/product',
          headers: { 
            'Content-Type': 'application/json'
          },
          data: data,
          responseType: 'stream'
        })
          .then(function (response) {
            console.log(response.data.status)
            setDataSaved(response.data.status ? true : false)
          })
    }

    const WebCamCapture = async event => {
        event.preventDefault()

        const imageSrc = await camRef.current.getScreenshot();
            
        await setImgSrc(imageSrc)


        let imageProd = new Image(720, 360)
        imageProd.src = imageSrc

        console.log(imageProd)

        await cocoSsd.load()
            .then(model => model.detect(imageProd))
            .then(async prediction => {
                console.log(listProduct)

                let item = listProduct
                for (var i = 0; i < prediction.length; i++) {
                    await item.push(prediction[i].class)
                }
                await setListProduct(item)

                setSpecialCode(uuidV4())
                setDataSaved(false)
            })
    }

    const lists = listProduct
    const listItem = lists.map((data, keys) => 
        <li key={keys}>{data}</li>
    )  

    
    
        return (
          <div className="row" style={{minHeight: 100 + 'vh'}}>
            <div className="bg-light col py-4">
                <h2>Scanner</h2>
                <WebCam 
                    className="rounded bg-dark"
                    audio = {false}
                    height = {360}
                    ref = {camRef}
                    screenshotFormat = "image/jpeg"
                    width = {720}
                    videoconstraint = {videoconstraint}
                />
                <div>
                    <button className="btn btn-success btn-lg btn-block" onClick={WebCamCapture} disabled={dataSaved ? false : true}>Capture</button>
                </div>
            </div>
            <div className="col py-4">
                <div style={{display: {imgSrc} ? 'block' : 'none'}}>
                    <h4 className="text-center mb-3">Result</h4>
                    { !dataSaved ? <div className="d-flex justify-content-center mb-3"><QRCode value={`{"code":"${specialCode}"}`} size={200} /></div> : <div className="alert alert-warning text-center">Data belum tersedia.</div>}
                    { !dataSaved ? <ol>{listItem}</ol> : null}
                    { !dataSaved ? <div className="btn btn-dark btn-md btn-block" onClick={saveData}>Simpan Data</div> : null}
                </div>
            </div>
          </div>
        );
      

}