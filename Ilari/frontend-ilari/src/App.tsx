import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import { getAllDiaries } from './diaryService'


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])



  console.log('what are diaries---', diaries);
  return (
    <div>
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
