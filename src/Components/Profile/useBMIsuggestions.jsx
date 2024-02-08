import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const useBMISuggestions = (BMI) => {
    const [BMIsuggestions, setBMISuggestions] = useState('')
    useEffect(() => {
        let header = '';
        let description = '';
        let suggestions = '';

        if (BMI < 18.5) {
            header = "Underweight";
            description = "Your BMI is below 18.5";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Increase caloric intake with nutrient-dense foods.</li>
                        <li>Include healthy fats, proteins, and carbohydrates in meals.</li>
                        <li>Strength training exercises to build muscle mass.</li>
                    </ul>
                </>
            );
        } else if (BMI >= 18.5 && BMI <= 24.9) {
            header = "Normal Weight";
            description = "Your BMI is between 18.5 and 24.9";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Maintain balanced nutrition with whole foods.</li>
                        <li>Engage in regular aerobic exercise (150 minutes per week)</li>
                        <li>Monitor portion sizes and avoid excessive calorie intake.</li>
                    </ul>
                </>
            );
        } else if (BMI >= 25 && BMI <= 29.9) {
            header = "Overweight";
            description = "Your BMI is between 25 and 29.9";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Adopt a balanced diet emphasizing fruits, vegetables, and lean proteins.</li>
                        <li>Increase physical activity (150 to 300 minutes of moderate-intensity exercise per week).</li>
                        <li>Focus on gradual weight loss through sustainable habits.</li>
                    </ul>
                </>
            );
        } else if (BMI >= 30 && BMI <= 34.9) {
            header = "Obese Class I";
            description = "Your BMI is between 30 and 34.9";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Consult with professionals for a personalized weight loss plan.</li>
                        <li>Combine balanced diet with increased physical activity.</li>
                        <li>Include both aerobic exercise and strength training.</li>
                    </ul>
                </>
            );
        } else if (BMI >= 35 && BMI <= 39.9) {
            header = "Obese Class II";
            description = "Your BMI is between 35 and 39.9";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Seek comprehensive weight management guidance.</li>
                        <li>Gradual, sustainable weight loss with behavioral interventions.</li>
                        <li>Consider professional support for lifestyle changes.</li>
                    </ul>
                </>
            );
        } else if (BMI >= 40) {
            header = "Obese Class III";
            description = "Your BMI is 40 or higher";
            suggestions = (
                <>
                    <ul className='list-decimal px-5 text-sm'>
                        <li>Immediate medical attention and intervention.</li>
                        <li>Work with a healthcare team for a supervised weight loss plan.</li>
                        <li>Bariatric surgery might be considered in extreme cases.</li>
                    </ul>
                </>
            );
        }

        setBMISuggestions(
            <>
                <DialogHeader className='py-3 text-white'>{header}</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg text-white'>{description}</p>
                    <p className='font-bold text-sm underline text-white'>Suggestions According to your BMI:</p>
                    <p className="text-white">
                        {suggestions}
                    </p>
                </DialogBody>
            </>
        );
    }, [BMI]);


    return BMIsuggestions;
};

export default useBMISuggestions;