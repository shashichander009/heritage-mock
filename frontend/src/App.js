import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/greet/', { name });
            setGreeting(response.data.greeting);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginLeft: "10px" }}
                    />
                </label>
                <button type="submit" style={{ marginLeft: "10px" }}>Submit</button>
            </form>
            {greeting && <h2>{greeting}</h2>}
        </div>
    );
};

export default App;