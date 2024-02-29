import PropTypes from 'prop-types'
import useStyleProperty from '../../../Hooks/useStyleProperty'
import Select from 'react-select'

const MuscleGroupRelated = ({
    getExerciseName,
    errors,
    register,
    muscleGroup,
    setMuscleGroup,
    muscleGroupOptions
}) => {
  const  [,labelStyle,inputStyle]= useStyleProperty()

    return (
        <>
            <div className="bg-slate-100 p-4 w-full text-black rounded-xl rounded-b-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-white">Muscle Group Focus</h1>
                    <div className="min-w-40 relative h-11 py-2">
                        <Select
                            defaultValue={muscleGroup}
                            onChange={setMuscleGroup}
                            options={muscleGroupOptions}
                        />
                    </div>

                </div>
                {errors.muscleGroup?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>
            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Exercise Name</h1>
                    <div>
                        <div className="relative h-11 ">
                            <input
                                type="text"
                                // disabled
                                value={getExerciseName(muscleGroup)}
                                placeholder="00"
                                {...register("exerciseNames", {
                                    required: true,
                                })}
                                className={inputStyle}
                            />

                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center gap-8 justify-between">
                    <h1 className="font-semibold">{muscleGroup?.value === 'shoulders' ? 'Current Overhead Press 1RM' : muscleGroup?.value === 'arms' ? 'Current Bicep Curl 1RM' :
                        muscleGroup?.value === 'core' ? 'Current Plank Duration' : ''}</h1>
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
                                {muscleGroup?.value === 'shoulders' ? 'kG' : muscleGroup?.value === 'arms' ? 'KG' :
                                    muscleGroup?.value === 'core' ? 'Minute' : ''}
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

            <div className="bg-slate-100 p-5 rounded-md mt-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">{muscleGroup?.value === 'shoulders' ? 'Target Overhead Press 1RM' : muscleGroup?.value === 'arms' ? 'Target Bicep Curl 1RM' :
                        muscleGroup?.value === 'core' ? 'Target Plank Duration' : ''}</h1>
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
                            <label className={labelStyle}>{muscleGroup?.value === 'shoulders' ? 'kG' : muscleGroup?.value === 'arms' ? 'KG' :
                                muscleGroup?.value === 'core' ? 'Minute' : ''}</label>
                        </div>
                    </div>
                </div>
                {errors.target1Rm?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>

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

                        </div>
                    </div>
                </div>
                {errors.timeline?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>

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
                {errors.targetWeight?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                        This field is required
                    </span>
                )}
            </div>
        </>
    )
}

MuscleGroupRelated.propTypes = {
    getExerciseName: PropTypes.func,
    setMuscleGroup: PropTypes.func, 
    muscleGroup:PropTypes.string,
    muscleGroupOptions: PropTypes.arrayOf(PropTypes.object),
    errors: PropTypes.object, 
    register: PropTypes.func, 

}

export default MuscleGroupRelated
