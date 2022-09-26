import React, { useEffect, useState } from 'react';

const initialData = {
  cardHolder: '',
  cardNumber: '',
  month: '',
  year: '',
  cvv: '',
};

const Home = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getCardNumber = () => {
    const value = data.cardNumber;
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="parent">
      <div className="left">
        <div className="card-1">
          <div className="circles">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
          </div>
          <div className="number-on-card">
            {data.cardNumber === '' ? '0000 0000 0000 0000' : data.cardNumber}
          </div>
          <div className="lower-section">
            <div className="lower-name">
              {data.cardHolder === ''
                ? 'STEVE JOBS'
                : data.cardHolder.toUpperCase()}
            </div>
            <div className="lower-exp-date">
              {data.month === '' ? 'MM' : data.month}/
              {data.year === '' ? 'YY' : data.year}
            </div>
          </div>
        </div>
        <div className="card-2">
          <div className="black-strip"></div>
          <div className="gray-strip">{data.cvv === '' ? '123' : data.cvv}</div>
        </div>
      </div>
      <div className="right">
        <div className="right-container">
          <div className="card-holder">
            <p>CARDHOLDER NAME</p>
            <input
              maxLength="35"
              type="text"
              placeholder="e.g Steve Jobs"
              value={data.cardHolder.toUpperCase()}
              onChange={e => handleChange('cardHolder', e.target.value)}
            />
          </div>
          <div className="card-number">
            <p>CARD NUMBER</p>
            <input
              maxLength="19"
              type="text"
              placeholder="e.g 1234 5678 9123 0000"
              value={getCardNumber()}
              onChange={e => handleChange('cardNumber', e.target.value)}
            />
          </div>
          <div className="exp-date">
            <div>
              <p>EXP.DATE (MM/YY)</p>
              <input
                maxLength="2"
                type="text"
                className="exp-input-field"
                placeholder="MM"
                value={data.month}
                onChange={e => handleChange('month', e.target.value)}
              />
              <input
                maxLength="2"
                type="text"
                className="exp-input-field"
                placeholder="YY"
                value={data.year}
                onChange={e => handleChange('year', e.target.value)}
              />
            </div>
            <div>
              <p>CVV</p>
              <input
                maxLength="3"
                type="text"
                placeholder="e.g 123"
                value={data.cvv}
                onChange={e => handleChange('cvv', e.target.value)}
              />
            </div>
          </div>
          <button>CONFIRM</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
