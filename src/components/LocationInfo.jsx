const LocationInfo = ( {location} ) => {
  return (
    <article className="location">
        <h2 className="Location__Name">{location?.name}</h2>
            <ul className="Location__List">
            <li className="Location__li"><span className="Location__Item1">Type: </span> <span className="Location__Item2">{location?.type}</span> </li>
            <li className="Location__li"><span className="Location__Item1">Dimension: </span> <span className="Location__Item2">{location?.dimension || "Unknow"}</span> </li>
            <li className="Location__li"><span className="Location__Item1">Population: </span> <span className="Location__Item2">{location?.residents.length}</span> </li>
            </ul>
    
    </article>
  )
}

export default LocationInfo