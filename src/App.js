import './App.css';
import { useState, useEffect } from 'react';

function App()
{
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setSetResult] = useState([])
  useEffect(() =>
  {
    const dataRequest = {
      prompt: `Write a poem about ${search} `,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    const fetchData = async () =>
    {
      if (search)
      {
        setIsLoading(true);
        const res = await fetch(`https://api.openai.com/v1/engines/text-curie-001/completions`, {
          body: JSON.stringify(dataRequest),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          method: 'POST'
        })
        const data = await res.json();
        const newObject = { text: search, list: data.choices, id: Date.now() }
        setSetResult([...results, newObject])
        setIsLoading(false);

      }
    };

    fetchData();
  }, [search]);
  return (
    <div className="App">
      <main>

        <h2> FUN WITH AI</h2>

        <div>
          <div>
            <h3> Enter prompt</h3>
            <div className='prompt'>
              <textarea
                value={query}
                onChange={event => setQuery(event.target.value)}
                rows="10" cols="60"

              />


              <button
                type="button"
                className='btn'
                onClick={() =>
                  setSearch(query)
                }
              >
                Submit
              </button>
            </div>
            <div>
              <h1> Responses</h1>
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                <div>

                  {
                    results.sort((a, b) => b.id - a.id).map(item => (
                      <div key={item.id} className="box">
                        <h3> prompt: <span> {item.text} </span>  </h3>
                        <div> <h3> responses </h3>  {item?.list?.map((response, index) => (
                          <span className='textBox' key={index}> {response.text} </span>
                        ))} </div>
                      </div>
                    ))
                  }

                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
