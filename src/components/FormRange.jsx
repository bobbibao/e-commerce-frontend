
import { useState } from 'react';
const FormRange = ({ label, name, size, price }) => {
  const step = 10;
  const maxPrice = 1000000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className='form-control'>
      <label htmlFor={name} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
        <span>
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedPrice)}
        </span>
      </label>
      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range ${size}`}
        step={step}
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}</span>
        <span className='font-bold text-md'>Max :  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;
