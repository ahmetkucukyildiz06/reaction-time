import { useState, useRef, useEffect } from 'react'

const ReactionTime = () => {
  const [gameStatus, setGameStatus] = useState('ready')
  const [reactionTime, setReactionTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const timeoutRef = useRef(null)

  function startGame() {
    setGameStatus('waiting')
    setReactionTime(null)
    setStartTime(null)
    setEndTime(null)

    const randomWait = Math.random() * 5000 + 1000

    timeoutRef.current = setTimeout(() => {
      setGameStatus('active')
      setStartTime(Date.now())
    }, randomWait)
  }
  const handleClick = () => {
    if (gameStatus === 'active') {
      const finishTime = Date.now()
      setEndTime(finishTime)
      setReactionTime(finishTime - startTime)
      setGameStatus('finished')
    } else if (gameStatus === 'waiting') {
      clearTimeout(timeoutRef.current)
      setGameStatus('too-early')
    }
  }

  const renderResult = () => {
    if (gameStatus === 'too-early') {
      return (
        <>
          <p>Çok erken tıkladınız! Rengin yeşile dönmesini bekleyiniz.</p>
          <br />
          <button onClick={startGame}>Yeniden Dene</button>
        </>
      )
    } else if (gameStatus === 'finished') {
      return (
        <>
          <p style={{ textAlign: 'center' }}>
            Tebrikler! <br />
            Reaksiyon süreniz <br />
            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>
              {reactionTime} ms!
            </span>
            <br /> Daha iyisini yapabilirsiniz!
          </p>
          <br />
          <button onClick={startGame}>Yeniden Dene!</button>
        </>
      )
    }
    return null
  }
  const getBoxStyle = () => {
    if (gameStatus === 'active') {
      return { backgroundColor: 'green', cursor: 'pointer' }
    }
    if (gameStatus === 'waiting') {
      return { backgroundColor: 'red', cursor: 'pointer' }
    }
    return null
  }

  return (
    <>
      <div className="reaction-time-game">
        <h1>Reaksiyon Zamanı Oyunu</h1>
        {gameStatus === 'ready' && (
          <>
            <button onClick={startGame}>Oyunu Başlat</button>
            <br />
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
              {' '}
              Oyunda Amaç Başlat butonuna bastıktan sonra ekranda görünen
              kırmızı yuvarlağa rengi yeşile döndükten sonra mümkün olduğunca
              erken tıklamaktır.
              <br />
              Başarılı bir şekilde tıkladığınızda süreniz milisaniye cinsinden
              gösterilecektir.
              <br />
              Erken tıklarsanız "çok erken" mesajı alacaksınız.
            </p>
          </>
        )}

        {(gameStatus === 'waiting' || gameStatus === 'active') && (
          <div
            onClick={handleClick}
            style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              margin: '20px auto',
              border: '2px solid black',
              ...getBoxStyle(),
            }}
          ></div>
        )}
        {renderResult()}
      </div>
    </>
  )
}
export default ReactionTime
