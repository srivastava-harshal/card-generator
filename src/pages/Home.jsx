import React, { useState } from 'react';

const initialData = {
  cardHolder: '',
  cardNumber: '',
  month: '',
  year: '',
  cvv: '',
};

const initialErrors = {
  cardHolder: '',
  cardNumber: '',
  month: '',
  year: '',
  cvv: '',
};

const validate = (data, setError) => {
  const { cardHolder, cardNumber, month, year, cvv } = data;

  if (!cardHolder) {
    setError({
      cardHolder: 'Name cannot be empty!',
    });
    return;
  }

  if (!cardNumber) {
    setError({
      cardNumber: 'Card Number cannot be empty!',
    });
    return;
  }

  if (!month) {
    setError({
      month: 'Month cannot be empty!',
    });
    return;
  }

  if (!year) {
    setError({
      year: 'Year cannot be empty!',
    });
    return;
  }

  if (!cvv) {
    setError({
      cvv: 'CVV cannot be empty!',
    });
    return;
  }

  if (cardHolder.length < 3) {
    setError(prev => ({
      ...prev,
      cardHolder: 'Name cannot be less than 3 characters',
    }));
    return;
  }

  if (cardHolder.length > 35) {
    setError(prev => ({
      ...prev,
      cardHolder: 'Name cannot be more than 35 characters',
    }));
    return;
  }

  if (isNaN(month)) {
    setError(prev => ({
      ...prev,
      cardNumber: 'Please enter month in format MM.',
    }));
    return;
  }

  if (isNaN(year)) {
    setError(prev => ({
      ...prev,
      cardNumber: 'Please enter year in format YY.',
    }));
    return;
  }

  return true;
};

const Home = () => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialErrors);

  const handleChange = (key, value) => {
    setError(initialErrors);
    setData({ ...data, [key]: value });
    console.log(value);
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

  const onClick = e => {
    // e.stopPropagation();

    if (validate(data, setError)) {
      // send data to api
      console.log('form submitted');
      setData(initialData);
    }
    // console.log(data);
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
          <div style={{ position: 'relative' }} className="card-holder">
            <p>CARDHOLDER NAME</p>
            <input
              className={error.cardHolder ? 'error' : ''}
              maxLength="35"
              type="text"
              placeholder="e.g Steve Jobs"
              value={data.cardHolder}
              onChange={e =>
                handleChange('cardHolder', e.target.value.toUpperCase())
              }
            />
            {error.cardHolder && (
              <p style={{ position: 'absolute', bottom: '-7px', color: 'red' }}>
                {error.cardHolder}
              </p>
            )}
          </div>
          <div className="card-number" style={{ position: 'relative' }}>
            <p>CARD NUMBER</p>
            <input
              className={error.cardNumber ? 'error' : ''}
              maxLength="19"
              type="text"
              placeholder="e.g 1234 5678 9123 0000"
              value={getCardNumber()}
              onChange={e => handleChange('cardNumber', e.target.value)}
            />
            {error.cardNumber && (
              <p style={{ position: 'absolute', color: 'red', bottom: '-7px' }}>
                {error.cardNumber}
              </p>
            )}
          </div>
          <div className="exp-date" style={{ position: 'relative' }}>
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
              {error.month || error.year ? (
                <p
                  style={{
                    position: 'absolute',
                    color: 'red',
                    bottom: '-7px',
                  }}
                >
                  {error.month}
                </p>
              ) : null}
            </div>
            <div style={{ position: 'relative' }}>
              <p>CVV</p>
              <input
                maxLength="3"
                type="text"
                placeholder="e.g 123"
                value={data.cvv}
                onChange={e => handleChange('cvv', e.target.value)}
              />
              {error.cvv && (
                <p
                  style={{ position: 'absolute', color: 'red', bottom: '-7px' }}
                >
                  {error.cvv}
                </p>
              )}
            </div>
          </div>
          <button onClick={onClick}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
