import styles from "./Teclado.module.css"

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

type TecladoProps = {
    disabled?: boolean
    letrasAtivas: string[] 
    letrasInativas: string[]
    adicionarLetrasAdivinhadas: (letra: string) => void
}

const Teclado = ({ 
    letrasAtivas, 
    letrasInativas, 
    adicionarLetrasAdivinhadas,
    disabled = false
} 
    : TecladoProps) => {
    return(
        <div 
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: ".5rem"
            }}
        >

            {KEYS.map(key => {
                const ativado = letrasAtivas.includes(key)  
                const inativo = letrasInativas.includes(key)  
                return (

                    <button 
                        onClick={() => adicionarLetrasAdivinhadas(key)} 
                        className={`${styles.btn} 
                        ${ativado ? styles.active : ""}
                        ${inativo ? styles.inactive : ""}`} 
                        disabled={inativo || ativado || disabled}
                        key={key}
                    >

                        {key}

                    </button>

                )
            })}

        </div>
    )
}

export default Teclado