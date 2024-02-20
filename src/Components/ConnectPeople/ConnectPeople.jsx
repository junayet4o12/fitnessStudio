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
    console.log(user);
    const [searchedName, setSearchedName] = useState("");
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(false)
    const [followBtnLoading, setFollowBtnLoading] = useState(false)
    const [following, setFollowing] = useState(1)
    const { user: userDetails } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    console.log(userDetails);
    useEffect(() => {
        if (!searchedName) {
            setFollowBtnLoading(true)
            axiosPublic.get(`/random_people`)
                .then(res => {
                    console.log(res?.data);
                    setPeople(res?.data)
                    setFollowBtnLoading(false)
                })
                .catch(err => {
                    console.log(err?.message);
                    setFollowBtnLoading(false)
                })
            // random_people
        }
        else {
            setFollowBtnLoading(true)
            axiosPublic.get(`/search_people/${searchedName}`)
                .then(res => {
                    console.log(res?.data);
                    setPeople(res?.data)
                    setFollowBtnLoading(false)
                })
                .catch(err => {
                    console.log(err?.message);
                    setFollowBtnLoading(false)
                })
        }
    }, [following])
    const onChange = (e) => {
        e.preventDefault()
        console.log(e.target.value);
        setSearchedName(e.target.value)
        if (!e.target.value) {
            return setPeople([])
        }
        else {
            setFollowBtnLoading(true)
            setLoading(true)
            axiosPublic.get(`/search_people/${e.target.value}`)
                .then(res => {
                    console.log(res?.data);
                    setPeople(res?.data)
                    setLoading(false)
                    setFollowBtnLoading(false)
                })
                .catch(err => {
                    console.log(err?.message);
                    setLoading(false)
                    setFollowBtnLoading(false)
                })
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setFollowBtnLoading(true)
        axiosPublic.get(`/search_people/${searchedName === '' ? 'aTa Gachke tOtOOa PPakhi dalim' : searchedName}`)
            .then(res => {
                console.log(res?.data);
                setPeople(res?.data)
                setFollowBtnLoading(false)
            })
            .catch(err => {
                console.log(err?.message);
                setFollowBtnLoading(false)
            })
    }
    return (
        <div>
            <Title title={'Connect People'}></Title>
            <form onSubmit={handleSubmit}>
                <div className="relative flex w-full max-w-[35rem] mx-auto my-4 ">
                    <Input
                        type="text"
                        label="Search People"
                        value={searchedName}
                        onChange={onChange}
                        className="pr-20 "
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
                <div className="">

                    {
                        people?.map(one => <SearchedPeople key={one?._id} info={one} personalInfo={userDetails} followingSearch={following} setFollowing={setFollowing} followBtnLoading={followBtnLoading}></SearchedPeople>)
                    }
                </div>
                <div className="">
                    {
                        people.length < 1 && <div className="w-full p-10 text-center text-2xl font-medium">No User Available!!</div>
                    }
                </div>
            </form>

        </div>
    );
};

export default ConnectPeople;