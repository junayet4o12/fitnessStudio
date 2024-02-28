import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast';
import Title from '../Title/Title'

const UpdateBlogs = () => {

    const { id } = useParams();
    const Navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const [myBlogs, setMyBlogs] = useState({})
    const [tinyData, setTinyData] = useState("")

    // get blogs by id
    useEffect(() => {
        axiosPublic.get(`/blogs/${id}`)
            .then((res) => {
                setMyBlogs(res?.data)
                setTinyData(res?.data?.blogDes)
            })
    }, [id, axiosPublic])

    // Destructucring myBlogs Object
    const { _id, blogName, blogImg: previousImg } = myBlogs || {}

    // New Image Host in ImageBB
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
        let imgUrl = ''
        try {
            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            imgUrl = res?.data?.data?.display_url
        }
        catch (err) {
            console.log(err.message);

            imgUrl = previousImg
        }

        const blogImg = imgUrl;
        const blogName = data?.blogname;
        const blogDes = tinyData;
        const allData = { blogImg, blogName, blogDes }
        // Update blog using put method
        axiosPublic.put(`/update_blog/${_id}`, allData)
            .then(res => {
                console.log(res?.data);
                if (res?.data?.modifiedCount > 0) {
                    toast.success("Update Successfully !", { id: toastId });
                    Navigate('/dashboard/my_blogs')
                }
            })
            .catch((err) => {
                toast.error(err?.code, { id: toastId });
            });
    }

    // Content Change function
    const haldelChange = (content, editor) => {
        setTinyData(content)
    }

    return (
        <div className='p-[10px]'>
            <Helmet>
                <title>Update Your Blog - FitnessStudio</title>
            </Helmet>
            <div className='flex flex-col items-center gap-[20px]'>
                <Title title={'Update Your Blog'} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-secondary my-[50px] flex flex-col gap-3 bg-opacity-70 rounded-xl formStyle'>
                <label htmlFor="" className='pl-2 pt-1 text-sm text-gray-500'>Your Blog Name:</label>
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <input
                        {...register("blogname", { required: true })}
                        className='border-b-[3px] border-secondary rounded-t-xl outline-none w-full p-[10px] text-black'
                        type="text" name="blogname" defaultValue={blogName} id="blogname" />
                </div>

                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <label htmlFor="" className='pl-2 pt-1 text-sm text-gray-500'>Choose Another File:</label>
                    <input
                        {...register("img")}
                        className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
                        type="file" name="img" id="img" />
                </div>

                <div className='flex flex-col gap-[20px] items-start w-full'>
                    <Editor
                        apiKey='ffaw0tilo4m0ex1q5nmpaa5fblipi8p51r8bnqbq3wbyf8vi'
                        init={{
                            height: 500,
                            max_height: "400",
                            width: '100%',
                            border: "0px",
                            //    menubar: false,
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={tinyData}
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

export default UpdateBlogs;