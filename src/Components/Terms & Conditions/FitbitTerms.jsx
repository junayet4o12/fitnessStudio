import { useEffect, useState } from 'react';
import useAxiosFitbitAccess from '../../Hooks/useAxiosFitbitAccess';
import { useNavigate } from 'react-router';
const FitbitTerms = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [exchangeCode, setExchangeCode] = useState('')
    const axiosFitbitAccess = useAxiosFitbitAccess()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        setExchangeCode(code)

    }, [])

    const handleConfirmation = () => {
        setIsConfirmed(!isConfirmed);
    };

    const handleAccessToken = async () => {
        if (exchangeCode) {

            axiosFitbitAccess.post('/callbackFitbit', { exchangeCode: exchangeCode })
                .then(res => {
                    const token = res.data.accessToken.access_token
                    localStorage.setItem('Authorization', token)
                    navigate('/dashboard/connect_app')
                })
        }



    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Terms and Conditions
                </h1>
                <div className="text-gray-700 text-lg mb-8">
                    <ol className="list-decimal pl-6">
                        <li>Users must provide explicit consent to connect their Fitbit account with the website.</li>
                        <li>
                            Consent covers access to Fitbit data, including activity, sleep, and other health-related information.
                        </li>
                        <li>
                            <strong>Data Usage:</strong>
                            <ol className="list-decimal pl-6">
                                <li>
                                    The website will use Fitbit data solely for the purpose of providing health and fitness-related features and services.
                                </li>
                                <li>
                                    Fitbit data will not be shared with third parties without the users explicit consent.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Account Security:</strong>
                            <ol className="list-decimal pl-6">
                                <li>
                                    Users are responsible for the security of their Fitbit account credentials.
                                </li>
                                <li>
                                    The website will take reasonable measures to secure and protect Fitbit-related data.
                                </li>
                            </ol>
                        </li>
                        {/* Add more list items as needed */}
                    </ol>
                </div>

                <label className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2 text-orange-500"
                        checked={isConfirmed}
                        onChange={handleConfirmation}
                    />
                    <span className="text-gray-700">
                        I confirm that I have read and agree to the terms and conditions
                    </span>
                </label>
                <div className='flex justify-center items-center mt-6'>

                    <button
                        onClick={handleAccessToken}
                        className={`bg-orange-500 text-lg py-4 text-white font-semibold px-4 rounded-md ${!isConfirmed ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isConfirmed}
                    >
                        Connect with Fitbit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FitbitTerms;
