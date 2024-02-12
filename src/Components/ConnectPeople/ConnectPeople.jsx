// import React from 'react';

import Title from "../Title/Title";
import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SearchedPeople from "./SearchedPeople";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import useAuth from "../../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
const ConnectPeople = () => {
    const axiosPublic = useAxiosPublic()
    const dispatch = useDispatch()
    const { user } = useAuth()
    const [searchedName, setSearchedName] = useState("");
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(false)
    const [following, setFollowing] = useState(1)
    const { user: userDetails } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    console.log(userDetails);
    useEffect(() => {
        axiosPublic.get(`/search_people/${searchedName === '' ? 'aTa Gachke tOtOOa PPakhi dalim' : searchedName}`)
            .then(res => {
                console.log(res?.data);
                setPeople(res?.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err?.message);
                setLoading(false)
            })
    }, [following])
    const onChange = (e) => {
        e.preventDefault()
        setSearchedName(e.target.value)
        setLoading(true)
        axiosPublic.get(`/search_people/${e.target.value === '' ? 'aTa Gachke tOtOOa PPakhi dalim' : e.target.value}`)
            .then(res => {
                console.log(res?.data);
                setPeople(res?.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err?.message);
                setLoading(false)
            })

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosPublic.get(`/search_people/${searchedName === '' ? 'aTa Gachke tOtOOa PPakhi dalim' : searchedName}`)
            .then(res => {
                console.log(res?.data);
                setPeople(res?.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err?.message);
                setLoading(false)
            })
    }
    return (
        <div>
            <Title title={'Connect People'}></Title>
            <form onSubmit={handleSubmit}>
                <div className="relative flex w-full max-w-[35rem] mx-auto my-4">
                    <Input
                        type="text"
                        label="Search People"
                        value={searchedName}
                        onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={searchedName ? "gray" : "blue-gray"}
                        disabled={!searchedName}
                        className="!absolute right-1 top-1 rounded h-8 w-20"
                    >
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Search'}
                    </Button>
                </div>
                <div>

                    {
                        people?.map(one => <SearchedPeople key={one?._id} info={one} personalInfo={userDetails} followingSearch={following} setFollowing={setFollowing}></SearchedPeople>)
                    }
                </div>
            </form>

        </div>
    );
};

export default ConnectPeople;