import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import { createDiary, getAllDiaries } from './diaryService'


const App = () => {
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


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date,
      weather: weather as 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy',
      visibility: visibility as 'great' | 'good' | 'ok' | 'poor',
      comment
    }
    createDiary(diaryToAdd).then(data => {
      setDiaries(diaries.concat(data))
    })




    console.log('creating new note---', diaryToAdd);
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')

  }



  console.log('what are diaries---', diaries);
  return (
    <div>
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
