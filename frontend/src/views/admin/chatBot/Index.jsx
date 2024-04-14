// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     axios.post('http://localhost:3000/ask', { query })
//     .then(response => {
//       console.log('Response:', response.data);
//     })
//     .catch(error => {
//       console.error('Axios Error:', error);
//     })};
  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter your query..."
//         />
//         <button type="submit" disabled={loading}>Submit</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {response && <p>{response}</p>}
//     </div>
//   );
// };

// export default Chatbot;
