import { useEffect } from "react"
import useFetch from "../hooks/useFetch"

const ResidentsCard = ({ residentUrl }) => {

    const [ resident, getResident ] = useFetch(residentUrl)

    useEffect(() => {
        getResident()
    }, [])
    
    // console.log(resident);


    const statusIcon =
        resident?.status === "Alive" ?"🟢"
        : resident?.status === "Dead"? "🔴"
        : "⚫";
                        

  return (
    <article className="resident">
        <header className="resident__Header">
            <img className="resident__image" src={resident?.image} alt="" />
            <div className="resident__Status">
                <span className="resident__status__Circule">{statusIcon}</span>
                <span className="resident__status__Value">{resident?.status}</span>
            </div>
        </header>
        <section className="resident__Body">
            <h3 className="resident__Name">{resident?.name}</h3>
            <hr className="resident__Hr"/>

            <div className="container__List">
            <li className="resident__List">
                <span className="resident__Label">Specie: </span>
                <span className="resident__Value">{resident?.species}</span>
            </li>

            <li className="resident__List">
                <span className="resident__Label">Origin: </span>
                <span className="resident__Value">{resident?.origin.name}</span>
            </li>

            <li className="resident__List">
                <span className="resident__Label">Episodes where appear: </span>
                <span className="resident__Value">{resident?.episode.length}</span>
            </li>
            </div>
        </section>
    </article>
    
  )
}

export default ResidentsCard

