import { FC, RefObject } from "react";
import { BirthCerticat } from "../../../../data/typeData";

interface PropsActItem {
  birth: BirthCerticat;
  pdfRef: RefObject<HTMLDivElement | null>;
}


const ActItem : FC<PropsActItem> = ({ birth, pdfRef }) => {
  return (
    <div ref={pdfRef} className="border m-8 p-10 text-[14px] leading-7 font-serif text-black">
      {/* TOP SECTION */}
      <div className="grid grid-cols-[1fr_4fr] gap-10 mb-8">

        {/* LEFT INFO */}
        <div className="space-y-6">
          <div>
            <p>Faritany : Antsiranana</p>
            <p>Faritra : SAVA</p>
            <p>Distrika : Antalaha</p>
            <p>Kaominina : Antalaha</p>
          </div>

          <div className="space-y-1">
            <p><strong>Laharana :</strong> {birth.registrationNumber}</p>
            <p><strong>Natao ny :</strong> {new Date(birth.createdAt).toLocaleDateString("fr-FR")}</p>
            <p className="uppercase tracking-wide text-xs mt-3">Fahaterahana</p>
            <p className="font-semibold">{birth.name}</p>
            <p>{new Date(birth.dateOfBirth).toLocaleDateString("fr-FR")}</p>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div>
          <div className="text-center mb-6">
            <p className="uppercase">REPOBLIKAN’I MADAGASIKARA</p>
            <p className="italic">Fitiavana – Tanindrazana – Fandrosoana</p>
          </div>

          <h1 className="text-center font-bold underline mb-6 tracking-wide">
            KOPIAN’NY TARATASY FANAMARIHANA NY FAHATERAHANA
          </h1>

          <div className="text-justify space-y-5">
            <p>
              Nalaina avy amin’ny bokin’ny fanoratana ara-panjakana
              momba ny fahaterahana ao Antalaha ity kopia ity, araka ny
              lalàna mifehy ny fanoratana ara-panjakana, mba hanamarinana
              ny zava-misy, taona{" "}
              <strong>{new Date(birth.dateOfBirth).toLocaleDateString("fr-FR")}</strong>,
              izao soratra manaraka izao.
            </p>

            <div className="text-center">————————————</div>

            <p>
              Tamin’ny{" "}
              <strong>{new Date(birth.createdAt).toLocaleDateString("fr-FR")}</strong>,
              no teraka teto{" "}
              <strong>{birth.fokontany || "Antalaha"}</strong>,{" "}
              <strong>{birth.name}</strong>, zaza{" "}
              <strong>{birth.genre === "M" ? "lahy" : "vavy"}</strong>,
              zanak’i{" "}
              <strong>{birth.fatherName || "—"}</strong> sy{" "}
              <strong>{birth.motherName || "—"}</strong>.
            </p>

            <div className="text-center">————————————</div>

            <p>
              Nosoratana androany{" "}
              <strong>{new Date(birth.createdAt).toLocaleDateString("fr-FR")}</strong>,
              ho porofo ny zava-misy rehetra voalaza etsy ambony ity kopia ity,
              nankatoavina sy natao sonia etsy ambany.
            </p>

            <div className="text-center">————————————</div>

            <p className="text-sm">
              Kopia manontolo nadika tamin’ny boky nomena, androany{" "}
              <strong>{new Date().toLocaleDateString("fr-FR")}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between mt-14">
        <div>
          <p>Natao tany Antalaha,</p>
          <p>Ny {new Date(birth.createdAt).toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="text-center">
          <p className="font-semibold">Ny Mpitantana ny fanoratana</p>
          <p className="italic">ara-panjakana</p>
          <div className="mt-12">________________________</div>
        </div>
      </div>
    </div>
  )
}
export default ActItem;