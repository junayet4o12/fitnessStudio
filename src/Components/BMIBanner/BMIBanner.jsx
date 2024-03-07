import React, { useEffect, useState } from "react";

const BMIBanner = () => {
  const [height, setHeight] = useState(0);
  const [weight, setweight] = useState(0);
  const [BMIresult, setBMIresult] = useState("0");
  const [minWeightBMI, setminWeightBMI] = useState(0);
  const [maxWeightBMI, setmaxWeightBMI] = useState(0);
  const [BMImeaning, setBMImeaning] = useState("");
  let BMI = 0;

  const CalculateBMI = (height, weight) => {
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);
    const heightinMeter = numHeight / 100;
    BMI = (numWeight / heightinMeter ** 2).toFixed(2);
  };

  const idealWeight = (height) => {
    let minWeight = Math.round(18.5 * (parseFloat(height) / 100) ** 2).toFixed(
      1
    );
    let maxWeight = Math.round(24.9 * (parseFloat(height) / 100) ** 2).toFixed(
      1
    );

    setminWeightBMI(minWeight);
    setmaxWeightBMI(maxWeight);
  };

  useEffect(() => {
    if (height > 0 || weight > 0) {
      CalculateBMI(height, weight);
    }
    idealWeight(height);
    if (BMI > 0) {
      setBMIresult(BMI);
    }
    if (BMI < 18.5) {
      setBMImeaning("Underweight");
    }
    if (BMI >= 18.5 && BMI <= 24.9) {
      setBMImeaning("Normal weight");
    }
    if (BMI >= 25 && BMI <= 29.9) {
      setBMImeaning("Overweight");
    }
    if (BMI >= 30) {
      setBMImeaning("Obese");
    }
  }, [height, weight]);

  return (
    <div className="flex flex-col gap-0 lg:flex-row justify-around items-center  ">
      <div className="lg:w-[65%] h-[80vh] md:mb-[0px] flex flex-col justify-center p-[25px] bg-secondary bg-opacity-[0.4] rounded-md ">
        <h1 className="font-bold text-3xl text-center md:text-left md:text-5xl">
          Body Mass <br /> Index Calculator
        </h1>
        <p className="pt-[25px] md:w-[60%] text-center md:text-left">
          Better understand your weight in relation to your height using our
          body mass index (BM) calculator. While BMI is not the sole determinant
          of a healthy weight, it offers a valuable starting point to evaluate
          your overall health and well-being.
        </p>
      </div>
      <div className="mx-auto w-[95%] h-fit lg:ml-[-20%] shadow-2xl shadow-secondary p-[25px] rounded-md lg:w-[45%] bg-white">
        <h1 className="pb-[25px] font-bold text-xl md:text-2xl">
          Enter your details below
        </h1>
        <form>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="lg:w-[45%]">
              <label htmlFor="Height">Height</label>
              <br />
              <div className="border-2 w-[100%] border-primary rounded-md flex flex-row-reverse p-[5px] items-center justify-around">
                <h1 className="text-secondary text-2xl font-bold">cm</h1>
                <input
                  onChange={(e) => setHeight(e.target.value)}
                  className="p-[5px] w-full outline-none bmiNumber border-none text-primary text-2xl font-[500]"
                  maxLength="3"
                  type="text"
                  placeholder="0"
                  id="Height"
                />
              </div>
            </div>
            <div className="lg:w-[45%]">
              <label htmlFor="Weight">Weight</label>
              <br />
              <div className="border-2 w-[100%] border-primary rounded-md flex flex-row-reverse p-[5px] items-center justify-around">
                <h1 className="text-secondary text-2xl font-bold">Kg</h1>
                <input
                  onChange={(e) => setweight(e.target.value)}
                  className="p-[5px] w-full outline-none bmiNumber border-none text-primary text-2xl font-[500]"
                  maxLength="3"
                  type="text"
                  placeholder="0"
                  id="Weight"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="bg-primary rounded-xl md:rounded-tr-[100px] md:rounded-br-[100px] mt-[20px] p-[40px] text-white ">
          <div className={BMIresult > 0 ? "hidden" : "block"}>
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="">
              Enter your height and weight and you’ll see your BMI result here
            </p>
          </div>
          <div
            className={
              BMIresult <= 0
                ? "hidden"
                : "flex flex-col md:flex-row gap-3 items-center justify-between"
            }
          >
            <h1 className="text-xl bmiNumber flex flex-col">
              Your BMI is
              <span className="text-5xl font-bold"> {BMIresult}</span>
            </h1>
            <p className="md:w-[55%]">
              Your BMI suggests you're {BMImeaning}. Your Ideal weight is
              <span className="bmiNumber"> {minWeightBMI} Kg </span>-
              <span className="bmiNumber"> {maxWeightBMI} Kg </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMIBanner;
