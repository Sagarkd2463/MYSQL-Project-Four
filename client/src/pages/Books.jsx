import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/books');
                setBooks(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/books/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div>
        <h1>Pragati Book Shop</h1>
        <div className='books'>
            {books && books.map && books.map((book, idx) => (
                    <div key={idx} className='book'>
                        <p>{book.id}</p>
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <p>{book.cover}</p>
                        <span>$ {book.price}</span>
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'>
                            <Link to={`/update/${book.id}`}>Update</Link>
                        </button>
                    </div>
                ))}
        </div>
        <button className='formButton'>
            <Link to='/add' style={{textDecoration: 'none', color:'white'}}>Add a New Book</Link>
        </button>
        
    </div>
  )
}

export default Books;