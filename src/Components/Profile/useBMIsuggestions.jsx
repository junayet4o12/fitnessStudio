import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const useBMISuggestions = (BMI) => {
    const [BMIsuggestions, setBMISuggestions] = useState('')
    useEffect(() => {
        if (BMI < 18.5) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Underweight</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Increase caloric intake with nutrient-dense foods.</li>
                            <li>Include healthy fats, proteins, and carbohydrates in meals.</li>
                            <li>Strength training exercises to build muscle mass.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        } else if (BMI >= 18.5 && BMI <= 24.9) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Normal Weight</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Maintain balanced nutrition with whole foods.</li>
                            <li>Engage in regular aerobic exercise (150 minutes per week)</li>
                            <li>Monitor portion sizes and avoid excessive calorie intake.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        } else if (BMI >= 25 && BMI <= 29.9) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Overweight</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Adopt a balanced diet emphasizing fruits, vegetables, and lean proteins.</li>
                            <li>Increase physical activity (150 to 300 minutes of moderate-intensity exercise per week).</li>
                            <li>Focus on gradual weight loss through sustainable habits.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        } else if (BMI >= 30 && BMI <= 34.9) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Obese Class I</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Consult with professionals for a personalized weight loss plan.</li>
                            <li>Combine balanced diet with increased physical activity.</li>
                            <li>Include both aerobic exercise and strength training.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        } else if (BMI >= 35 && BMI <= 39.9) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Obese Class II</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Seek comprehensive weight management guidance.</li>
                            <li>Gradual, sustainable weight loss with behavioral interventions.</li>
                            <li>Consider professional support for lifestyle changes.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        } else if (BMI >= 40) {
            setBMISuggestions(
                <>
                    <DialogHeader className='py-3'>Obese Class III</DialogHeader>
                    <DialogBody className='py-0'>
                        <ul className='list-decimal px-5 text-sm'>
                            <li>Immediate medical attention and intervention.</li>
                            <li>Work with a healthcare team for a supervised weight loss plan.</li>
                            <li>Bariatric surgery might be considered in extreme cases.</li>
                        </ul>
                    </DialogBody>
                </>
            );
        }
    }, [BMI]);

    return BMIsuggestions;
};

export default useBMISuggestions;