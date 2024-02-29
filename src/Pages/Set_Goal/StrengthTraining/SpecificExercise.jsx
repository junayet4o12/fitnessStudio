import PropTypes from 'prop-types'
import Select from 'react-select'
import useStyleProperty from '../../../Hooks/useStyleProperty'
const SpecificExercise = ({
    exerciseName,
    setExerciseName,
    exerciseOptions,
    errors,
    register,
}) => {
    
    // tailwind css styles for label and input
    const [, labelStyle, inputStyle] = useStyleProperty() 
    return (
        <>
            <div className="bg-slate-100 p-4 w-full text-black rounded-xl rounded-b-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-white">Exercise Name</h1>
                    <div className="min-w-40 relative h-11 py-2">
                        <Select
                            defaultValue={exerciseName}
                            onChange={setExerciseName}
                            options={exerciseOptions}
                        />
                    </div>

                </div>
                {errors.exerciseName?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
                <label className={labelStyle}>Exercise Name</label>
            </div>


            {/*current maximum amount of weight a person can lift for a single repetition of a given exercise with proper form */}
            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">


                    <h1 className="font-semibold">Current 1-RM</h1>
                    <div>
                        <div className="relative h-11">
                            <input
                                type="number"
                                placeholder="00"
                                {...register("current1Rm", {
                                    required: true,
                                })}
                                className={inputStyle}
                            />
                            <label className={labelStyle}>
                                KG
                            </label>
                        </div>
                    </div>
                </div>
                {errors.current1Rm?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>
            {/*target maximum amount of weight a person can lift for a single repetition of a given exercise with proper form */}

            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Target 1-RM</h1>
                    <div>
                        <div className="relative h-11 ">
                            <input
                                type="number"
                                placeholder="00"
                                {...register("target1Rm", {
                                    required: true,
                                })}
                                className={inputStyle}
                            />
                            <label className={labelStyle}>
                                KG
                            </label>
                        </div>
                    </div>
                </div>
                {errors.target1Rm?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>

            {/* Goal Completion Date */}

            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Timeline</h1>

                    <div>
                        <div className="relative h-11">
                            <input
                                type="date"
                                {...register("timeline", {
                                    required: true,
                                })}
                                className={inputStyle}
                            />
                            <label className={labelStyle}>
                                KG
                            </label>
                        </div>
                    </div>
                </div>
                {errors.timeline?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>
            {/* Weekly repetition number */}
            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Frequency</h1>

                    <div>
                        <div className="relative h-11">
                            <input
                                type="number"
                                placeholder='times'

                                {...register("frequency", {
                                    required: true,
                                })}
                                className={inputStyle}
                            />
                            <label className={labelStyle}>
                                Weekly
                            </label>
                        </div>
                    </div>
                </div>
                {errors.frequency?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>

        </>
    )
}
// PropType Validation
SpecificExercise.propTypes = {
    exerciseName: PropTypes.string,
    setExerciseName: PropTypes.func,
    errors: PropTypes.object,
    labelStyle: PropTypes.string,
    register: PropTypes.func,
    inputStyle: PropTypes.string,
    exerciseOptions: PropTypes.arrayOf(PropTypes.object)

}

export default SpecificExercise
