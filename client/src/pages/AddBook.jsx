import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [book, setBook] = useState({
        title:'',
        desc:'',
        cover:'',
        price: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name] : e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
           await axios.post('http://localhost:3001/books', book);
           navigate('/'); 
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='title' name='title' onChange={handleChange}/>
        <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>
        <input type="number" placeholder='price i.e. 10.99' name='price' onChange={handleChange}/>

        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default AddBook;