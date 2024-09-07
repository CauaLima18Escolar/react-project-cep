import React, { useState } from 'react'
import { CEP_API } from './server/api';

export const App = () => {
  const [cepData, setCepData] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [hideStyle, seyHideStyle] = useState(true)
  const [hasErr, setHasErr] = useState(false)

  async function requireData_CEP_API() {
    seyHideStyle(false)
    try {
      const response = await CEP_API.get(`${inputValue}/json`);
      const data = response.data;
      setCepData(data);
      seyHideStyle(true)
      setHasErr(false)

    } catch {
      setHasErr(true)
      seyHideStyle(true)
    };
  };

  return (
    <>
      <h1 style={ {fontSize: '2rem'} }>Encontre qualquer CEP no Brasil com um clique!</h1>
      <p style={ {maxWidth: '64ch', marginBottom: '64px'} }>Busque endereços rapidamente e com precisão, tornando o envio de correspondências e a localização de lugares muito mais fácil. Simples, rápido e confiável, ideal para qualquer necessidade!</p>
      {console.log(hasErr)}
      <span style={ {display: 'flex', width: '80%'} }>
        <input onChange={(e) => {setInputValue(e.target.value)}} type="text" placeholder='Insira um CEP válido'/>
        <button onClick={requireData_CEP_API}>
          <img src="./search.svg" alt="" />
        </button>
      </span>

      <div style={ {display: hideStyle ? 'none' : 'block' }} className="loader"></div>

      <div style={{display: hasErr ? 'block' : 'none'}}>
        <p><strong>Erro!</strong> informe um CEP válido.</p>
      </div>

      {Object.keys(cepData).length > 0 && (
        <div className='cep-data'>
          <h2>CEP: {cepData.cep} - {cepData.uf}</h2>
          <p><strong>Logradouro:</strong> {cepData.logradouro ? cepData.logradouro : 'Indefinido'}</p>
          <p><strong>Complemento:</strong> {cepData.complemento ? cepData.logradouro : 'Indefinido'}</p>
          <p><strong>Localidade:</strong> {cepData.localidade}</p>
          <p><strong>Bairro:</strong> {cepData.bairro ? cepData.bairro : 'Indefinido'}</p>
          <p><strong>Estado:</strong> {cepData.estado}</p>
          <p><strong>Região:</strong> {cepData.regiao}</p>
        </div>
      )}
    </>
  )
}