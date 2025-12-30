import { useState, useEffect } from 'react'
import type { DiaryEntry, Weather, Visibility } from './types'
import { createDiary, getAllDiaries } from './diaryService'
import axios from 'axios'


const App = () => {
  const [message, setMessage] = useState < string[]>([])
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])


  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }
    try {
      await createDiary(diaryToAdd);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.error;
        console.log('what is errors', errors);
        if (Array.isArray(errors)) {
          setMessage(errors.map(e => {
            return `Error: ${e.message}`
          }));
          setTimeout(() => {
            setMessage([])
          }, 5000);
        }
      }
}
    console.log('creating new note---', diaryToAdd);
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')

  }



  console.log('what are diaries---', diaries);
  return (
    <div>
      {message.map((msg, index) => (
        <div style={{
    color: 'red',
  }} key={index}>{msg}</div>
      ))}


  <form onSubmit={diaryCreation}>
  <label htmlFor="date">Date:</label>
  <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />

  <fieldset>
          <legend>Visibility:</legend>
              <div>
      <input
        type="radio"
        name="visibility"
        id="visibility-great"
        value="great"
        checked={visibility === "great"}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <label htmlFor="visibility-good">Great</label>
    </div>
    <div>
      <input
        type="radio"
        name="visibility"
        id="visibility-good"
        value="good"
        checked={visibility === "good"}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <label htmlFor="visibility-good">Good</label>
    </div>

    <div>
      <input
        type="radio"
        name="visibility"
        id="visibility-ok"
        value="ok"
        checked={visibility === "ok"}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <label htmlFor="visibility-ok">Ok</label>
    </div>

    <div>
      <input
        type="radio"
        name="visibility"
        id="visibility-poor"
        value="poor"
        checked={visibility === "poor"}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <label htmlFor="visibility-poor">Poor</label>
    </div>
  </fieldset>

  <fieldset>
    <legend>Weather:</legend>
    <div>
      <input
        type="radio"
        name="weather"
        id="weather-sunny"
        value="sunny"
        checked={weather === "sunny"}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="weather-sunny">Sunny</label>
    </div>

    <div>
      <input
        type="radio"
        name="weather"
        id="weather-rainy"
        value="rainy"
        checked={weather === "rainy"}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="weather-rainy">Rainy</label>
    </div>

    <div>
      <input
        type="radio"
        name="weather"
        id="weather-cloudy"
        value="cloudy"
        checked={weather === "cloudy"}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="weather-cloudy">Cloudy</label>
          </div>

              <div>
      <input
        type="radio"
        name="weather"
        id="weather-stormy"
        value="stormy"
        checked={weather === "stormy"}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="weather-cloudy">Stormy</label>
          </div>


              <div>
      <input
        type="radio"
        name="weather"
        id="weather-windy"
        value="windy"
        checked={weather === "windy"}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="weather-cloudy">Windy</label>
    </div>
  </fieldset>

  <label htmlFor="comment">Comment:</label>
  <input
    type="text"
    id="comment"
    value={comment}
    onChange={(event) => setComment(event.target.value)}
  />

  <button type="submit">New Entry</button>
</form>


      <h3>Diary Entries</h3>
      {diaries.map((entry, index) => (
        <div key={index}>
          <h4>{entry.date}</h4>
          <div>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
            <p><em>{entry.comment}</em></p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default App
