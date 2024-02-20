import { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const UpdateBlogs2 = () => {

    const { id } = useParams();
    // console.log(id);
    const { user } = useAuth();
    const Navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const dispatch = useDispatch()
    const { user: userDetails } = useSelector(state => state.user)
    console.log(userDetails?._id);
    const [myBlogs, setMyBlogs] = useState({})
    const [tinyData, setTinyData] = useState("")

    // amar code
    // const { data: myBlogs = [] } = useQuery({
    //     queryKey: ['myBlogs'],
    //     queryFn: async () => {
    //         const response = await axiosPublic.get(`/blogs/${id}`);
    //         return response.data;
    //     }
    // })
    //   console.log(myBlogs);

    useEffect(()=> {
        axiosPublic.get(`/blogs/${id}`)
        .then((res) => {
            setMyBlogs(res?.data)
            setTinyData(res?.data?.blogDes)
        })
    },[id, axiosPublic ])

    const { _id, blogName, blogImg, } = myBlogs || {}

    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        const toastId = toast.loading("Updating...");
        const image = { image: data?.img[0] };
        try {

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            const blogImg = res?.data?.data?.display_url;
            const blogName = data?.blogname;
            const blogDes = tinyData;
            const allData = { blogImg, blogName, blogDes }
            console.log(allData);
            axiosPublic.put(`/update_blog/${_id}`, allData)
                .then(res => {
                    console.log(res?.data);
                    if (res?.data?.modifiedCount > 0) {
                        toast.success("Update Successfully !", { id: toastId });
                        Navigate('/my_blogs')
                    }
                })
                .catch((err) => {
                    toast.error(err?.code, { id: toastId });
                });
        }
        catch {
            toast.error('error', { id: toastId });
        }


    }


    const haldelChange = (content, editor) => {
        setTinyData(content)
        console.log(content);
        console.log(tinyData);
    }

    return (
        <div className='p-[10px] my-[50px]'>
            <Helmet>
                <title>Update Your Blog - FitnessStudio</title>
            </Helmet>
            <div className='flex flex-col items-center gap-[20px]'>
                <h1 className='text-center text-2xl font-bold'>Update Your Blog</h1>
                <div className='bg-primary w-[60%] md:w-[20%] h-[5px] rounded-box'></div>
                {/* <p className='text-md md:text-xl text-secondary font-[500] text-center'>Ready to inspire others on their fitness journey? Let's make your voice heard</p> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-secondary my-[50px] flex flex-col gap-3 bg-opacity-70 rounded-xl formStyle'>
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <input
                        {...register("blogname", { required: true })}
                        className='border-b-[3px] border-secondary rounded-t-xl outline-none w-full p-[10px]'
                        type="text" name="blogname" defaultValue={blogName} id="blogname" />
                </div>
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <input
                        {...register("img", { required: true })}
                        className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
                        type="file" name="img" defaultValue={blogImg} id="img" />
                </div>

                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <Editor
                        apiKey='ffaw0tilo4m0ex1q5nmpaa5fblipi8p51r8bnqbq3wbyf8vi'
                        init={{
                            height: 500,
                            max_height: "500",
                            width: '100%',
                            border: "0px",
                            //    menubar: false,
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={tinyData}
                        // defaultValue={blogDes}
                        onEditorChange={haldelChange} />
                </div>
                <button
                    className='bg-secondary text-white font-[600] p-[10px] text-xl rounded-md'
                    type='submit'>
                    Update
                </button>

            </form>
        </div>
    );
};

export default UpdateBlogs2;