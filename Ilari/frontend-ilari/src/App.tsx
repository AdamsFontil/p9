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
        <p>date: <input value={date} onChange={(event) => setDate(event.target.value)} /></p>
        <p>visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)} /></p>
        <p>weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} /></p>
        <p>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></p>
        <button type='submit'>new entry</button>
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
