import genderIcon from "../../assets/images/icon-gender.svg"
import ageIcon from "../../assets/images/icon-age.svg"
import muscleIcon from "../../assets/images/icon-muscle.svg"
import pregnancyIcon from "../../assets/images/icon-pregnancy.svg"
import raceIcon from "../../assets/images/icon-race.svg"

function LimitationOfBMI() {
  return (
    <div className='mx-auto flex flex-col lg:flex-row justify-end'>
      <div className="md:p-[100px]">
            <h1 className="text-3xl md:text-4xl font-bold pb-[25px]">Limitations of BMI</h1>
            <p>
            Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.
            </p>
      </div>
      <div className="mx-auto">
            <div className="flex flex-col justify-center rounded-[25px] shadow-2xl p-[25px] md:w-[50%] md:mt-[5%] min-h-[250px]">
                <div className="flex items-center text-xl font-bold mb-[20px]">
                <img src={genderIcon} />
                <h1>Gender</h1>
                </div>
                <p>The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 lg:ml-[-20%] lg:mr-[5%]">
                <div className="flex flex-col justify-center rounded-[25px] shadow-2xl p-[25px] md:w-[40%] md:mt-[5%] min-h-[250px]">
                    <div className="flex items-center text-xl font-bold mb-[20px] gap-2">
                    <img src={ageIcon} />
                    <h1>Age</h1>
                    </div>
                    <p>In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.</p>
                </div>
                <div className="flex flex-col justify-center rounded-[25px] shadow-2xl p-[25px] md:w-[40%] md:mt-[5%] min-h-[250px]">
                    <div className="flex items-center text-xl font-bold mb-[20px] gap-2">
                    <img src={muscleIcon} />
                    <h1>Muscle</h1>
                    </div>
                    <p>BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 lg:ml-[-45%] lg:mr-[15%]">
                <div className="flex flex-col justify-center rounded-[25px] shadow-2xl p-[25px] md:w-[40%] md:mt-[5%] min-h-[250px]">
                    <div className="flex items-center text-xl font-bold mb-[20px] gap-2">
                    <img src={pregnancyIcon} />
                    <h1>Pregnancy</h1>
                    </div>
                    <p>Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.</p>
                </div>
                <div className="flex flex-col justify-center rounded-[25px] shadow-2xl p-[25px] md:w-[40%] md:mt-[5%] min-h-[250px]">
                    <div className="flex items-center text-xl font-bold mb-[20px] gap-2">
                    <img src={raceIcon} />
                    <h1>Race</h1>
                    </div>
                    <p>Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.</p>
                </div>
            </div>
      </div>
    </div>
  )
}

export default LimitationOfBMI
