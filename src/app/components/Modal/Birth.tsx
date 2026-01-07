import { FC } from "react"
import { BirthCerticat } from "../../../data/typeData"

const BirthCerticat: FC<BirthCerticat> = (birth) => {
  return <div>
    <div className="left">
      <div className="top">
        <p>Province D'Antsiranana</p>
        <p>Region SAVA</p>
        <p>District de Antalaha</p>
        <p>Commune Urbaine D'Antalaha</p>
      </div>
      <div className="bottom">
        <p>Numero : {birth.registrationNumber}</p>
        <p>Natao ny : {birth.createdAt}</p>
        <p>Anarana : {birth.name}</p>
        <p>Fahaterahana : {birth.dateOfBirth}</p>
      </div>
    </div>
    <div className="right"></div>
  </div>
}