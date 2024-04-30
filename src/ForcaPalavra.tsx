type ForcaPalavraProps = {
    letrasAdivinhadas: string[]
    palavra: string
    revelar?: boolean
}

const ForcaPalavra = ({ letrasAdivinhadas, palavra, revelar = false } : ForcaPalavraProps) => {

  return(
    <div style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace"
    }}>

        {palavra.split("").map((letra, index) => (
            <span 
                style={{
                    borderBottom: ".1em solid black"
                }} 
                key={index}
            >

                <span 
                    style={{
                        visibility: 
                            letrasAdivinhadas.includes(letra) || revelar
                                ? "visible"
                                : "hidden",
                        color:
                            !letrasAdivinhadas.includes(letra) && revelar ? "red" :
                            "black",
                    }}
                >
                    {letra}
                </span>

            </span>
        ))}

    </div>
  )
}

export default ForcaPalavra