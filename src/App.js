import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      console.log(response.data);
      setUsers(response.data.data);
    }
    loadUsers();
  }, []);

  const onSuggestionHandler = (text) => {
    setText(text);
    setSuggestions([]);
  }

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0){
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, 'gi');
        return user.email.match(regex);
      })
    }
    console.log(matches)
    setSuggestions(matches)
    setText(text);
  }

  return (
    <div className="container">
      <input type="text" className='col-md-12' style={{marginTop:'10px'}}
        onChange={e => onChangeHandler(e.target.value)}
             value={text}
             onBlur={() => {
               setTimeout(() => {
                 setSuggestions([])
               }, 1000)
             }}
      />
      {suggestions && suggestions.map((suggestion, i) => {
        return(
            <div key={i}
                 className='suggestion col-md-12 justify-content-md-center'
            onClick={() => onSuggestionHandler(suggestion.email)}>{suggestion.email}</div>
        )
      })}
    </div>
  );
}

export default App;
