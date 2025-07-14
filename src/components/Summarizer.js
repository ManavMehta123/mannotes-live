
import React, { useState } from 'react';
import axios from 'axios';

function Summarizer({ boardText }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/ai/summarize', { content: boardText });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary('Error summarizing content.');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Board'}
      </button>
      {summary && <div><h4>Summary:</h4><p>{summary}</p></div>}
    </div>
  );
}

export default Summarizer;
