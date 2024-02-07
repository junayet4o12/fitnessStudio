
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import DataTable from "react-data-table-component";
import { FaUsers } from "react-icons/fa6";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch users data using useQuery hook
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // Function to make a user admin
    const handleMakeAdmin = (user) => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then((res) => {
                if (res.data?.modifiedCount > 0) {
                    refetch();
                    toast.success(`${user?.name} is now an admin!`);
                }
            });
    };

    // Function to delete a user with confirmation
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${user?.name}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user?.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // Define columns for DataTable
    const columns = [
        {
            name: 'SL',
            selector: (row, index) => <p className="font-medium bmiNumber">{index + 1}</p>
        },
        {
            name: 'Name',
            selector: row => <p className="font-medium">{row?.name}</p>
        },
        {
            name: 'Email',
            selector: row => <p className="font-medium">{row?.email}</p>
        },
        {
            name: 'Role',
            selector: row => <button onClick={() => handleMakeAdmin(row)} title="Make Admin" className="px-2 py-1 text-2xl text-blue-700 bg-gray-200 rounded-lg">
                <FaUsers />
            </button>
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    {/* Button to delete user */}
                    <button onClick={() => handleDeleteUser(row)} title="Delete User" className="px-2 py-1 text-2xl text-red-600 bg-gray-200 rounded-lg">
                        <MdDeleteForever />
                    </button>
                </div>
            )
        },
    ];

    return (
        <>
            <Helmet>
                <title>Dashboard | All Users</title>
            </Helmet>
            <div>
                <DataTable
                    pagination
                    columns={columns}
                    data={users}
                    selectableRowsHighlight
                    highlightOnHover
                    customStyles={{
                        headCells: {
                            style: {
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                background: '#FF4804',
                                color: 'white',
                                fontSize: '16px'
                            },
                        },
                        cells: {
                            style: {
                                paddingLeft: '10px',
                                paddingRight: '10px',
                            },
                        },
                        table: {
                            style: {
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }
                        }
                    }}
                />
            </div>
        </>
    );
};

export default ManageUsers;
