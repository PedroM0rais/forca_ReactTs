import { KeyboardEvent, useCallback, useEffect, useState } from "react"
import palavras from "./ListaPalavra.json"
import ForcaDesenho from "./ForcaDesenho"
import ForcaPalavra from "./ForcaPalavra"
import Teclado from "./Teclado"

function getWord() {

  return palavras[Math.floor(Math.random() * palavras.length)]

}

function App() {
  const [palavra, setPalavra] = useState(getWord)
  const [palavrasAdivinhadas, setPalavrasAdivinhadas] = useState<string[]>([])

  const letrasIncorretas = palavrasAdivinhadas.filter(
    letra => !palavra.includes(letra)
  )

  const perdeu = letrasIncorretas.length >= 6
  const venceu = palavra.split("").every(letra => palavrasAdivinhadas.includes(letra))

  const adicionarLetrasAdivinhadas = useCallback(
    (letra: string) => {

    if(palavrasAdivinhadas.includes(letra) || perdeu || venceu) return
  
    setPalavrasAdivinhadas(letrasAtuais => [...letrasAtuais, letra])

  }, [palavrasAdivinhadas, venceu, perdeu]
)
  
  useEffect(() => {
    
    const handler = (e: KeyboardEvent) => {

      const key = e.key

      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      adicionarLetrasAdivinhadas(key)

    }

    document.addEventListener("keypress", handler)

    return () => {

      document.removeEventListener("keypress", handler)

    }
  }, [palavrasAdivinhadas])

  useEffect(() => {

    const handler = (e: KeyboardEvent) => {

      const key = e.key

      if(key !== "Enter") return

      e.preventDefault()
      setPalavrasAdivinhadas([])
      setPalavra(getWord())

    }

    document.addEventListener("keypress", handler)

    return () => {

      document.removeEventListener("keypress", handler)

    }

  }, [])

  return(

      <div 
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
      >

        <div style={{ fontSize: "2rem", textAlign: "center" }}>

          {venceu && "Vitória! - Recarregue para tentar denovo"}
          {perdeu && "Derrota! - Recarregue para tentar denovo"}
 
        </div>

        <ForcaDesenho numeroDeTentativas = {letrasIncorretas.length}/>
        <ForcaPalavra 
          revelar = {perdeu} 
          letrasAdivinhadas={palavrasAdivinhadas} 
          palavra={palavra}
        />
        <div style={{ alignSelf: "stretch" }}>

          <Teclado 
            disabled = {venceu || perdeu}
            letrasAtivas = {palavrasAdivinhadas.filter(letra => 
              palavra.includes(letra)
              )} 
            letrasInativas = {letrasIncorretas}
            adicionarLetrasAdivinhadas = {adicionarLetrasAdivinhadas}
          />

        </div>

      </div>

  )

}

export default App
