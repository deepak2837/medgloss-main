import { useState } from 'react';
import { useRouter } from 'next/router';

const universities = [
  {
    "id": 1,
    "name": "Harvard Medical School",
    "code": "HMS"
  },
  {
    "id": 2,
    "name": "Mayo Clinic College of Medicine and Science",
    "code": ""
  },
  {
    "id": 3,
    "name": "Johns Hopkins School of Medicine",
    "code": "JHUSOM"
  },
  // Add more universities here
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const filterUniversities = (query) => {
    return universities.filter(university =>
      university.name.toLowerCase().includes(query.toLowerCase()) ||
      university.code.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setShowSuggestions(true);
  };

  const handleSearch = (selectedUniversity) => {
    setShowSuggestions(false);
    if (selectedUniversity) {
      router.push(`/${selectedUniversity.code}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a university..."
        value={query}
        onChange={handleInputChange}
      />
      {/* Suggestions */}
      {showSuggestions && query && (
        <ul>
          {filterUniversities(query).map(university => (
            <li key={university.id} onClick={() => handleSearch(university)}>
              {university.name} ({university.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
