import React from "react";
import Swift from "../public/Swift.png";
import Seltos from '../public/Seltos.png'
import Innova from '../public/Innova.png'
import Image from "next/image";

const Cars = () => {
  return (
    <div className="bg-white lg:space-y-20 md:space-y-10 md:space-x-2 lg:p-20 md:px-2 px-6 py-10 md:py-10 ">
      <div className="flex justify-center text-rose-900 font-bold text-2xl">Price List</div>
      <div className="lg:flex md:flex lg:gap-20 md:gap-2 space-y-6 lg:space-y-0 md:space-y-0 justify-evenly">
        <div className="flex justify-center">
          <div className="  border border-rose-900 shadow-xl shadow-rose-200 md:w-56 lg:w-80 w-80 h-96 p-10 space-y-4 rounded-xl">
            <Image src={Swift} alt="No Image Found" className="lg:w-[800px] h-40" />
            <div className="font-semibold">5 seater Basic Starting From</div>
            <div className="flex justify-between">
              <div className="text-sm">24 Hours :</div>
              <div className="text-sm">2000</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">4 Days + :</div>
              <div className="text-sm">1800/day</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">10 Days + :</div>
              <div className="text-sm">1600/day</div>
            </div>
          </div>
        </div>
         <div className="flex justify-center">
          <div className=" border border-rose-900 shadow-xl shadow-rose-200 md:w-56 lg:w-80 w-80 h-96 p-10 space-y-4 rounded-xl">
            <Image src={Seltos} alt="No Image Found"  className="w-[800px] h-40"  />
            <div className="font-semibold">5 seater Premium Starting From</div>
            <div className="flex justify-between">
              <div className="text-sm">24 Hours :</div>
              <div className="text-sm">2700</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">4 Days + :</div>
              <div className="text-sm">2700/day</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">10 Days + :</div>
              <div className="text-sm">2500/day</div>
            </div>
          </div>
          </div>

          <div className="flex justify-center">
          <div className=" border border-rose-900 shadow-xl shadow-rose-200 md:w-56 lg:w-80 w-80 h-96 p-10 space-y-4 rounded-xl">
            <Image src={Innova} alt="No Image Found"  className="w-[800px] h-40"  />
            <div className="font-semibold">7 seater Basic Starting From</div>
            <div className="flex justify-between">
              <div className="text-sm">24 Hours :</div>
              <div className="text-sm">4439</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">4 Days + :</div>
              <div className="text-sm">4200/day</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">10 Days + :</div>
              <div className="text-sm">4000/day</div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Cars;
