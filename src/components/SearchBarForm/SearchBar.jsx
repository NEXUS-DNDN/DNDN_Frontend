// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FiSearch } from 'react-icons/fi';
// import './searchBar.css';

// const SearchBar = () => {
//   const [query, setQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && query.trim()) {
//       navigate(`/search-result?query=${encodeURIComponent(query)}`);
//     }
//   };

//   const handleClick = () => {
//     if (location.pathname !== '/search') {
//       navigate('/search');
//     }
//   };

//   return (
//     <div className="search-bar" onClick={handleClick}>
//       <FiSearch className="search-icon" />
//       {location.pathname === '/search' ? (
//         <input
//           type="text"
//           className="search-input"
//           placeholder="서비스를 검색해보세요"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//       ) : (
//         <span className="search-placeholder">서비스를 검색해보세요</span>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
